import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": "airbnb-base",
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "rules": {
      // Tambahkan aturan custom di sini jika diperlukan
    }
  }

];