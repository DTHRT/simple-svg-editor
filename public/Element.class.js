import { drawElement } from './utils.js'

const SVG_NS = 'http://www.w3.org/2000/svg'
const deg = 180 / Math.PI

export class Element {
  constructor(element, index, svg) {
    this.g = document.createElementNS(SVG_NS, 'g')
    this.g.setAttributeNS(null, 'id', index)
    svg.appendChild(this.g)

    element.parent = this.g

    this.el = drawElement(element)
    this.a = 0
    this.tagName = element.tagName
    this.elRect = this.el.getBoundingClientRect()
    this.svgRect = svg.getBoundingClientRect()
    this.Left = this.elRect.left - this.svgRect.left
    this.Right = this.elRect.right - this.svgRect.left
    this.Top = this.elRect.top - this.svgRect.top
    this.Bottom = this.elRect.bottom - this.svgRect.top

    this.LT = {
      x: this.Left,
      y: this.Top,
    }

    this.element = {
      x: element.pos.x,
      y: element.pos.y,
    }

    this.A = Math.atan2(this.elRect.height / 2, this.elRect.width / 2)

    this.box = drawElement({
      properties: {
        points: this.pointsValue(),
        fill: 'none',
        stroke: 'dodgerblue',
        'stroke-dasharray': '5,5',
      },
      parent: this.g,
      tagName: 'polyline',
    })

    this.lt = drawElement({
      properties: {
        cx: this.LT.x,
        cy: this.LT.y,
        r: 6,
        fill: 'blue',
      },
      parent: this.g,
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
    this.el.setAttributeNS(null, 'transform', transformValue)
    this.box.setAttributeNS(null, 'transform', transformValue)
    this.lt.setAttributeNS(null, 'transform', transformValue)
  }
}
