# 受講管理システム フロントエンド

Next.js 16 + TypeScript + Tailwind CSS プロジェクト

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- pnpm (パッケージマネージャー)
- Docker

## 環境構築

### 前提条件

- Docker Desktop がインストールされていること

### 初回セットアップ

```bash
# Dockerイメージをビルド
docker compose build front

# コンテナに入って依存関係をインストール
docker compose run --rm front pnpm install
```

### 開発サーバー起動

```bash
# フォアグラウンドで起動（ログが表示される）
docker compose up front

# バックグラウンドで起動
docker compose up -d front
```

起動後、ブラウザで http://localhost:3000 にアクセス

## コンテナ操作

### 基本操作

```bash
# コンテナ起動
docker compose up front

# コンテナ停止
docker compose down

# コンテナ再起動
docker compose restart front

# ログ確認
docker compose logs -f front
```

### コンテナ内でコマンド実行

```bash
# コンテナ内でbashシェルに入る
docker compose run --rm front bash

# 単発コマンド実行
docker compose run --rm front pnpm <command>
```

### パッケージ管理

```bash
# パッケージ追加
docker compose run --rm front pnpm add <package-name>

# 開発用パッケージ追加
docker compose run --rm front pnpm add -D <package-name>

# パッケージ削除
docker compose run --rm front pnpm remove <package-name>

# 依存関係の再インストール
docker compose run --rm front pnpm install
```

### ビルド・その他

```bash
# 本番ビルド
docker compose run --rm front pnpm build

# Lint実行
docker compose run --rm front pnpm lint
```

## ディレクトリ構成

```
juko_next/
├── src/
│   └── app/           # App Router
│       ├── layout.tsx # ルートレイアウト
│       └── page.tsx   # トップページ
├── public/            # 静的ファイル
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

## トラブルシューティング

### ホットリロードが効かない場合

`compose.yml`で以下の環境変数が設定されていることを確認:

```yaml
environment:
  - WATCHPACK_POLLING=true
  - CHOKIDAR_USEPOLLING=true
```

### node_modules関連のエラー

```bash
# コンテナを停止してボリュームを削除
docker compose down -v

# 再ビルド
docker compose build front

# 依存関係を再インストール
docker compose run --rm front pnpm install
```

---

### next: not found エラー

**症状:**

```
sh: 1: next: not found
ELIFECYCLE Command failed.
```

**原因:**
`node_modules`がコンテナ内に存在しない。匿名ボリュームを使用している場合、`docker compose run`と`docker compose up`で別々のボリュームが作成されることがある。

**解決策:**

1. 名前付きボリュームを使用する（`compose.yml`で設定済み）
2. 依存関係を再インストールしてから起動する

```bash
docker compose run --rm front pnpm install
docker compose up front
```

---

### create-next-app実行時の競合エラー

**症状:**

```
The directory juko_next contains files that could conflict:
  node_modules/
```

**原因:**
Dockerボリュームによって`node_modules`ディレクトリが作成されている。

**解決策:**
`compose.yml`の`node_modules`ボリューム設定を一時的にコメントアウトしてからプロジェクトを初期化する。

```yaml
volumes:
  - ./frontend:/www/html
  # - front_node_modules:/www/html/juko_next/node_modules  # 一時的にコメントアウト
```

初期化完了後、コメントを解除して`pnpm install`を実行。

---

### Device or resource busy エラー

**症状:**

```
rm: cannot remove 'node_modules': Device or resource busy
```

**原因:**
`node_modules`がDockerボリュームとしてマウントされているため、コンテナ内から削除できない。

**解決策:**
コンテナを停止してボリュームごと削除する。

```bash
docker compose down -v
```

---

### pnpm Unknown system error -116

**症状:**

```
ERR_PNPM Unknown system error -116
Unknown system error -116, copyfile '...' -> '...'
```

**原因:**
Dockerボリュームマウント（特にmacOS）でpnpmのハードリンク機能が動作しない。

**解決策:**
`Dockerfile`でpnpmのパッケージインポート方法を`copy`に設定する。

```dockerfile
RUN pnpm config set package-import-method copy --global && \
    pnpm config set node-linker hoisted --global
```

または、コンテナ内で一時的に設定:

```bash
echo "package-import-method=copy" > ~/.npmrc
echo "node-linker=hoisted" >> ~/.npmrc
```

---

### ボリューム完全リセット

すべてのトラブルを解決するための完全リセット手順:

```bash
# 1. コンテナとボリュームを削除
docker compose down -v

# 2. Dockerイメージを再ビルド
docker compose build --no-cache front

# 3. 依存関係をインストール
docker compose run --rm front pnpm install

# 4. 開発サーバー起動
docker compose up front
```
