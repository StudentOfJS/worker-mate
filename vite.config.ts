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
            entry: path.resolve(__dirname, 'src/lib/useWorker.ts'),
            name: 'workerFriend',
            formats: ['es', 'umd'],
            fileName: (format) => `workerFriend.${format}.js`,
        },
    },
});