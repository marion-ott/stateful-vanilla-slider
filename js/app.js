import data from './utils/data.js'
import Slider from './components/Slider.js'
import Slide from './components/Slide.js'

const initialIndex = 0
const slides = []

data.forEach(({text, img}) => {
  const slide = new Slide(text, img)
  slides.push(slide)
})

var slider = new Slider(initialIndex, slides)

function update() {
  document.getElementById('root').innerHTML = slider.render()
}

window.addEventListener('setState', update)
update()
