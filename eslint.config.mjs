import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// 規約の検査（docs/architecture/convention-checks.md）。
// 同じルールを複数のブロックで設定すると後のブロックが丸ごと上書きするため、
// 対象の組み合わせごとにブロックを分けて、制限を合成して渡す。

// CHK-IMPORT-01 features から shadcn/ui の生成物を直接参照しない
const shadcnUiRestriction = {
  group: ['@/components/ui/*', '**/components/ui/*'],
  message:
    'features から components/ui を直接参照しない。components/atoms を経由する（coding-standards.md「共通部品の腐敗防止層」）。',
};

// CHK-UI-01 表示の部品はデータの取得と送信をしない（型の参照は許す）
const dataAccessRestrictions = [
  {
    group: ['swr', 'swr/*', 'axios', '@/lib/api', '@/utils/fetcher'],
    allowTypeImports: true,
    message:
      '表示の部品（*.ui.tsx）でデータの取得・送信をしない。Container で行い props で渡す（coding-standards.md「Container と Presentational」）。',
  },
  {
    group: ['@/features/*/hooks/*', '**/hooks/use*'],
    allowTypeImports: true,
    message:
      '表示の部品（*.ui.tsx）からドメインのフックを呼ばない。Container で呼び props で渡す（coding-standards.md「Container と Presentational」）。',
  },
];

const restrictImports = (patterns) => ({
  'no-restricted-imports': 'off',
  '@typescript-eslint/no-restricted-imports': ['error', { patterns }],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['src/features/**/*.{ts,tsx}'],
    ignores: ['**/*.ui.tsx'],
    rules: restrictImports([shadcnUiRestriction]),
  },
  {
    files: ['src/features/**/*.ui.tsx'],
    rules: restrictImports([shadcnUiRestriction, ...dataAccessRestrictions]),
  },
  {
    files: ['src/**/*.ui.tsx'],
    ignores: ['src/features/**'],
    rules: restrictImports(dataAccessRestrictions),
  },
  // Override default ignores of eslint-config-next:
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
