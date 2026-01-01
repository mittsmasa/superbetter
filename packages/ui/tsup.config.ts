import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    preset: 'src/preset.ts',
    'hooks/index': 'src/hooks/index.ts',
    'icons/index': 'src/components/icons/index.ts',
  },
  format: ['esm'],
  dts: false,
  clean: true,
  external: ['react', 'react-dom', '@floating-ui/react', 'motion'],
  noExternal: [/styled-system/],
  treeshake: false,
  splitting: false,
  sourcemap: true,
  esbuildOptions(options) {
    options.resolveExtensions = ['.mjs', '.js', '.ts', '.tsx', '.json'];
    options.banner = {
      js: "'use client';",
    };
  },
});
