const PRODUCTOS = [
  { id: "paracetamol", nombre: "Paracetamol 500 mg", comercios: 3, desde: "$10",    imagen: "img/prod-paracetamol.svg", menorPrecio: true,  filtro: "medicinas", enlace: "comparar.html" },
  { id: "copias",      nombre: "Copias B/N x20",     comercios: 2, desde: "$1.00",  imagen: "img/prod-copias.svg",      menorPrecio: false, filtro: "copias",    enlace: "mapa.html?cat=copias" },
  { id: "rosas",       nombre: "Ramo de rosas",      comercios: 2, desde: "$6.00",  imagen: "img/prod-rosas.svg",       menorPrecio: true,  filtro: "flores",    enlace: "floreria-isabella.html" },
  { id: "corte",       nombre: "Corte de cabello",   comercios: 3, desde: "$3.50",  imagen: "img/prod-corte.svg",       menorPrecio: false, filtro: "",          enlace: "mapa.html?cat=barberias" },
  { id: "cuaderno",    nombre: "Cuaderno 80 hojas",  comercios: 2, desde: "$6.50",  imagen: "img/prod-cuaderno.svg",    menorPrecio: false, filtro: "",          enlace: "libreria-la-iberica.html" },
  { id: "lavado",      nombre: "Lavado y secado",    comercios: 2, desde: "$2.50",  imagen: "img/prod-lavado.svg",      menorPrecio: false, filtro: "",          enlace: "mapa.html?cat=lavanderias" },
  { id: "vitamina",    nombre: "Vitamina C 2000 mg", comercios: 2, desde: "$17.32", imagen: "img/prod-vitamina.svg",    menorPrecio: false, filtro: "medicinas", enlace: "farmacia-real.html" },
  { id: "resma",       nombre: "Resma 500 hojas",    comercios: 2, desde: "$4.50",  imagen: "img/prod-resma.svg",       menorPrecio: false, filtro: "copias",    enlace: "agotado.html" }
];

const CLAVES_BUSQUEDA = {
  paracetamol: "medicina pastilla dolor",
  copias: "copias impresiones fotocopias",
  rosas: "flores ramo rosas",
  corte: "barberia pelo cabello",
  cuaderno: "cuaderno libreta",
  lavado: "lavanderia ropa",
  vitamina: "medicina vitaminas",
  resma: "copias papel hojas"
};

const ORDEN_CATEGORIAS = ["farmacias", "librerias", "copias", "florerias", "salones", "barberias", "lavanderias", "gasolineras"];

const CATEGORIAS = {
  barberias: {
    nombre: "Barberías", chips: ["farmacias", "librerias"], mapa: "img/mapa-barberias.png",
    comercio: { nombre: "Barbería Gentlemen´s", distancia: "0.3 km · 4 min a pie", precio: "$3.00", foto: "img/comercio-barberia-gentlemens.png", enlace: "comercio.html" }
  },
  lavanderias: {
    nombre: "Lavanderías", chips: ["farmacias", "librerias"], mapa: "img/mapa-lavanderias.png",
    comercio: { nombre: "Lavandería Mediterraneo", distancia: "0.7 km · 8 min a pie", precio: "$2.25", foto: "img/comercio-lavanderia-mediterraneo.png", enlace: "comercio.html" }
  },
  gasolineras: {
    nombre: "Gasolineras", chips: ["farmacias", "librerias"], mapa: "img/mapa-gasolineras.png",
    comercio: { nombre: "Gasolinera UNO", distancia: "0.6 km · 4 min a pie", precio: "$3.52", foto: "img/comercio-gasolinera-uno.png", enlace: "comercio.html" }
  },
  farmacias: {
    nombre: "Farmacias", chips: ["librerias", "copias"], mapa: "img/mapa-farmacias.png",
    comercio: { nombre: "Farmacia Real", distancia: "0.2 km · 3 min a pie", precio: "$1.25", foto: "img/comercio-farmacia-real.png", enlace: "farmacia-real.html" }
  },
  copias: {
    nombre: "Copias", chips: ["farmacias", "librerias"], mapa: "img/mapa-copias.png",
    comercio: { nombre: "Centro de copias UCA", distancia: "0.4 km · 5 min a pie", precio: "$0.04", foto: "img/comercio-centro-copias-uca.jpg", enlace: "comercio.html" },
    otros: [
      { nombre: "Don Teco", detalle: "Centro de copias y papelería", foto: "img/comercios/otro-don-teco.jpg", maps: "Don Teco centro de copias" },
      { nombre: "Plots Servi Copias", detalle: "Ploteo y escaneo de planos", foto: "img/comercios/otro-plots-servi-copias.jpg", maps: "Plots Servi Copias" },
      { nombre: "Servi Copias", detalle: "Copias, impresiones y anillados", foto: "img/comercios/otro-servi-copias.jpg", maps: "Servi Copias" }
    ]
  },
  librerias: {
    nombre: "Librerías", chips: ["farmacias", "copias"], mapa: "img/mapa-librerias.png",
    comercio: { nombre: "Librería Universitaria", distancia: "0.3 km · 2 min a pie", precio: "$0.90", foto: "img/comercio-libreria-universitaria.png", enlace: "libreria-la-iberica.html" }
  },
  florerias: {
    nombre: "Florerías", chips: ["farmacias", "librerias"], mapa: "img/mapa-florerias.png",
    comercio: { nombre: "Florería Isabella", distancia: "0.6 km · 7 min a pie", precio: "$5.50", foto: "img/comercio-floreria-isabella.png", enlace: "floreria-isabella.html" }
  },
  salones: {
    nombre: "Salones", chips: ["farmacias", "librerias"], mapa: "img/mapa-salones.png",
    comercio: { nombre: "Lanny´s Studio", distancia: "0.5 km · 6 min a pie", precio: "$7.50", foto: "img/comercio-lannys-studio.png", enlace: "salon-lannys.html" },
    otros: [
      { nombre: "Kairos Beauty House", detalle: "Uñas y pedicura · 200 m", foto: "img/comercios/portada-kairos.jpg", enlace: "kairos.html" },
      { nombre: "D’luxe Salón & Spa", detalle: "Salón y spa", foto: "img/comercios/otro-dluxe-salon-spa.jpg", maps: "D'luxe Salón & Spa" },
      { nombre: "Impacto Salón", detalle: "Salón de belleza", foto: "img/comercios/otro-impacto-salon.jpg", maps: "Impacto Salón" }
    ]
  }
};

function enlaceMaps(nombre) {
  return "https://www.google.com/maps/search/" + encodeURIComponent(nombre + " UCA San Salvador");
}

const ARTICULOS_LISTA = [
  { id: "paracetamol", nombre: "Paracetamol 500 mg", comercio: "Farmacia Real",       precio: "$10",   imagen: "img/mini-paracetamol.svg", enlace: "comparar.html" },
  { id: "cuaderno",    nombre: "Cuaderno 80 hojas",  comercio: "Librería laiberica",  precio: "$6.50", imagen: "img/prod-cuaderno.svg",    enlace: "libreria-la-iberica.html" },
  { id: "rosas",       nombre: "Ramo de rosas",      comercio: "Florería Isabella",   precio: "$22",   imagen: "img/prod-rosas.svg",       enlace: "floreria-isabella.html" },
  { id: "corte",       nombre: "Corte de cabello",   comercio: "Barbería La Sultana", precio: "$3.50", imagen: "img/prod-corte.svg",       enlace: "mapa.html?cat=barberias" }
];

const CLAVE_LISTA = "nuvic-mi-lista";

function leerLista() {
  try {
    const guardada = JSON.parse(localStorage.getItem(CLAVE_LISTA));
    if (Array.isArray(guardada)) return guardada;
  } catch (e) { /* si falla, se usa la lista del diseño */ }
  return ARTICULOS_LISTA.map(a => a.id);
}

function guardarLista(ids) {
  try { localStorage.setItem(CLAVE_LISTA, JSON.stringify(ids)); } catch (e) { /* sin almacenamiento */ }
}

function agregarALista(id) {
  const ids = leerLista();
  if (!ids.includes(id)) guardarLista([id, ...ids]);
}

const CLAVE_PUNTOS = "nuvic-puntos";
const CLAVE_MOVIMIENTOS = "nuvic-movimientos";

function leerPuntos() {
  try {
    const n = parseInt(localStorage.getItem(CLAVE_PUNTOS), 10);
    if (!isNaN(n)) return n;
  } catch (e) { /* nada */ }
  return 357;
}

function cambiarPuntos(cantidad, titulo, detalle) {
  const total = leerPuntos() + cantidad;
  try {
    localStorage.setItem(CLAVE_PUNTOS, String(total));
    const lista = JSON.parse(localStorage.getItem(CLAVE_MOVIMIENTOS) || "[]");
    lista.unshift({ titulo, detalle, cantidad });
    localStorage.setItem(CLAVE_MOVIMIENTOS, JSON.stringify(lista.slice(0, 10)));
  } catch (e) { /* nada */ }
  return total;
}

function leerMovimientos() {
  try { return JSON.parse(localStorage.getItem(CLAVE_MOVIMIENTOS) || "[]"); } catch (e) { return []; }
}

const CLAVE_PLUS = "nuvic-plus";
function esMiembro() {
  try { return localStorage.getItem(CLAVE_PLUS) === "1"; } catch (e) { return false; }
}
function cambiarMembresia(activa) {
  try { activa ? localStorage.setItem(CLAVE_PLUS, "1") : localStorage.removeItem(CLAVE_PLUS); } catch (e) { /* nada */ }
}

const OFERTAS = [
  { id: "copias",     titulo: "20% en 20 copias",          comercio: "Centro de copias UCA",   lugar: "Impresión digital UCA", vigencia: "hasta 30 nov",       cat: "copias",      libre: true,  imagen: "oferta-copias",
    grande: "oferta-copias-grande", hasta: "30 nov 2026", uso: "1 vez por semana", aplica: "Copias en blanco y negro", mapa: "mapa.html?cat=copias" },
  { id: "libreria",   titulo: "10% en libros y útiles",    comercio: "Librería La Ibérica",    vigencia: "hasta 15 dic",        cat: "librerias",   imagen: "oferta-libreria",   mapa: "mapa.html?cat=librerias" },
  { id: "farmacia",   titulo: "15% en venta libre",        comercio: "Farmacia REAL",          vigencia: "hasta 30 nov",        cat: "farmacias",   imagen: "oferta-farmacia",   mapa: "mapa.html?cat=farmacias" },
  { id: "floreria",   titulo: "15% en ramos",              comercio: "Isabella Florería",      vigencia: "todo diciembre",      cat: "florerias",   imagen: "oferta-floreria",   mapa: "mapa.html?cat=florerias" },
  { id: "barberia",   titulo: "2x1 en corte de cabello",   comercio: "Platinum Barbershop",    vigencia: "lunes a jueves",      cat: "barberias",   imagen: "oferta-barberia",   mapa: "mapa.html?cat=barberias" },
  { id: "lannys",     titulo: "15% en laminado de cejas",  comercio: "Lanny’s Studio",         vigencia: "hasta 20 dic",        cat: "salones",     imagen: "oferta-lannys",     mapa: "mapa.html?cat=salones" },
  { id: "lavanderia", titulo: "10% en lavado y secado",    comercio: "Mediterráneo",           vigencia: "fines de semana",     cat: "lavanderias", imagen: "oferta-lavanderia", mapa: "mapa.html?cat=lavanderias" }
];

const RECOMPENSAS = {
  copias: { nombre: "20 copias gratis", comercio: "Centro de impresión digital UCA", costo: 150, imagen: "img/comercios/oferta-copias.png",
            mensaje: "Disfruta tus 20 copias gratis en el Centro de impresión digital UCA." },
  lavado: { nombre: "1 lavado gratis", detalle: "Lavado y secado, 1 carga", comercio: "Lavandería Mediterráneo", costo: 500, imagen: "img/comercios/recompensa-lavado.png",
            mensaje: "Disfruta tu lavado gratis en Lavandería Mediterráneo." }
};
