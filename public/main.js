const svg = document.querySelector('svg')

let rotating = false
let dragging = false

const delta = {
  x: 0,
  y: 0,
}

svg.addEventListener(
  'mousedown',
  (evt) => {
    // let index = parseInt(evt.target.parentElement.id) - 1
    // if (evt.target.tagName === elementsArr[index].tagName) {
    //   dragging = index + 1
    //
    //   const mouseCoordinates = oMousePos(svg, evt)
    //   delta.x = elementsArr[index].element.x - mouseCoordinates.x
    //   delta.y = elementsArr[index].element.y - mouseCoordinates.y
    // }
    //
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
    dragging = false
  },
  false
)

svg.addEventListener(
  'mouseleave',
  () => {
    rotating = false
    dragging = false
  },
  false
)

svg.addEventListener(
  'mousemove',
  (evt) => {
    // const mouseCoordinates = oMousePos(svg, evt)
    //
    // if (dragging) {
    //   let index = dragging - 1
    //   elementsArr[index].element.x = mouseCoordinates.x + delta.x
    //   elementsArr[index].element.y = mouseCoordinates.y + delta.y
    //   elementsArr[index].update()
    // }
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
