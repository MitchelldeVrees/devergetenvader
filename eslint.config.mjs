import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      ".next-test/**",
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "artifacts/**",
      ".test-db/**",
      "next-env.d.ts",
    ],
  },
];
export default config;
