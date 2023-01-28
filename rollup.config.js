const { resolve } = require('path')
const typescript = require('@rollup/plugin-typescript');
const __root = __dirname

module.exports = {
    input: resolve(__root, 'src/main.ts'),
    output: {
        file: resolve(__root, 'dist/main.js'),
    },
    plugins: [
        typescript({
            tsconfig: resolve(__root, 'tsconfig.json')
        })
    ]
}