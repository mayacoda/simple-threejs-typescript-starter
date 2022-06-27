import * as fs from 'fs'

// remove src/example directory
fs.rm('./src/example', { recursive: true }, () => {})

// remove public/space_dog directory
fs.rm('./public/space_dog',  { recursive: true }, () => {})

// rewrite src/main.ts to only include the style import
fs.writeFileSync('./src/main.ts', `import './style.scss'`)

console.log('🧹 Example removed')
