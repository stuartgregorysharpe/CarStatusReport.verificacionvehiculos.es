// window.scrollTo(0, document.body.scrollHeight)

// Añadir inputs para 'recorrido'
document.getElementById('anadir-recorrido').addEventListener('click', (e) => {
  e.preventDefault()
  anadirRecorrido()
})
const anadirRecorrido = (e) => {
  const recorridosContainer = document.getElementById('recorridos')
  const recorridosCount = document.getElementById('cantidad-recorridos')
  const numRecorridos = Number(recorridosCount.value) + 1

  const html = `
    <div class="row mb-2">
      <div class="col-md-6 col-lg-3">
        <label class="form-label">Fecha</label>
        <input
          type="text"
          class="form-control"
          name="recorridos[${numRecorridos}][fecha]"
          />
      </div>
      <div class="col-md-6 col-lg-3">
        <label class="form-label">Tiempo</label>
        <input
          type="text"
          class="form-control"
          name="recorridos[${numRecorridos}][tiempo]"
          />
      </div>
      <div class="col-md-6 col-lg-3">
        <label class="form-label">Km Rec.</label>
        <input
          type="text"
          class="form-control"
          name="recorridos[${numRecorridos}][km-rec]"
          />
      </div>
      <div class="col-md-6 col-lg-3">
        <label class="form-label">Comentarios</label>
        <textarea name="recorridos[${numRecorridos}][comentario]" cols="30" rows="4" class="form-control"></textarea>
      </div>
    </div>
  `

  recorridosContainer.insertAdjacentHTML('beforeend', html)
  recorridosCount.value = numRecorridos
}

// Daños grafico
const daniosCanvas = new fabric.Canvas('danios-canvas')
daniosCanvas.setBackgroundImage('images/autos.jpg', daniosCanvas.renderAll.bind(daniosCanvas), {
  width: 1400,
  height: 980,
  scaleX: 1000 / 1400,
  scaleY: 700 / 980,
  originX: 'left',
  originY: 'top'
})

const shapeConfig = {
  left: 100,
  top: 100,
  cornerColor: 'rgb(0,0,255)',
  borderColor: 'rgb(0,0,255)',
  borderOpacityWhenMoving: 0.6,
  fill: 'rgba(255, 0, 0, 0.3)',
  stroke: 'rgb(255, 0, 0)',
  strokeWidth: 2,
  width: 40,
  height: 40,
  radius: 20
}

document.querySelectorAll('.add-shape').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault()

    const shape = e.target.getAttribute('data-shape')

    if (shape === 'square') daniosCanvas.add(new fabric.Rect(shapeConfig))
    if (shape === 'triangle') daniosCanvas.add(new fabric.Triangle(shapeConfig))
    if (shape === 'circle') daniosCanvas.add(new fabric.Circle(shapeConfig))
  })
})

// Firma
const canvas = document.getElementById('firma')
const signaturePad = new SignaturePad(canvas)

document.getElementById('borrar-firma').addEventListener('click', () => {
  signaturePad.clear()
})

function resizeCanvas () {
  const ratio = Math.max(window.devicePixelRatio || 1, 1)

  canvas.width = canvas.offsetWidth * ratio
  canvas.height = canvas.offsetHeight * ratio
  canvas.getContext('2d').scale(ratio, ratio)

  signaturePad.fromData(signaturePad.toData())
}
addEventListener('resize', resizeCanvas)
resizeCanvas()

// envío de formulario
document.getElementById('generar').addEventListener('click', (e) => {
  e.preventDefault()

  // guardar grafico de daños
  document.getElementById('danios-img').value = daniosCanvas.toDataURL({ format: 'jpeg' })

  // guardar firma
  document.getElementById('firma-input').value = signaturePad.toDataURL('image/svg+xml')

  document.getElementById('form-principal').submit()
})
