import './info.scss'
import twitterLogo from '../../../assets/twitter.png'
import githubLogo from '../../../assets/github.png'

export type InfoConfig = {
  twitter?: string
  github?: string
  description?: string
  title?: string
  documentTitle?: string
}

export class InfoUI {
  constructor(config: InfoConfig = {}) {
    if (config.documentTitle) {
      document.title = config.documentTitle
    }

    const container = document.createElement('div')
    container.classList.add('info-container')
    container.insertAdjacentHTML(
      'beforeend',
      `
${config.title ? `<h1>${config.title}</h1>` : ''}
${
  config.description
    ? `<div class="description">
  <p>${config.description}</p>
 </div>`
    : ``
}
<div class="social-container">
${
  config.twitter
    ? `<a href="${config.twitter}" class="social-button" target="_blank"> 
    <img src="${twitterLogo}" alt="Twitter logo linking to profile" />
  </a>`
    : ``
}
${
  config.github
    ? `<a href="${config.github}" class="social-button" target="_blank">
    <img src="${githubLogo}" alt="Github logo linking to repository" />
  </a>`
    : ``
}
</div>
    `
    )
    document.body.prepend(container)
  }
}
