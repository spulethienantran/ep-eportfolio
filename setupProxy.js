const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        "https://bvyhgijzjg.execute-api.us-west-2.amazonaws.com/EP_API_PROD",
      changeOrigin: true,
    })
  );
};
