import { Random } from '../core/random'

export class ShapeRenderer {
  static draw(
    ctx: CanvasRenderingContext2D,
    random: Random
  ): void {
    const type = random.int(0, 5)

    ctx.beginPath()

    if (type === 0) {
      this.polygon(ctx, 7, 78, 18, random)
      return
    }

    if (type === 1) {
      this.star(ctx, 12, 82, 54, random)
      return
    }

    if (type === 2) {
      ctx.ellipse(0, 0, 78, 68, 0, 0, Math.PI * 2)
      return
    }

    if (type === 3) {
      this.heart(ctx)
      return
    }

    if (type === 4) {
      this.drop(ctx)
      return
    }

    ctx.roundRect(-72, -72, 144, 144, 32)
  }

  private static polygon(
    ctx: CanvasRenderingContext2D,
    sides: number,
    size: number,
    jitter: number,
    random: Random
  ): void {
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2

      const radius = size + random.range(0, jitter)

      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }

    ctx.closePath()
  }

  private static star(
    ctx: CanvasRenderingContext2D,
    points: number,
    outer: number,
    inner: number,
    random: Random
  ): void {
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2

      const radius =
        i % 2
          ? inner
          : outer + random.range(0, 8)

      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }

    ctx.closePath()
  }

  private static heart(
    ctx: CanvasRenderingContext2D
  ): void {
    ctx.moveTo(-70, -20)

    ctx.quadraticCurveTo(-78, -88, 0, -78)
    ctx.quadraticCurveTo(78, -88, 70, -20)

    ctx.quadraticCurveTo(66, 70, 0, 84)
    ctx.quadraticCurveTo(-66, 70, -70, -20)

    ctx.closePath()
  }

  private static drop(
    ctx: CanvasRenderingContext2D
  ): void {
    ctx.moveTo(0, -86)

    ctx.bezierCurveTo(80, -78, 94, 26, 0, 88)
    ctx.bezierCurveTo(-94, 26, -80, -78, 0, -86)

    ctx.closePath()
  }
}

