import { drawElement } from './utils.js'

const deg = 180 / Math.PI

export class ElementClass {
  constructor(element, svg) {
    this.id = element.parentElement.getAttribute('id')
    this.link = element
    this.a = 0
    this.tagName = element.tagName

    const transformString = element.getAttribute('transform')
    const translateMatch = transformString.match(/translate\(([^)]+)\)/)
    const translate = {
      x: 0,
      y: 0,
    }

    if (translateMatch) {
      const translateValues = translateMatch[1]
        .split(',')
        .map(function (value) {
          return parseFloat(value.trim())
        })

      translate.x = translateValues[0]
      translate.y = translateValues[1]
    }

    this.elRect = this.link.getBoundingClientRect()

    this.svgRect = svg.getBoundingClientRect()
    this.Left = this.elRect.left - translate.x - this.svgRect.left
    this.Right = this.elRect.right - translate.x - this.svgRect.left
    this.Top = this.elRect.top - translate.y - this.svgRect.top
    this.Bottom = this.elRect.bottom - translate.y - this.svgRect.top

    this.LT = {
      x: this.Left,
      y: this.Top,
    }

    this.element = {
      x: this.elRect.x - this.svgRect.x + this.elRect.width / 2,
      y: this.elRect.y - this.svgRect.y + this.elRect.height / 2,
    }

    this.A = Math.atan2(this.elRect.height / 2, this.elRect.width / 2)

    this.box = drawElement({
      properties: {
        points: this.pointsValue(),
        fill: 'none',
        stroke: 'dodgerblue',
        'stroke-dasharray': '5,5',
      },
      parent: element.parentElement,
      tagName: 'polyline',
    })

    this.lt = drawElement({
      properties: {
        cx: this.LT.x,
        cy: this.LT.y,
        r: 6,
        fill: 'blue',
      },
      parent: element.parentElement,
      tagName: 'circle',
    })
  }

  pointsValue() {
    // points for the box
    return (
      `${this.Left},${this.Top} ${this.Right},${this.Top} ` +
      `${this.Right},${this.Bottom} ${this.Left},${this.Bottom} ${this.Left},${this.Top}`
    )
  }

  update() {
    const transformValue = `translate(${this.element.x}, ${this.element.y}) rotate(${this.a * deg})`
    this.link.setAttributeNS(null, 'transform', transformValue)
    this.box.setAttributeNS(null, 'transform', transformValue)
    this.lt.setAttributeNS(null, 'transform', transformValue)
  }
}
