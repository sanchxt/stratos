import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    name: "Stratos",
    version: "0.0.1",
    permissions: ["storage"],
    action: {},
    chrome_url_overrides: {
      newtab: "src/pages/newtab/index.html",
    },
  },
  srcDir: "src",
});
