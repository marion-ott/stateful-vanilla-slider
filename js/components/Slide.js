export default class Slide {
  constructor(text, img) {
    this.text = text
    this.img = img
  }

  render() {
    return `
      <div class='Slider_slide'>
        <img src='${this.img}' alt=''/>
        <p>${this.text}</p>
      </div>
    `
  }
}
