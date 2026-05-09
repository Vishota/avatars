import { Color } from './color'
import { Random } from './random'
import type { Palette } from '../types/avatar'

export class PaletteFactory {
  static create(random: Random): Palette {
    let base = random.int(0, 359)

    if (base > 95 && base < 145) {
      base += 55
    }

    const backgroundShift = random.bool() ? 44 : -44
    const backgroundHue2 = base + backgroundShift

    const bodyHue = base + 180 + random.int(-16, 16)

    return {
      backgroundStart: Color.hsl(base, 72, 64),
      backgroundEnd: Color.hsl(backgroundHue2, 78, 46),

      bodyLight: Color.hsl(bodyHue, 80, 60),
      bodyDark: Color.hsl(bodyHue + 14, 76, 36),

      accent: Color.hsl(bodyHue + 28, 92, 74),

      iris: Color.hsl(
        bodyHue + random.int(70, 140),
        88,
        52
      )
    }
  }
}

