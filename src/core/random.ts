import { Hash } from './hash'

export class Random {
  private state: number

  constructor(seed: string) {
    this.state = Hash.fromString(seed) || 1
  }

  next(): number {
    let s = this.state

    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5

    this.state = s >>> 0

    return this.state / 4294967296
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min)
  }

  int(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1))
  }

  bool(chance = 0.5): boolean {
    return this.next() < chance
  }
}

