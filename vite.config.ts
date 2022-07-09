import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: 'workerMate',
            formats: ['es', 'umd'],
            fileName: (format) => `workerMate.${format}.js`,
        },
    },
});