import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

export default ({ mode }) =>
  defineConfig({
    //用于github仓库静态站点部署
    base:
      loadEnv(mode, process.cwd()).VITE_ENV === "githubBuild"
        ? "/DevelopmentPlatform/"
        : "./",
    //对vite打包配置文件名称，防止github获取文件404
    build:
      loadEnv(mode, process.cwd()).VITE_ENV === "githubBuild"
        ? {
            rollupOptions: {
              output: {
                entryFileNames: "assets/[name]-[hash].js", // 确保文件名格式规范
                chunkFileNames: "assets/[name]-[hash].js", // 代码分块（动态导入）命名规则
                assetFileNames: "static/[ext]/[name]-[hash].[ext]",
                sanitizeFileName(name) {
                  const match = DRIVE_LETTER_REGEX.exec(name);
                  const driveLetter = match ? match[0] : "";
                  return (
                    driveLetter +
                    name
                      .slice(driveLetter.length)
                      .replace(INVALID_CHAR_REGEX, "")
                  );
                },
                manualChunks(id) {
                  if (id.includes("node_modules")) {
                    return (
                      id
                        .toString()
                        .match(
                          /\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//
                        )?.groups?.moduleName || "vendor"
                    );
                  }
                },
              },
            },
          }
        : "",
    server: {
      host: "0.0.0.0", // 监听所有网络接口
      port: 8011, // 你可以选择其他端口
      https: false, // 是否启用HTTPS
      open: false, // 自动打开浏览器
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
  });
