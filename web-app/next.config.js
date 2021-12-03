module.exports = {
  async headers() {
    return [
      {
        // matching all routes
        source: "/:path*",
        headers: [
          // needed for enabling SharedArrayBuffer used in ffmpeg.wasm
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ]
      }
    ]
  }
};