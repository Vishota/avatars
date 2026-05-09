export class Hash {
  static fromString(value: string): number {
    let hash = 2166136261 >>> 0

    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i)
      hash = Math.imul(hash, 16777619)
    }

    return hash >>> 0
  }
}

