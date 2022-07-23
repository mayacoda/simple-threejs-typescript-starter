import glsl from 'vite-plugin-glsl'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [glsl.default()], //For some reason, cannot resolve glsl(). Workaround found on vite-plugin-glsl issue (https://github.com/UstymUkhman/vite-plugin-glsl/issues/1#issuecomment-972660771)
})
