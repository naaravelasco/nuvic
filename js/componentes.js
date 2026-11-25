const ENLACES = [
  { texto: "Inicio",      href: "index.html",               icono: "img/ico-inicio.svg" },
  { texto: "Productos",   href: "productos.html",           icono: "img/ico-productos.svg" },
  { texto: "Mapa",        href: "mapa.html?cat=barberias",  icono: "img/ico-mapa.svg" },
  { texto: "Mi lista",    href: "mi-lista.html",            icono: "img/ico-lista.svg" },
  { texto: "Mis puntos",  href: "mis-puntos.html",          icono: "img/ico-puntos.svg" },
  { texto: "Recompensas", href: "canje.html?r=lavado",      icono: "img/ico-recompensas.svg" }
];

function haySesion() {
  try { return localStorage.getItem("nuvic-sesion") === "1"; } catch (e) { return false; }
}

function pintarEncabezado() {
  const encabezado = document.getElementById("encabezado");
  if (!encabezado) return;
  // Con la sesión iniciada se muestran los puntos en su lugar.
  const conEntrar = !encabezado.hasAttribute("data-sin-entrar") || haySesion();
  encabezado.className = "encabezado";
  encabezado.innerHTML = `
    <a class="encabezado__logo" href="index.html" aria-label="Nuvic, ir al inicio">
      <img src="img/logo.svg" alt="Nuvic">
    </a>
    <div class="encabezado__acciones">
      ${conEntrar ? (haySesion()
        ? `<a class="btn-puntos" href="mis-puntos.html" aria-label="Tienes ${leerPuntos()} puntos">★ ${leerPuntos()} pts</a>`
        : '<a class="btn-entrar" href="login.html">Entrar</a>') : ""}
      <button class="btn-menu" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu">
        <span></span><span></span><span></span>
      </button>
    </div>`;

  const items = ENLACES.map(e => {
    const contenido = `<img src="${e.icono}" alt="">${e.texto}`;
    return `<li>${e.href ? `<a href="${e.href}">${contenido}</a>` : `<span>${contenido}</span>`}</li>`;
  }).join("");

  const menu = document.createElement("div");
  menu.className = "menu";
  menu.id = "menu";
  menu.innerHTML = `
    <div class="menu__fondo" data-cerrar-menu></div>
    <nav class="menu__panel" aria-label="Menú principal">
      <ul class="menu__lista">${items}</ul>
      ${haySesion()
        ? '<a class="menu__entrar" href="perfil.html">Ver mi perfil</a>'
        : '<a class="menu__entrar" href="login.html">Entrar con cuenta UCA</a>'}
      <p class="menu__nota">Nuvic solo compara precios. No vende productos.</p>
    </nav>`;
  encabezado.after(menu);

  const boton = encabezado.querySelector(".btn-menu");
  const app = document.querySelector(".app");

  function cambiarMenu(abrir) {
    app.classList.toggle("menu-abierto", abrir);
    boton.setAttribute("aria-expanded", String(abrir));
    boton.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
  }

  boton.addEventListener("click", () => cambiarMenu(!app.classList.contains("menu-abierto")));
  menu.querySelector("[data-cerrar-menu]").addEventListener("click", () => cambiarMenu(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") cambiarMenu(false); });
}

function pintarPie() {
  const pie = document.getElementById("pie");
  if (!pie) return;

  const enlaces = ENLACES.map(e =>
    e.href ? `<a href="${e.href}">${e.texto}</a>` : `<span>${e.texto}</span>`
  ).join("");

  pie.className = "pie";
  pie.innerHTML = `
    <img class="pie__logo" src="img/logo-blanco.svg" alt="Nuvic">
    <p class="pie__lema">Compara precios en el campus.</p>
    <nav class="pie__enlaces" aria-label="Enlaces del sitio">${enlaces}</nav>
    <p class="pie__aviso">Precios de referencia · pueden variar en el comercio</p>`;
}

function tarjetaProducto(p) {
  return `
    <a class="tarjeta producto" href="${p.enlace}" data-filtro="${p.filtro}">
      <img class="producto__imagen" src="${p.imagen}" alt="">
      ${p.menorPrecio ? '<span class="etiqueta">Menor precio</span>' : ""}
      <h3 class="producto__nombre">${p.nombre}</h3>
      <p class="producto__comercios">${p.comercios} comercios</p>
      <p class="producto__precio">desde ${p.desde}</p>
      <span class="flecha" aria-hidden="true">›</span>
    </a>`;
}

document.addEventListener("DOMContentLoaded", () => {
  pintarEncabezado();
  pintarPie();
});
