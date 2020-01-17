const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

const path = resolve(__dirname, "../dist/main.d.ts");

const contents = readFileSync(path, "utf-8");

writeFileSync(
  path,
  contents.replace(
    RegExp(`declare module "main"`, "g"),
    `declare module "jsonc-pragma"`
  )
);
