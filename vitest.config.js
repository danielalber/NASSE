import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        exclude: [...configDefaults.exclude],
        coverage: {
            provider: 'c8',
            all: true
        }
    },
})