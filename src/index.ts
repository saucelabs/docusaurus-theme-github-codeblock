import { LoadContext } from "@docusaurus/types";
import { Configuration } from "webpack";

const DEFAULT_OPTIONS: Record<string, any> = {
};

module.exports = function (
  context: LoadContext,
  opts: Record<string, any>
) {
  const options: Record<string, any> = { ...DEFAULT_OPTIONS, ...opts };

  return {
    name: "docusaurus-code-references",
    configureWebpack(config: Configuration, isServer: boolean) {
      return {
        plugins: [],
        module: {
          rules: [],
        },
      };
    },
    contentLoaded () {
        console.log(context, opts)
    }
  };
};