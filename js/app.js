import data from './utils/data.js'
import Slider from './components/Slider.js'
import Slide from './components/Slide.js'

const initialIndex = 0
const slides = []

data.forEach(el => {
  const slide = new Slide(el)
  slides.push(slide)
})

var slider = new Slider(initialIndex, slides)

function update() {
  document.getElementById('root').innerHTML = slider.render()
}

const addCat = (e) => {
  e.preventDefault()
  const inputs = e.target.querySelectorAll('input')
  const newCat = {}
  Array.from(inputs).forEach(input => newCat[input.name] = input.value )
  slides.push(new Slide(newCat))
  slider.setState(slider.state.index, slides)
}

const form = document.getElementById('form')
form.addEventListener('submit', addCat)

window.addEventListener('setState', update)
update()
