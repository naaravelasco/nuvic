const parametros = new URLSearchParams(location.search);
const clave = CATEGORIAS[parametros.get("cat")] ? parametros.get("cat") : "barberias";

if (clave === "barberias" && new Date().getHours() < 8) location.replace("barberias-cerradas.html");
const categoria = CATEGORIAS[clave];
const comercio = categoria.comercio;

document.title = `${categoria.nombre} · Mapa de comercios · Nuvic`;

const chips = document.getElementById("chips");
const resto = ORDEN_CATEGORIAS.filter(c => c !== clave && !categoria.chips.includes(c));

function chip(c, activo) {
  return `<a class="chip${activo ? " activo" : ""}" href="mapa.html?cat=${c}"${activo ? ' aria-current="page"' : ""}>${CATEGORIAS[c].nombre}</a>`;
}

chips.innerHTML =
  chip(clave, true) +
  categoria.chips.map(c => chip(c, false)).join("") +
  `<button class="chip chip--mas" type="button" aria-expanded="false">+${resto.length} ▾</button>` +
  resto.map(c => chip(c, false).replace('class="chip"', 'class="chip oculto" data-extra')).join("");

const botonMas = chips.querySelector(".chip--mas");
botonMas.addEventListener("click", () => {
  const abrir = botonMas.getAttribute("aria-expanded") === "false";
  botonMas.setAttribute("aria-expanded", String(abrir));
  botonMas.textContent = abrir ? "Menos ▴" : `+${resto.length} ▾`;
  chips.querySelectorAll("[data-extra]").forEach(el => el.classList.toggle("oculto", !abrir));
});

const imagenMapa = document.getElementById("mapa-imagen");
imagenMapa.src = categoria.mapa;
imagenMapa.alt = `Mapa con ${categoria.nombre.toLowerCase()} cerca del campus`;

const foto = document.getElementById("comercio-foto");
if (comercio.icono) {
  const caja = document.createElement("span");
  caja.className = "comercio__foto comercio__foto--icono";
  caja.innerHTML = `<img src="${comercio.icono}" alt="">`;
  foto.replaceWith(caja);
} else {
  foto.src = comercio.foto;
  foto.alt = `Fachada de ${comercio.nombre}`;
}

document.getElementById("comercio").href = comercio.enlace;
document.getElementById("comercio-nombre").textContent = comercio.nombre;
document.getElementById("comercio-distancia").textContent = comercio.distancia;
document.getElementById("comercio-precio").textContent = comercio.precio;
document.getElementById("ver-precios").href = comercio.enlace;
document.getElementById("como-llegar").href = enlaceMaps(comercio.nombre);

if (categoria.otros) {
  const caja = document.createElement("section");
  caja.className = "mt-24";
  caja.innerHTML = `<h2 class="titulo-precios">Otros comercios</h2><div class="lista mt-8">${categoria.otros.map(o => `
    <a class="tarjeta fila" href="${o.enlace || enlaceMaps(o.maps)}"${o.enlace ? "" : ' target="_blank" rel="noopener"'}>
      <img class="fila__foto" src="${o.foto}" alt="">
      <div class="fila__texto">
        <h3 class="fila__nombre">${o.nombre}</h3>
        <p class="fila__detalle">${o.detalle}</p>
        ${o.enlace ? "" : '<p class="precio-comercio__llegar" style="margin-top:2px;">Ver en Google Maps ›</p>'}
      </div>
      <span class="flecha" aria-hidden="true">›</span>
    </a>`).join("")}</div>`;
  document.querySelector(".botones-dobles").after(caja);
}
