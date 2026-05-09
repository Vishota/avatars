export interface Avatar {
  render(canvas: HTMLCanvasElement): void
  toDataURL(size?: number): string
}

export interface Palette {
  backgroundStart: string
  backgroundEnd: string

  bodyLight: string
  bodyDark: string

  accent: string
  iris: string
}

