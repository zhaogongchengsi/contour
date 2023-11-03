import antfu from "@antfu/eslint-config";
import unocss from "@unocss/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";

export default antfu(unocss.configs.flat, eslintConfigPrettier);
