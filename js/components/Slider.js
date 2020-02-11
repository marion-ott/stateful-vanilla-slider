export default class Slider {
  constructor(index, children) {
    this.state = {
      index,
      children
    }

    document.addEventListener('click', e => {
      e.stopPropagation()
      
      if(!e.target.dataset.index && !e.target.dataset.direction) {
        return
      }
      
      let id
      if (e.target.dataset.index) {
        id = e.target.dataset.index * 1
      } else if(e.target.dataset.direction) {
        const {index, children} = this.state
        switch (e.target.dataset.direction) {
          case 'prev':
            id = index > 0 ? index - 1 : children.length - 1
            break;
          case 'next':
            id = index < children.length - 1 ? index + 1 : 0
            break;
          default:
            break;
        }
      }
      this.setState(id)
    })
  }

  setState = (index, children = this.state.children) => {
    if(!children && !index) {
      return
    }

    this.state = {
      children,
      index
    }

    dispatchEvent(stateUpdated)
  }

  render() {
    const {index, children} = this.state

    return `
      <h2>Current index is : ${index}</h2>
      <div class='Slider'>
        ${children
          .map((child, i) => {
            const className = index === i ? ' --active' : ''
            return child.render(`Slider_slide${className}`)
          })
          .join('')}
      </div>
      <ul class='Slider_dots'>
        ${children
          .map((_, i) => {
            const className = index === i ? ' --active' : ''
            return `<li class='${`Slider_dot${className}`}' data-index=${i}></li>`
          })
          .join('')}
      </ul>
      <div class='Slider_nav'>
        <button data-direction='prev'>Prev</button>
        <button data-direction='next'>Next</button>
      </div>
    `
  }
}

let stateUpdated = new Event('setState')
