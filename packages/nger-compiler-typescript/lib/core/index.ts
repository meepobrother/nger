import * as ts_module from "typescript/lib/tsserverlibrary";

function init(modules: { typescript: typeof ts_module }) {
  const ts = modules.typescript;
  /* More to come here */
}

export = init;