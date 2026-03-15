import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    clearMocks: true,
    css: true,
    environment: "jsdom",
    include: ["app/**/*.{test,spec}.{ts,tsx}"],
    restoreMocks: true,
    setupFiles: ["./app/test/setup.ts"],
  },
});
