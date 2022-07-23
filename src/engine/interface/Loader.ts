import './loader.scss'

export class Loader {
  element: HTMLDivElement

  constructor() {
    this.element = document.createElement('div')
    this.element.classList.add('loader')
    this.element.insertAdjacentHTML(
      'beforeend',
      `
        <div class="loader-inner" aria-role="progressbar">
          <h1 class="progress-number">0%</h1>
          <div class="progress-bar"></div>
        </div>
        `
    )

    this.start()
  }

  start() {
    document.body.prepend(this.element)
  }

  setProgress(progress: number) {
    const progressNumber = this.element.querySelector(
      '.progress-number'
    ) as HTMLHeadingElement

    progressNumber!.innerText = `${Math.floor(progress * 100)}%`

    const progressBar = this.element.querySelector(
      '.progress-bar'
    ) as HTMLDivElement

    progressBar.style.width = `${progress * 100}%`
  }

  complete() {
    this.element.remove()
  }
}
