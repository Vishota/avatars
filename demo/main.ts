import { createAvatar } from '../src'

const seedInput =
  document.querySelector<HTMLInputElement>('#seed')!

const canvas =
  document.querySelector<HTMLCanvasElement>('#canvas')!

function render(): void {
  const avatar = createAvatar(seedInput.value)

  avatar.render(canvas)
}

seedInput.addEventListener('input', render)

render()

