const SVG_NS = 'http://www.w3.org/2000/svg'
const svg = document.querySelector('svg')
const deg = 180 / Math.PI

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

const elementsArr = []
const objectsArr = []

const hexaPolygon = {
  properties: {
    fill: 'url(#trama)',
    points:
      '70,0 35.00000000000001,60.6217782649107 -34.999999999999986,60.62177826491071 -70,8.572527594031473e-15 -35.00000000000003,-60.621778264910695 35.00000000000001,-60.6217782649107 70,-1.7145055188062946e-14',
  },
  //parent: this.g,
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
  //parent: this.g,
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
  //parent: this.g,
  tagName: 'path',
  pos: {
    x: 370,
    y: 150,
  },
}
objectsArr.push(ellipsePath)

function Element(o, index) {
  this.g = document.createElementNS(SVG_NS, 'g')
  this.g.setAttributeNS(null, 'id', index)
  svg.appendChild(this.g)

  o.parent = this.g

  this.el = drawElement(o)
  this.a = 0
  this.tagName = o.tagName
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
  this.c = {
    x: 0, //(this.elRect.width / 2) + this.Left,
    y: 0, //(this.elRect.height / 2) + this.Top
  }
  this.o = {
    x: o.pos.x,
    y: o.pos.y,
  }

  this.A = Math.atan2(this.elRect.height / 2, this.elRect.width / 2)

  this.pointsValue = function () {
    // points for the box
    return (
      this.Left +
      ',' +
      this.Top +
      ' ' +
      this.Right +
      ',' +
      this.Top +
      ' ' +
      this.Right +
      ',' +
      this.Bottom +
      ' ' +
      this.Left +
      ',' +
      this.Bottom +
      ' ' +
      this.Left +
      ',' +
      this.Top
    )
  }

  let box = {
    properties: {
      points: this.pointsValue(),
      fill: 'none',
      stroke: 'dodgerblue',
      'stroke-dasharray': '5,5',
    },
    parent: this.g,
    tagName: 'polyline',
  }
  this.box = drawElement(box)

  let leftTop = {
    properties: {
      cx: this.LT.x,
      cy: this.LT.y,
      r: 6,
      fill: 'blue',
    },
    parent: this.g,
    tagName: 'circle',
  }

  this.lt = drawElement(leftTop)

  this.update = function () {
    let transf =
      'translate(' +
      this.o.x +
      ', ' +
      this.o.y +
      ')' +
      ' rotate(' +
      this.a * deg +
      ')'
    this.el.setAttributeNS(null, 'transform', transf)
    this.box.setAttributeNS(null, 'transform', transf)
    this.lt.setAttributeNS(null, 'transform', transf)
  }
}

for (let i = 0; i < objectsArr.length; i++) {
  let el = new Element(objectsArr[i], i + 1)
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
      delta.x = elementsArr[index].o.x - impact.x
      delta.y = elementsArr[index].o.y - impact.y
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
    m = oMousePos(svg, evt)

    if (dragging) {
      let index = dragging - 1
      elementsArr[index].o.x = m.x + delta.x
      elementsArr[index].o.y = m.y + delta.y
      elementsArr[index].update()
    }

    if (rotating) {
      let index = rotating - 1
      elementsArr[index].a =
        Math.atan2(elementsArr[index].o.y - m.y, elementsArr[index].o.x - m.x) -
        elementsArr[index].A
      elementsArr[index].update()
    }
  },
  false
)

function oMousePos(svg, evt) {
  let ClientRect = svg.getBoundingClientRect()
  return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top),
  }
}

function drawElement(o) {
  /*
    let o = {
      properties : {
      x1:100, y1:220, x2:220, y2:70},
      parent:document.queelementsArrSelector("svg"),
      tagName:'line'
    }
    */
  let el = document.createElementNS(SVG_NS, o.tagName)
  for (let name in o.properties) {
    // console.log(name);
    if (o.properties.hasOwnProperty(name)) {
      el.setAttributeNS(null, name, o.properties[name])
    }
  }
  o.parent.appendChild(el)
  return el
}
