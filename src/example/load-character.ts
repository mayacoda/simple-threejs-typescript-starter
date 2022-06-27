import * as THREE from 'three'
import { MeshPhongMaterial } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { getDebugUi } from '../utils/debug-ui'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

export const loadCharacter = async () => {
  const loadingManager = new THREE.LoadingManager()
  return await loadWithPhongMaterials(loadingManager)
  // return await loadWithStandardMaterials(loadingManager)
}

/**
 * Loads the character using the MTL and OBJ loaders,
 * materials default to MeshPhongMaterial
 */
const loadWithPhongMaterials = async (loadingManager: THREE.LoadingManager) => {
  const objLoader = new OBJLoader(loadingManager)
  const mtlLoader = new MTLLoader(loadingManager)

  const materials = await mtlLoader.loadAsync('/space_dog/space_dog.mtl')
  materials.preload()
  objLoader.setMaterials(materials)

  const helmetMaterial: MeshPhongMaterial = materials.materials['mat0_helmet'] as MeshPhongMaterial
  const dogMaterial: MeshPhongMaterial = materials.materials['mat0_dog'] as MeshPhongMaterial
  const collarMaterial: MeshPhongMaterial = materials.materials['mat0_Collar'] as MeshPhongMaterial

  helmetMaterial.transparent = true
  helmetMaterial.opacity = 0.4

  fixUVSeams(helmetMaterial.map)
  fixUVSeams(dogMaterial.map)
  fixUVSeams(collarMaterial.map)

  const gui = getDebugUi()
  gui.add(helmetMaterial, 'opacity').min(0).max(1).step(0.0001).name('helmet opacity')

  return await objLoader.loadAsync('/space_dog/space_dog.obj')
}

/**
 * Loads the character using the OBJ for geometry,
 * creates MeshStandardMaterials for the materials and applies correct textures
 */
//@ts-ignore
const loadWithStandardMaterials = async (loadingManger: THREE.LoadingManager) => {
  const textureLoader = new THREE.TextureLoader(loadingManger)
  const objLoader = new OBJLoader(loadingManger)

  const helmetColorTexture = textureLoader.load('/space_dog/mat0_helmet-color.png')
  fixUVSeams(helmetColorTexture)

  const dogColorTexture = textureLoader.load('/space_dog/mat0_dog-color.png')
  fixUVSeams(dogColorTexture)

  const collarColorTexture = textureLoader.load('/space_dog/mat0_Collar-color.png')
  fixUVSeams(collarColorTexture)

  const spaceDog = await objLoader.loadAsync('/space_dog/space_dog.obj')

  const dogMesh = spaceDog.children[0] as THREE.Mesh
  const collarMesh = spaceDog.children[1] as THREE.Mesh
  const helmetMesh = spaceDog.children[2] as THREE.Mesh

  let dogMaterial = new THREE.MeshStandardMaterial({
    map: dogColorTexture
  })
  let collarMaterial = new THREE.MeshStandardMaterial({
    map: collarColorTexture,
    roughness: 0.5,
    metalness: 0.7
  })
  let helmetMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.25,
    metalness: .7
  })
  dogMesh.material = dogMaterial
  collarMesh.material = collarMaterial
  helmetMesh.material = helmetMaterial

  helmetMesh.material.transparent = true
  helmetMesh.material.opacity = 0.4

  const gui = getDebugUi()
  gui.add(collarMaterial, 'metalness').min(0).max(1).step(0.0001).name('collar metalness')
  gui.add(collarMaterial, 'roughness').min(0).max(1).step(0.0001).name('collar roughness')
  gui.add(helmetMaterial, 'metalness').min(0).max(1).step(0.0001).name('helmet metalness')
  gui.add(helmetMaterial, 'roughness').min(0).max(1).step(0.0001).name('helmet roughness')
  gui.add(helmetMaterial, 'opacity').min(0).max(1).step(0.0001).name('helmet opacity')

  return spaceDog
}

const fixUVSeams = (map: THREE.Texture | null) => {
  if (map) {
    map.minFilter = THREE.LinearFilter
  }
}
