import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import image from '@rollup/plugin-image';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        exclude: ['**/*.stories.tsx', '**/*.test.tsx']
      }
    }),
    postcss({
      extensions: ['.css', '.less'],
      use: [
        ['less', { javascriptEnabled: true }]
      ],
      extract: false,
      modules: false,
      autoModules: false,
      minimize: true
    }),
    image(),
    terser()
  ],
  external: ['react', 'react-dom']
}; 