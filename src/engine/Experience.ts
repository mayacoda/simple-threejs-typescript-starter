import { GameEntity } from './GameEntity'
import { Engine } from './Engine'
import { Resource } from './Resources'

export type ExperienceConstructor = new (engine: Engine) => Experience
export interface Experience extends GameEntity {
  init(): void
  resources: Resource[]
}
