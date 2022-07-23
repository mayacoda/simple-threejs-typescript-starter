import * as fs from 'fs'

// remove src/demo directory
fs.rm('./src/demo', { recursive: true }, () => {})

// remove public/space_dog directory
fs.rm('./public/space_dog', { recursive: true }, () => {})

fs.rm('./assets/docs', { recursive: true }, () => {})

// rewrite src/main.ts to only include the style import
fs.writeFileSync(
  './src/main.ts',
  `import './style.scss'
import { Engine } from './engine/Engine'
import { Experience } from './engine/Experience'

new Engine({
  canvas: document.querySelector('#canvas') as HTMLCanvasElement,
  experience: class implements Experience {
    resources = []
    init() {}
    update() {}
    resize() {}
  }
})`
)

fs.writeFileSync(
  './README.md',
  `# Simple Three.js + TypeScript + Vite Starter
  
Local development:
\`\`\`bash
yarn
yarn dev
\`\`\`
`
)

console.log('🧹 Repo cleaned up')
