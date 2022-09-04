module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-url': {},
        autoprefixer: {
            overrideBrowserslist: [
                'last 2 version',
                'Safari >= 6', 
                'ie> 8'
            ]
        }
    }
}