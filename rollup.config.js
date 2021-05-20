import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import banner from 'rollup-plugin-banner'

const path =  require('path')
const resolveDir = dir => path.join(__dirname, dir)

export default {
    input: 'src/main.js',
    output: [
        {
            file: 'demo/js/demo.js',
            format: 'umd',
            name: 'demo'
        },
        {
            file: `dist/${process.env.npm_package_version}/demo.min.js`,
            format: 'umd',
            name: 'demo',
            plugins: [
                terser()
            ]
        }
    ],
    plugins: [
        resolve({
            browser: true
        }),
        babel({
            babelHelpers: 'bundled'
        }),
        commonjs(),
        json(),
        alias({
            entries: [{
                find: '@',
                replacement: resolveDir('src')
            }]
        }),
        banner(`name: <%= pkg.name %>\nversion:v<%= pkg.version %>\nauthor=<%= pkg.nauthor %>`)
    ]
}