import * as lilGui from 'lil-gui'

let gui: lilGui.GUI | undefined

/**
 * Ensures that a single lil-gui instance is available to all parts of the code.
 */
export const getDebugUi = () => {
  if (!gui) {
    gui = new lilGui.GUI()

    if (!window.location.search.includes('debug')) {
      gui.hide()
    }

    window.addEventListener('keydown', (event) => {
      if (event.key === 'h') {
        if (gui?._hidden) {
          gui.show()
        } else {
          gui?.hide()
        }
      }
    })
  }
  return gui
}

