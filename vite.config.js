import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://apirevamp.exaque.com", 
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost",
        configure: (proxy, _options) => {
          proxy.on("proxyRes", (proxyRes) => {
            const cookies = proxyRes.headers["set-cookie"];
            if (cookies) {
              proxyRes.headers["set-cookie"] = cookies.map((c) =>
                c
                  .replace(/;\s*Secure/gi, "")
                  .replace(/SameSite=Strict/gi, "SameSite=Lax")
              );
            }
          });
        },
      },
      "/uploads": {
        target: "https://apirevamp.exaque.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});