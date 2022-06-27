/**
 * Calculates the maximum canvas size for the given aspect ratio,
 * depending on available screen space.
 */
export function calculateCanvasSize(aspectRatio: number): { width: number, height: number } {
  const maxWidth = window.innerWidth
  const maxHeight = window.innerHeight

  if (maxWidth / maxHeight < aspectRatio) {
    return {
      width: maxWidth,
      height: maxWidth / aspectRatio
    }
  } else {
    return {
      width: maxHeight * aspectRatio,
      height: maxHeight
    }
  }
}
