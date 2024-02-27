const SVG_NS = 'http://www.w3.org/2000/svg'

export function oMousePos(svg, evt) {
  let ClientRect = svg.getBoundingClientRect()
  return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top),
  }
}

export function drawElement(o) {
  let el = document.createElementNS(SVG_NS, o.tagName)
  for (let name in o.properties) {
    if (o.properties.hasOwnProperty(name)) {
      el.setAttributeNS(null, name, o.properties[name])
    }
  }
  o.parent.appendChild(el)
  return el
}
