export const Color = {
  hsl(h: number, s: number, l: number): string {
    return `hsl(${((h % 360) + 360) % 360} ${s}% ${l}%)`
  }
}

