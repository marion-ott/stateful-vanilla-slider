export default class Slide {
  constructor({alt, img}) {
    this.alt = alt
    this.img = img
  }

  render(className) {
    return `
      <div class='${className}'>
        <img src='${this.img}' alt='${this.alt}'/>
      </div>
    `
  }
}
