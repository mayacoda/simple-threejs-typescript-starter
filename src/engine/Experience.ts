import { GameEntity } from './GameEntity'
import { Engine } from './Engine'

export type ExperienceConstructor = new (engine: Engine) => Experience
export interface Experience extends GameEntity {
  init(): void
}
