import { ElementClass } from './Element.class.js'
import { oMousePos } from './utils.js'

const svg = document.querySelector('svg')

let rotating = false
let isDragging = false

const delta = {
  x: 0,
  y: 0,
}

const supportedTags = ['path', 'polygon']
const elements = []

svg.addEventListener(
  'mousedown',
  (evt) => {
    const currentElement = evt.target
    if (!supportedTags.some((tag) => tag === currentElement.tagName)) return

    let selectedElement = null

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

    // if (evt.target.tagName === 'circle') {
    //   rotating = parseInt(evt.target.parentElement.id)
    // }
  },
  false
)

svg.addEventListener(
  'mouseup',
  () => {
    rotating = false
    isDragging = false
  },
  false
)

svg.addEventListener(
  'mouseleave',
  () => {
    rotating = false
    isDragging = false
  },
  false
)

svg.addEventListener(
  'mousemove',
  (evt) => {
    const { x: mouseX, y: mouseY } = oMousePos(svg, evt)
    if (!elements.length) return

    const currentElement = evt.target
    const selectedElement = elements.find(
      (element) => element.link === currentElement
    )

    if (isDragging) {
      selectedElement.element.x = mouseX + delta.x
      selectedElement.element.y = mouseY + delta.y
      selectedElement.update()
    }

    //
    // if (rotating) {
    //   let index = rotating - 1
    //   elementsArr[index].a =
    //     Math.atan2(
    //       elementsArr[index].element.y - mouseCoordinates.y,
    //       elementsArr[index].element.x - mouseCoordinates.x
    //     ) - elementsArr[index].A
    //   elementsArr[index].update()
    // }
  },
  false
)

document.addEventListener('click', (e) => {
  const { x, y } = svg.getBoundingClientRect()
  console.log('mouse', e.clientX - x, e.clientY - y)
})
