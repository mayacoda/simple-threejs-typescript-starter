import './example.scss'
import * as THREE from 'three'
import { loadCharacter} from './load-character'
import { createLights } from './create-lights'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { calculateCanvasSize } from '../utils/calculate-canvas-size'
import { animateCharacter, positionCharacter } from './transform-character'

import fragment from './glsl-import-example/main.frag';

/**
 * Creates an example scene with a rotating character.
 */
export const runExample = async () => {
  console.log(fragment)
  // Canvas
  const canvas = document.querySelector<HTMLDivElement>('#canvas')!

  // Scene
  const scene = new THREE.Scene()

  // Calculate aspect ratio and canvas size based on the background image
  const backgroundImage = new Image()
  backgroundImage.src = '/space_dog/background.png'

  const canvasAspectRatio = backgroundImage.width / backgroundImage.height

  let size = calculateCanvasSize(canvasAspectRatio)

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Camera
  const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
  camera.position.z = 3
  scene.add(camera)

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  // Scene elements
  createLights(scene)

  const spaceDog = await loadCharacter()
  scene.add(spaceDog)

  positionCharacter(spaceDog)
  controls.target = spaceDog.position

// Render loop
const clock = new THREE.Clock()

const animate = () => {
  requestAnimationFrame(animate)
  animateCharacter(spaceDog, clock.getElapsedTime())
  controls.update()
  renderer.render(scene, camera)
}

animate()

  // Resizing
  window.addEventListener('resize', () => {
    size = calculateCanvasSize(canvasAspectRatio)

    /**
     * Because in this example the aspect ratio of the canvas is fixes to 1536 / 2049,
     * we do not need to update the camera's aspect ratio when resizing. If you need to
     * update the camera's aspect ratio, you can do it like this:
     */
    // camera.aspect = size.width / size.height
    // camera.updateProjectionMatrix()

    renderer.setSize(size.width, size.height)
  })
}
