import './style.scss'
import { Engine } from './engine/Engine'
import { Demo } from './demo/Demo'

new Engine({
  canvas: document.querySelector('#canvas') as HTMLCanvasElement,
  experience: Demo,
  info: {
    twitter: 'https://twitter.com/maya_ndljk',
    github: 'https://github.com/mayacoda/simple-threejs-typescript-starter',
    description: 'A simple Three.js + Typescript + Vite starter project',
    documentTitle: 'Three.js + Typescript + Vite',
    title: 'A cube on a plane',
  },
})
