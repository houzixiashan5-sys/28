module.exports = {
        publicPath: "./",
        devServer: {
                proxy: {
                        '/api': {
                                target: 'http://173.249.29.182:8889', // 你的后端接口
                                changeOrigin: true,
                                // pathRewrite: { '^/api': '/api' }     // 可选：移除 /api 前缀
                        }
                }
        }
}
