import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dotenv from "dotenv";

dotenv.config();

import fs from "fs";
let https: any;
if (process.env.HTTPS === "true") {
  https = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE as any),
    cert: fs.readFileSync(process.env.SSL_CRT_FILE as any),
  };
} else {
  https = false;
}
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    envPrefix: "REACT_APP_",
    server: {
      https,
    },
    plugins: [
      nodePolyfills({
        protocolImports: true,
        exclude: ["constants", "crypto"],
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
      }),
      react(),
      // tamaguiPlugin({}),
      viteTsconfigPaths(),
      svgrPlugin(),
    ],
    resolve: {
      alias: {
        "react-native": "react-native-web",
        "react-native-svg": "react-native-svg-web",
        "react-native-webview": "react-native-web-webview",
      },
      dedupe: ["react", "ethers", "react-dom"],
    },
    build: {
      rollupOptions: {
        preserveEntrySignatures: "allow-extension",
      },
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    optimizeDeps: {
      include: ["react-dom", "@react-native/normalize-color"],
    },
    define: {
      "process.browser": true,
      "process.env": process.env,
    },
  };
});
