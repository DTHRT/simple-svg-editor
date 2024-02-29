import { ElementClass } from './Element.class.js'
import { oMousePos } from './utils.js'

const svg = document.querySelector('svg')

let isRotating = false
let isDragging = false

const delta = {
  x: 0,
  y: 0,
}

const supportedTags = ['path', 'polygon']
const elements = []
let selectedElement = null
let selectedRotationKnob = null

svg.addEventListener(
  'mousedown',
  (evt) => {
    const currentElement = evt.target

    if (currentElement.tagName === 'circle') {
      isRotating = true
      selectedRotationKnob = currentElement.getAttribute('id')
      return
    }

    if (!supportedTags.some((tag) => tag === currentElement.tagName)) return

    if (
      elements.length > 0 &&
      elements.find((element) => element.link === currentElement)
    ) {
      elements.map((element) => {
        if (element.link === currentElement) {
          selectedElement = element
        }
      })
    } else {
      selectedElement = new ElementClass(currentElement, svg)
      selectedElement.update()
      elements.push(selectedElement)
    }

    const { x: mouseX, y: mouseY } = oMousePos(svg, evt)
    delta.x = selectedElement.element.x - mouseX
    delta.y = selectedElement.element.y - mouseY
    isDragging = true
  },
  false
)

document.addEventListener(
  'mouseup',
  () => {
    isRotating = false
    isDragging = false
  },
  false
)

document.addEventListener(
  'mousemove',
  (evt) => {
    const { x: mouseX, y: mouseY } = oMousePos(svg, evt)
    if (!elements.length) return

    if (isDragging) {
      selectedElement.element.x = mouseX + delta.x
      selectedElement.element.y = mouseY + delta.y
      selectedElement.update()
    }

    if (isRotating) {
      switch (selectedRotationKnob) {
        case 'rotateKnobLT':
          selectedElement.a =
            Math.atan2(
              selectedElement.element.y - mouseY,
              selectedElement.element.x - mouseX
            ) - selectedElement.A
          break

        case 'rotateKnobRT':
          selectedElement.a =
            Math.atan2(
              mouseY - selectedElement.element.y,
              mouseX - selectedElement.element.x
            ) + selectedElement.A
          break

        case 'rotateKnobLB':
          selectedElement.a =
            Math.atan2(
              selectedElement.element.y - mouseY,
              selectedElement.element.x - mouseX
            ) + selectedElement.A
          break

        case 'rotateKnobRB':
          selectedElement.a =
            Math.atan2(
              mouseY - selectedElement.element.y,
              mouseX - selectedElement.element.x
            ) - selectedElement.A
          break
      }

      selectedElement.update()
    }
  },
  false
)

document.addEventListener('click', (e) => {
  const { x, y } = svg.getBoundingClientRect()
  console.log('mouse', e.clientX - x, e.clientY - y)
})
