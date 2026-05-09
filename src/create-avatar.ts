import { AvatarRenderer } from './renderers/avatar-renderer'
import type { Avatar } from './types/avatar'

export function createAvatar(
  seed: string
): Avatar {
  return {
    render(canvas) {
      AvatarRenderer.render(seed, canvas)
    },

    toDataURL(size = 320) {
      const canvas = document.createElement('canvas')

      canvas.width = size
      canvas.height = size

      AvatarRenderer.render(seed, canvas)

      return canvas.toDataURL('image/png')
    }
  }
}

