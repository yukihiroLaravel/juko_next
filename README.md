# 受講管理システム フロントエンド (juko_next)

[laravel_next_docker](https://github.com/yukihiroLaravel/laravel_next_docker) のフロントエンド (Next.js) です。
バックエンド (Laravel + MySQL) は Docker、このフロントエンドはホストで実行します。
フルスタック全体の構成・セットアップはリポジトリルートの `Readme.md` を参照してください。

## 技術スタック

### コア

- Next.js 16 (App Router) — Turbopack / React Compiler 有効 (`reactCompiler: true`)
- React 19
- TypeScript 5
- Tailwind CSS 4
- pnpm (パッケージマネージャー)

### 主なライブラリ

| 用途 | ライブラリ |
| --- | --- |
| データフェッチング | SWR + axios |
| フォーム / バリデーション | React Hook Form + zod (`@hookform/resolvers`) |
| UIコンポーネント | shadcn/ui (Radix UI) + lucide-react (アイコン) |
| 非同期 / エラーハンドリング | Suspense + react-error-boundary |
| ドラッグ&ドロップ | dnd-kit |
| 日付 | date-fns + react-day-picker |
| Lint / フォーマット | ESLint 9 + Prettier |

## 環境構築

### 前提条件

- Docker Desktop — バックエンド (Laravel + MySQL) の起動に必要
- Node.js / pnpm — バージョンはリポジトリルートの `mise.toml` で管理しています (Node 24 / pnpm 9.15.0)
  - [mise](https://mise.jdx.dev/) を使うと、リポジトリルートで `mise install` 一発で揃います。
  - 詳細はリポジトリルートの `Readme.md` を参照してください。

### 初回セットアップ

```bash
# リポジトリルートで一度だけ（Node / pnpm を mise.toml のバージョンで導入）
mise install

# このディレクトリに移動
cd frontend/juko_next

# 環境変数ファイルを作成
cp .env.example .env.local

# 依存関係をインストール
pnpm install
```

### 環境変数

`.env.example` をコピーして `.env.local` を作成し、必要に応じて編集します。

| 変数 | 説明 | 例 |
| --- | --- | --- |
| `NEXT_PUBLIC_STORAGE_URL` | Laravelバックエンドの Storage URL（クライアント側で参照） | `http://localhost:8080/storage` |

### 開発サーバー起動

```bash
pnpm dev
```

起動後、ブラウザで http://localhost:3000 にアクセス。

> バックエンド (Laravel) を先に起動しておく必要があります。リポジトリルートで `docker compose up -d` を実行すると http://localhost:8080 で起動します（手順はルートの `Readme.md` を参照）。

## よく使うコマンド

```bash
pnpm dev            # 開発サーバー
pnpm build          # 本番ビルド
pnpm start          # 本番サーバー起動（build後）
pnpm lint           # ESLint
pnpm type-check     # 型チェック (tsc --noEmit)
pnpm format         # Prettier整形
pnpm format:check   # Prettier整形チェック
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
│   ├── app/                # App Router（ルーティング）
│   │   ├── (guest)/        # 未ログイン向け（ログイン画面）
│   │   ├── (instructor)/   # 講師向け
│   │   ├── (student)/      # 受講生向け（attendance / notifications）
│   │   └── layout.tsx      # ルートレイアウト
│   ├── components/
│   │   ├── ui/             # shadcn/ui 生成（直接参照禁止）
│   │   ├── atoms/          # ui/ のラッパー（腐敗防止層）
│   │   ├── organisms/      # 横断的な複合コンポーネント（Header など）
│   │   └── providers/      # Context Provider 群
│   ├── features/           # ドメイン単位のコロケーション
│   │   ├── attendance/     #   └ components / hooks / types / utils
│   │   ├── auth/
│   │   ├── notification/
│   │   └── student/
│   ├── hooks/              # 横断的なカスタムフック
│   ├── lib/                # 共通ライブラリ（utils など）
│   ├── utils/              # 横断的なユーティリティ
│   └── types/              # 共通型定義
├── public/                 # 静的ファイル
├── components.json         # shadcn/ui 設定
├── next.config.ts
├── tsconfig.json
└── package.json
```

## コーディング規約

詳細は [`.claude/CLAUDE.md`](.claude/CLAUDE.md) を参照。要点は以下のとおりです。

- Container/Presentational パターン — ロジックは `Xxx.tsx`（Container）、表示は `Xxx.ui.tsx`（Presentational）に分離する。
- コロケーション — 横断的なものは `src/` 直下、ドメイン固有のものは `src/features/{ドメイン}/` に集約する。
- 腐敗防止層 — shadcn/ui (`components/ui/`) は直接参照せず、必ず `components/atoms/` 経由で利用する。

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
