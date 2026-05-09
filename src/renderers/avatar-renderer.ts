import { Random } from '../core/random'
import { PaletteFactory } from '../core/palette'
import { ShapeRenderer } from './shape-renderer'

export class AvatarRenderer {
  static render(
    seed: string,
    canvas: HTMLCanvasElement
  ): void {
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Canvas context not available')
    }

    const width = canvas.width
    const height = canvas.height

    const random = new Random(seed)

    const palette = PaletteFactory.create(random)

    ctx.clearRect(0, 0, width, height)

    ctx.save()

    ctx.scale(width / 320, height / 320)

    this.drawBackground(ctx, random, palette)

    ctx.translate(160, 170)

    this.drawShadow(ctx)

    ctx.rotate(random.range(-0.125, 0.125))

    this.drawBody(ctx, random, palette)

    this.drawFace(ctx, random, palette)

    this.drawAccessories(ctx, random, palette)

    ctx.restore()
  }

  private static drawBackground(
    ctx: CanvasRenderingContext2D,
    random: Random,
    palette: ReturnType<typeof PaletteFactory.create>
  ): void {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      320,
      320
    )

    gradient.addColorStop(
      0,
      palette.backgroundStart
    )

    gradient.addColorStop(
      0.55,
      palette.backgroundEnd
    )

    gradient.addColorStop(
      1,
      palette.backgroundStart
    )

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 320, 320)

    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(
        255,
        255,
        255,
        ${random.range(0, 0.06)}
      )`

      ctx.beginPath()

      ctx.arc(
        random.range(0, 320),
        random.range(0, 320),
        random.range(0, 2),
        0,
        Math.PI * 2
      )

      ctx.fill()
    }
  }

  private static drawShadow(
    ctx: CanvasRenderingContext2D
  ): void {
    ctx.fillStyle = 'rgba(0,0,0,.12)'

    ctx.beginPath()

    ctx.ellipse(
      0,
      92,
      70,
      18,
      0,
      0,
      Math.PI * 2
    )

    ctx.fill()
  }

  private static drawBody(
    ctx: CanvasRenderingContext2D,
    random: Random,
    palette: ReturnType<typeof PaletteFactory.create>
  ): void {
    ShapeRenderer.draw(ctx, random)

    const gradient = ctx.createRadialGradient(
      -20,
      -30,
      8,
      0,
      0,
      120
    )

    gradient.addColorStop(0, palette.bodyLight)
    gradient.addColorStop(0.72, palette.bodyLight)
    gradient.addColorStop(1, palette.bodyDark)

    ctx.fillStyle = gradient
    ctx.fill()

    ctx.fillStyle = 'rgba(255,255,255,.18)'

    ctx.beginPath()

    ctx.arc(-25, -30, 40, 0, Math.PI * 2)

    ctx.fill()
  }

  private static drawFace(
    ctx: CanvasRenderingContext2D,
    random: Random,
    palette: ReturnType<typeof PaletteFactory.create>
  ): void {
    const eyeY = random.range(-10, 4)
    const eyeDX = random.range(28, 38)
    const eyeR = random.range(8, 14)

    ;[-1, 1].forEach(side => {
      const pupilX =
        side * eyeDX + random.range(-2, 2)

      const pupilY =
        eyeY + random.range(-2, 2)

      ctx.fillStyle = '#fff'

      ctx.beginPath()

      ctx.arc(
        side * eyeDX,
        eyeY,
        eyeR,
        0,
        Math.PI * 2
      )

      ctx.fill()

      ctx.fillStyle = palette.iris

      ctx.beginPath()

      ctx.arc(
        pupilX,
        pupilY,
        eyeR * 0.48,
        0,
        Math.PI * 2
      )

      ctx.fill()

      ctx.fillStyle = '#111'

      ctx.beginPath()

      ctx.arc(
        pupilX,
        pupilY,
        eyeR * 0.24,
        0,
        Math.PI * 2
      )

      ctx.fill()

      ctx.fillStyle = 'rgba(255,255,255,.9)'

      ctx.beginPath()

      ctx.arc(
        pupilX - eyeR * 0.12,
        pupilY - eyeR * 0.12,
        eyeR * 0.09,
        0,
        Math.PI * 2
      )

      ctx.fill()
    })

    ctx.strokeStyle = 'rgba(20,20,20,.82)'
    ctx.lineWidth = 5
    ctx.lineCap = 'round'

    ctx.beginPath()

    ctx.arc(
      0,
      25,
      24,
      0.15 * Math.PI,
      0.85 * Math.PI
    )

    ctx.stroke()
  }

  private static drawAccessories(
    ctx: CanvasRenderingContext2D,
    random: Random,
    palette: ReturnType<typeof PaletteFactory.create>
  ): void {
    if (random.bool(0.45)) {
      ctx.strokeStyle = 'rgba(255,255,255,.72)'
      ctx.lineWidth = 8

      ctx.beginPath()

      ctx.arc(
        0,
        -58,
        44,
        Math.PI,
        Math.PI * 2
      )

      ctx.stroke()
    }

    if (random.bool(0.55)) {
      ctx.fillStyle = palette.accent

      ctx.fillRect(-54, -82, 20, 10)
      ctx.fillRect(34, -82, 20, 10)
    }

    if (random.bool(0.4)) {
      ctx.strokeStyle = 'rgba(255,255,255,.7)'
      ctx.lineWidth = 6

      ctx.beginPath()

      ctx.moveTo(-50, -40)
      ctx.lineTo(-78, -55)

      ctx.moveTo(50, -40)
      ctx.lineTo(78, -55)

      ctx.stroke()
    }
  }
}

