// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(  
    '/app/summarize',
    createProxyMiddleware({
      target: 'https://llama2-endpoint.onrender.com',
      changeOrigin: true,
    })
  );
};
 
