const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://rt-backoffice.vercel.app",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api",
      },
    })
  );
};
