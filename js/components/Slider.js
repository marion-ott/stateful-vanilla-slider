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
      index
    }
    dispatchEvent(stateUpdated)
  }

  render() {
    const {index, children} = this.state
    return `
      <div class='Slider'>
        <h2>Current index is : ${index}</h2>
        <div class='Slider_slides'>
          ${children.map(child => child.render()).join('')}
        </div>
        <ul class='Slider_dots'>
          ${children
            .map((_, i) => `<li class=${`Slider_dot${i}`} data-index=${i}></li>`)
            .join('')}
        </ul>
      </div>
    `
  }
}

let stateUpdated = new Event('setState')
