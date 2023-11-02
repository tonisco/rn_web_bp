module.exports = {
  root: true,
  extends: [
    "@react-native",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["simple-import-sort", "import"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "import/newline-after-import": "warn",
    "@typescript-eslint/no-use-before-define": "off",
    "import/no-extraneous-dependencies": ["warn", { devDependencies: true }],
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "warn",
          {
            groups: [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
  ],
  ignorePatterns: ["service-worker*", ".eslint*"],
}
