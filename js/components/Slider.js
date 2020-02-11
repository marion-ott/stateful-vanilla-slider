export default class Slider {
  constructor(index, children) {
    this.state = {
      index,
      children
    }
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

  dispatchActions = e => {    
    let id
    const { index, children } = this.state

    switch (e.target.dataset.action) {
      case 'updateIndex':
        id = e.target.dataset.index * 1
        break
      case 'next':
        id = index < children.length - 1 ? index + 1 : 0
        break
      case 'prev':
        id = index > 0 ? index - 1 : children.length - 1
        break
    }

    this.setState(id)
  }

  setListeners = () => {
    const btns = document.querySelectorAll('.listener')
    
    const listener = (e) => {
      this.dispatchActions(e)
    }

    btns.forEach(btn => {
      btn.addEventListener('click', listener)
    })
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
            return `<li class='${`Slider_dot${className} listener`}' data-action='updateIndex' data-index=${i}></li>`
          })
          .join('')}
      </ul>
      <div class='Slider_nav'>
        <button class='listener' data-action='prev'>Prev</button>
        <button class='listener' data-action='next'>Next</button>
      </div>
    `
  }
}

let stateUpdated = new Event('setState')
