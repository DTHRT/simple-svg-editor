import { Element } from './Element.class.js'
import { oMousePos } from './utils.js'

const svg = document.querySelector('svg')

let rotating = false
let dragging = false
let impact = {
  x: 0,
  y: 0,
}

const delta = {
  x: 0,
  y: 0,
}

let mouse = {
  x: 0,
  y: 0,
}

const elementsArr = []
const objectsArr = []

const hexaPolygon = {
  properties: {
    fill: 'url(#trama)',
    points:
      '70,0 35.00000000000001,60.6217782649107 -34.999999999999986,60.62177826491071 -70,8.572527594031473e-15 -35.00000000000003,-60.621778264910695 35.00000000000001,-60.6217782649107 70,-1.7145055188062946e-14',
  },
  tagName: 'polygon',
  pos: {
    x: 130,
    y: 250,
  },
}
objectsArr.push(hexaPolygon)

const pentaPolygon = {
  properties: {
    fill: 'url(#trama)',
    points:
      '0,-70 66.57395614066074,-21.631189606246316 41.14496766047312,56.63118960624632 -41.144967660473114,56.63118960624632 -66.57395614066075,-21.63118960624631 -1.2858791391047208e-14,-70',
  },
  tagName: 'polygon',
  pos: {
    x: 400,
    y: 400,
  },
}
objectsArr.push(pentaPolygon)

const ellipsePath = {
  properties: {
    d: 'M-90,0 a90,50 0 1, 0 0,-1  z',
    fill: 'url(#trama)',
  },
  tagName: 'path',
  pos: {
    x: 370,
    y: 150,
  },
}
objectsArr.push(ellipsePath)

for (let i = 0; i < objectsArr.length; i++) {
  let el = new Element(objectsArr[i], i + 1, svg)
  el.update()
  elementsArr.push(el)
}

svg.addEventListener(
  'mousedown',
  function (evt) {
    let index = parseInt(evt.target.parentElement.id) - 1
    if (evt.target.tagName == elementsArr[index].tagName) {
      dragging = index + 1
      impact = oMousePos(svg, evt)
      delta.x = elementsArr[index].element.x - impact.x
      delta.y = elementsArr[index].element.y - impact.y
    }

    if (evt.target.tagName == 'circle') {
      rotating = parseInt(evt.target.parentElement.id)
    }
  },
  false
)

svg.addEventListener(
  'mouseup',
  function (evt) {
    rotating = false
    dragging = false
  },
  false
)

svg.addEventListener(
  'mouseleave',
  function (evt) {
    rotating = false
    dragging = false
  },
  false
)

svg.addEventListener(
  'mousemove',
  function (evt) {
    mouse = oMousePos(svg, evt)

    if (dragging) {
      let index = dragging - 1
      elementsArr[index].element.x = mouse.x + delta.x
      elementsArr[index].element.y = mouse.y + delta.y
      elementsArr[index].update()
    }

    if (rotating) {
      let index = rotating - 1
      elementsArr[index].a =
        Math.atan2(
          elementsArr[index].element.y - mouse.y,
          elementsArr[index].element.x - mouse.x
        ) - elementsArr[index].A
      elementsArr[index].update()
    }
  },
  false
)
