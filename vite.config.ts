import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("app", "app/layout.tsx", () => {
            route("", "app/home.tsx", { index: true });
            route("groups", "app/groups/layout.tsx", () => {
              route("", "app/groups/home.tsx", { index: true })
              route("create", "app/groups/create.tsx")
            })
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
