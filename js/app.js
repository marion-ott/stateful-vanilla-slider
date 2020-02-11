import data from './utils/data.js'
import Slider from './components/Slider.js'
import Slide from './components/Slide.js'

const initialIndex = 0
const slides = []

data.forEach(el => {
  const slide = new Slide(el)
  slides.push(slide)
})

const slider = new Slider(initialIndex, slides)

const update = () => {
  document.getElementById('root').innerHTML = slider.render()
  slider.setListeners()
}

window.addEventListener('setState', update)
update()

const addCat = e => {
  e.preventDefault()
  const inputs = e.target.querySelectorAll('input')
  const newCat = {}
  Array.from(inputs).forEach(input => (newCat[input.name] = input.value))
  slides.push(new Slide(newCat))
  slider.setState(slider.state.index, slides)
}

const form = document.getElementById('form')
form.addEventListener('submit', addCat)
