export default class Slider {
  constructor(index, children) {
    this.state = {
      index,
      children
    }

    document.addEventListener('click', e => {
      e.stopPropagation()

      if (e.target.dataset.index) {
        const id = e.target.dataset.index
        this.setState(id)
      }
    })
  }

  setState = index => {
    this.state = {
      ...this.state,
      index: Number(index)
    }
    dispatchEvent(stateUpdated)
  }

  render() {
    const {index, children} = this.state

    return `
      <h2>Current index is : ${index}</h2>
      <div class='Slider'>
        ${children.map((child, i) => {
          const className = index === i ? ' --active' : ''
          return child.render(`Slider_slide${className}`)
        }).join('')}
      </div>
      <ul class='Slider_dots'>
        ${children
          .map((_, i) => {
            const className = index === i ? ' --active' : ''
            return `<li class='${`Slider_dot${className}`}' data-index=${i}></li>`
          }).join('')}
      </ul>
    `
  }
}

let stateUpdated = new Event('setState')
