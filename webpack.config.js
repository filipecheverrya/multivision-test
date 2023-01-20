const path = require('path');

module.exports = {
    entry: './scripts/template.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};