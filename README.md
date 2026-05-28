# 受講管理システム フロントエンド

Next.js 16 + TypeScript + Tailwind CSS プロジェクト

## 技術スタック

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4
- pnpm (パッケージマネージャー)

## 環境構築

### 前提条件

- Node.js / pnpm のバージョンはリポジトリルートの `mise.toml` で管理しています。
- [mise](https://mise.jdx.dev/) を使うと `mise install` 一発で揃います。
- 詳細はリポジトリルートの `Readme.md` を参照してください。

### 初回セットアップ

```bash
# リポジトリルートで一度だけ
mise install

# このディレクトリに移動して
cd frontend/juko_next

# 環境変数ファイルを作成
cp .env.example .env.local

# 依存関係をインストール
pnpm install
```

### 開発サーバー起動

```bash
pnpm dev
```

起動後、ブラウザで http://localhost:3000 にアクセス。

> バックエンド (Laravel) は別途 `docker compose up -d` で起動しておく必要があります。

## よく使うコマンド

```bash
# 開発サーバー
pnpm dev

# 本番ビルド
pnpm build
pnpm start

# Lint
pnpm lint

# 型チェック
pnpm type-check

# Prettier整形
pnpm format
pnpm format:check
```

## パッケージ管理

```bash
# パッケージ追加
pnpm add <package-name>

# 開発用パッケージ追加
pnpm add -D <package-name>

# パッケージ削除
pnpm remove <package-name>

# 依存関係の再インストール
pnpm install
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
└── tsconfig.json
```

## トラブルシューティング

### `pnpm: command not found`

mise を入れた直後に既存のターミナルで実行している可能性があります。新しいターミナルを開くか、設定を再読み込みしてください。

```bash
source ~/.zshrc   # または ~/.bashrc
```

`which pnpm` で `~/.local/share/mise/...` 配下が表示されれば mise 経由で解決できています。

### Node / pnpm のバージョンが違う

リポジトリ内で `mise current` を実行すると、`mise.toml` で定義したバージョンが表示されます。違うバージョンが使われている場合は `mise install` を再実行してください。

### ポート 3000 が使用中

別プロセスが 3000 番を占有していると起動できません。

```bash
# 3000番を使っているプロセスを確認
lsof -i :3000

# 別ポートで起動する場合
pnpm dev -- -p 3001
```

### 依存関係を完全リセットしたい

```bash
rm -rf node_modules .next
pnpm install
```
