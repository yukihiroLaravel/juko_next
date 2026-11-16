#!/usr/bin/env bash
#
# Claude Code の SessionStart フック。作業を始める前に、検査と画面の確認に要るものを揃える。
#
# 見るものは3つある。
#   1. 依存が入っているか。入っていないか lockfile より古いと、編集の直後の検査が落ち続ける
#   2. バックエンドの docs/ が見つかるか。用語・業務ルール・未確定事項と API の受け入れ基準はそこにある
#   3. バックエンドの API のコンテナが動いているか。止まっていると、画面を開いて確かめる段に進めない
#
# 標準出力は Claude の文脈に入る。セッションを止めたくないので、何が起きても終了コードは 0 にする。
#
# compose.yml の探し方はバックエンドの scripts/hooks/session-start.sh に合わせている。
set -uo pipefail

readonly SERVICE="${LARAVEL_SERVICE:-app}"

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$root" || exit 0

say() {
    printf '%s\n' "$@"
}

# 1. 依存
if [ ! -d node_modules ] || [ pnpm-lock.yaml -nt node_modules/.modules.yaml ]; then
    if install_output="$(scripts/run pnpm install --frozen-lockfile 2>&1)"; then
        say "依存が入っていないか古かったので、pnpm install --frozen-lockfile で入れた。"
    else
        say "pnpm install --frozen-lockfile が落ちた。検査が動かないので、出力の末尾を利用者に伝える。" \
            "----"
        printf '%s\n' "$install_output" | tail -n 20
    fi
fi

# 2. バックエンドの docs/
if backend_docs="$(scripts/run node scripts/backend-docs.mjs 2>/dev/null)"; then
    say "バックエンドの docs/ は ${backend_docs} にある。用語・業務ルール・未確定事項と API の受け入れ基準はここを読む。"
else
    say "バックエンドの docs/ が見つからない。用語・業務ルール・未確定事項を読めないので、利用者に伝える。" \
        "laravel_next_docker の中で取得していないなら、環境変数 JUKO_BACKEND_DOCS にバックエンドの docs/ の場所を設定してもらう。"
fi

# 3. API のコンテナ
find_compose_file() {
    local dir="$root"

    while [ "$dir" != "/" ]; do
        for name in compose.yml compose.yaml docker-compose.yml docker-compose.yaml; do
            if [ -f "$dir/$name" ]; then
                printf '%s\n' "$dir/$name"
                return 0
            fi
        done
        dir="$(dirname "$dir")"
    done

    return 1
}

if ! command -v docker >/dev/null 2>&1; then
    say "docker が見つからない。バックエンドの API が動かないので、画面を開いて確かめる段に進めない。利用者に Docker Desktop を入れるよう伝える。"
    exit 0
fi

if ! docker info >/dev/null 2>&1; then
    say "Docker が起動していない。画面を開いて確かめる段に進めないので、利用者に Docker Desktop を起動するよう伝える。"
    exit 0
fi

if [ -n "${COMPOSE_FILE:-}" ]; then
    if [ ! -f "$COMPOSE_FILE" ]; then
        say "COMPOSE_FILE に指定されたファイルがない: $COMPOSE_FILE"
        exit 0
    fi
    compose_file="$COMPOSE_FILE"
elif ! compose_file="$(find_compose_file)"; then
    say "compose.yml が見つからない。バックエンドの API を起動できなかったので、利用者に置き場所を確かめるよう伝える。"
    exit 0
fi

is_running() {
    docker compose -f "$compose_file" ps --status running --services 2>/dev/null | grep -qx "$SERVICE"
}

if is_running; then
    say "バックエンドの API のコンテナ ${SERVICE} は動いている。"
    exit 0
fi

if ! up_output="$(docker compose -f "$compose_file" up -d 2>&1)"; then
    say "バックエンドの API のコンテナを起動できなかった（docker compose -f ${compose_file} up -d）。出力の末尾を次に示す。利用者に伝える。" \
        "----"
    printf '%s\n' "$up_output" | tail -n 20
    exit 0
fi

if is_running; then
    say "バックエンドの API のコンテナ ${SERVICE} が止まっていたので、docker compose up -d で起動した。"
else
    say "docker compose up -d は終わったが、コンテナ ${SERVICE} が動いていない。docker compose -f ${compose_file} ps で状態を確かめる。"
fi
exit 0
