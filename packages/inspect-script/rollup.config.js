import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

export default {
    input: './src/inspect/index.js',
    output: {
        file: 'dist/inspect/index.js',
        format: 'umd'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [
                [
                    'env',
                    {
                        modules: false
                    }
                ]
            ],
            plugins: ['external-helpers']
        }),
        uglify()
    ]
}
