const form = document.getElementById("form-buscar");
const input = document.getElementById("q");
const limpiar = document.getElementById("limpiar");
const bajada = document.getElementById("bajada");
const vistas = {
  vacia: document.getElementById("vista-vacia"),
  resultados: document.getElementById("vista-resultados"),
  nada: document.getElementById("vista-nada")
};

const normalizar = t => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

function buscar(texto) {
  const q = normalizar(texto);
  if (!q) return [];
  const palabras = q.split(/\s+/);
  return PRODUCTOS.filter(p => {
    const donde = normalizar(`${p.nombre} ${CLAVES_BUSQUEDA[p.id] || ""}`);
    return palabras.every(palabra => donde.includes(palabra));
  });
}

function mostrar(vista) {
  Object.entries(vistas).forEach(([nombre, el]) => el.classList.toggle("oculto", nombre !== vista));
}

function pintar() {
  const texto = new URLSearchParams(location.search).get("q") || "";
  input.value = texto;
  limpiar.classList.toggle("oculto", !texto);

  if (!texto.trim()) {
    bajada.textContent = "¿Qué necesitas hoy?";
    mostrar("vacia");
    input.focus();
    return;
  }

  const encontrados = buscar(texto);
  if (!encontrados.length) {
    bajada.textContent = "";
    mostrar("nada");
    return;
  }

  const n = encontrados.length;
  bajada.textContent = `${n} ${n === 1 ? "resultado" : "resultados"} para “${texto}”`;
  document.getElementById("grilla").innerHTML = encontrados.map(tarjetaProducto).join("");
  mostrar("resultados");
}

function irA(texto) {
  const url = texto.trim() ? `buscar.html?q=${encodeURIComponent(texto.trim())}` : "buscar.html";
  history.pushState(null, "", url);
  pintar();
}

form.addEventListener("submit", e => { e.preventDefault(); irA(input.value); });
limpiar.addEventListener("click", () => irA(""));
document.getElementById("limpiar-busqueda").addEventListener("click", () => irA(""));
input.addEventListener("input", () => limpiar.classList.toggle("oculto", !input.value));
window.addEventListener("popstate", pintar);

const filtros = document.querySelectorAll("#filtros .chip");
filtros.forEach(boton => {
  boton.addEventListener("click", () => {
    filtros.forEach(b => {
      b.classList.toggle("activo", b === boton);
      b.setAttribute("aria-pressed", String(b === boton));
    });
    document.querySelectorAll("#grilla .producto").forEach(t => {
      t.classList.toggle("oculto", boton.dataset.filtro !== "todos" && t.dataset.filtro !== boton.dataset.filtro);
    });
  });
});

pintar();
