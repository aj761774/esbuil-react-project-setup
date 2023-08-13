import esbuild from "esbuild";
import liveServer from "live-server";
import chokidar from "chokidar";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  const ctx =  await esbuild.context({
    entryPoints: ["./src/App.jsx"],
    bundle: true, // With the bundle option, esbuild will inline all dependencies into the output file.
    outfile: "./public/dist/bundle.js",
    loader: { ".js": "jsx", ".jpg": "dataurl", }, // use js loader for jsx files (loaders are used to convert other file types to js),
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.ENV || "development"),
    },
    minify: process.env.ENV === "production", // minify the output file only if Env is production,
    sourcemap: process.env.ENV === "development", // Source map allows the browser to map the code that it executes to the source => generate sourcemap only if Env is development,
  })

  // `chokidar` watcher source changes.
  chokidar
    // Watch for changes in the `src` folder.
    .watch("src/**/*.{js,jsx}", {
      interval: 0, // No delay
    })
    // Rebuilds esbuild (incrementally -- see `build.incremental`).
    .on("all", async () => {
        await ctx.rebuild()
    });
  // `liveServer` local server for hot reload.
  liveServer.start({
    // Opens the local server on start.
    open: true,
    host: "localhost",
    // Uses `PORT=...` or 8080 as a fallback.
    port: +process.env.PORT || 8080,
    // Uses `dist` as the local server folder.
    root: "public",
  });

})();
