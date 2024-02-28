const SVG_NS = 'http://www.w3.org/2000/svg'

export function oMousePos(svg, evt) {
  const ClientRect = svg.getBoundingClientRect()
  return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top),
  }
}

export function drawElement(element) {
  const el = document.createElementNS(SVG_NS, element.tagName)
  for (let name in element.properties) {
    if (element.properties.hasOwnProperty(name)) {
      el.setAttributeNS(null, name, element.properties[name])
    }
  }
  element.parent.appendChild(el)
  return el
}
