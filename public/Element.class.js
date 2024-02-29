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

    this.RT = {
      x: this.Right,
      y: this.Top,
    }

    this.LB = {
      x: this.Left,
      y: this.Bottom,
    }

    this.RB = {
      x: this.Right,
      y: this.Bottom,
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

    this.rotateKnobLT = drawElement({
      properties: {
        class: 'rotationKnob',
        cx: this.LT.x - 25,
        cy: this.LT.y - 25,
        r: 20,
        id: 'LT',
      },
      parent: element.parentElement,
      tagName: 'circle',
    })

    this.rotateKnobRT = drawElement({
      properties: {
        class: 'rotationKnob',
        cx: this.RT.x + 25,
        cy: this.RT.y - 25,
        r: 20,
        id: 'RT',
      },
      parent: element.parentElement,
      tagName: 'circle',
    })

    this.rotateKnobLB = drawElement({
      properties: {
        class: 'rotationKnob',
        cx: this.LB.x - 25,
        cy: this.LB.y + 25,
        r: 20,
        id: 'LB',
      },
      parent: element.parentElement,
      tagName: 'circle',
    })
    this.rotateKnobRB = drawElement({
      properties: {
        class: 'rotationKnob',
        cx: this.RB.x + 25,
        cy: this.RB.y + 25,
        r: 20,
        id: 'RB',
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
    this.rotateKnobLT.setAttributeNS(null, 'transform', transformValue)
    this.rotateKnobRT.setAttributeNS(null, 'transform', transformValue)
    this.rotateKnobLB.setAttributeNS(null, 'transform', transformValue)
    this.rotateKnobRB.setAttributeNS(null, 'transform', transformValue)
  }
}
