const $ = id => document.getElementById(id);
const parametro = nombre => new URLSearchParams(location.search).get(nombre);
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function fechaRenovacion() {
  const f = new Date();
  f.setMonth(f.getMonth() + 1);
  return `${f.getDate()} ${MESES[f.getMonth()]} ${f.getFullYear()}`;
}

if ($("visor")) {
  const puntosCompra = esMiembro() ? 24 : 12; // Nuvic Plus suma el doble
  $("pildora-puntos").textContent = `+${puntosCompra} puntos`;

  function validarCompra() {
    cambiarPuntos(puntosCompra, "Farmacia Real", "Compra · Ahora");
    try { sessionStorage.setItem("nuvic-ganados", String(puntosCompra)); } catch (e) { /* nada */ }
    location.href = "puntos-validados.html";
  }

  $("visor").addEventListener("click", validarCompra);
  $("visor").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); validarCompra(); } });

  $("btn-manual").addEventListener("click", () => {
    $("form-codigo").classList.remove("oculto");
    $("btn-manual").classList.add("oculto");
    $("codigo").focus();
  });
  $("form-codigo").addEventListener("submit", e => {
    e.preventDefault();
    const valido = $("codigo").value.trim().length >= 6;
    $("codigo").setAttribute("aria-invalid", valido ? "false" : "true");
    $("error-codigo").classList.toggle("oculto", valido);
    if (valido) validarCompra();
  });
}

if ($("ganados")) {
  let ganados = "12";
  try { ganados = sessionStorage.getItem("nuvic-ganados") || ganados; } catch (e) { /* nada */ }
  $("ganados").textContent = `+${ganados}`;
  $("acumulados").textContent = `${leerPuntos()} pts`;
}

if ($("saldo")) {
  const META = 500;
  const puntos = leerPuntos();
  $("saldo").textContent = puntos;
  $("barra-puntos").style.width = `${Math.min(100, (puntos / META) * 100)}%`;
  $("barra-puntos").parentElement.setAttribute("aria-valuenow", puntos);
  $("falta").textContent = puntos >= META
    ? "¡Ya llegaste a Nivel Ahorrador!"
    : `Te faltan ${META - puntos} para Nivel Ahorrador`;

  const nuevos = leerMovimientos().map(m => `
    <div class="tarjeta movimiento">
      <div><h3></h3><p></p></div>
      <strong class="${m.cantidad < 0 ? "resta" : ""}">${m.cantidad > 0 ? "+" : "−"}${Math.abs(m.cantidad)} pts</strong>
    </div>`);
  if (nuevos.length) {
    const tmp = document.createElement("div");
    tmp.innerHTML = nuevos.join("");
    leerMovimientos().forEach((m, i) => {
      tmp.children[i].querySelector("h3").textContent = m.titulo;
      tmp.children[i].querySelector("p").textContent = m.detalle;
    });
    $("historial").prepend(...tmp.children);
  }
}

if ($("pagina-membresia") && esMiembro()) location.replace("mi-membresia.html");

if ($("form-pago")) {
  const f = $("form-pago");

  f.tarjeta.addEventListener("input", () => {
    f.tarjeta.value = f.tarjeta.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  });
  f.vence.addEventListener("input", () => {
    const d = f.vence.value.replace(/\D/g, "").slice(0, 4);
    f.vence.value = d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
  });
  f.cvv.addEventListener("input", () => { f.cvv.value = f.cvv.value.replace(/\D/g, "").slice(0, 4); });

  f.addEventListener("submit", e => {
    e.preventDefault();
    const [mm, aa] = f.vence.value.split(" / ").map(Number);
    const hoy = new Date();
    const fechaOk = mm >= 1 && mm <= 12 && aa >= 0 &&
      (2000 + aa > hoy.getFullYear() || (2000 + aa === hoy.getFullYear() && mm >= hoy.getMonth() + 1));
    const revisiones = [
      [f.tarjeta, f.tarjeta.value.replace(/\s/g, "").length === 16],
      [f.vence, fechaOk],
      [f.cvv, f.cvv.value.length >= 3]
    ];
    revisiones.forEach(([input, ok]) => input.setAttribute("aria-invalid", ok ? "false" : "true"));
    const todoBien = revisiones.every(([, ok]) => ok) && f.terminos.checked;
    $("error-pago").classList.toggle("oculto", todoBien);
    if (todoBien) {
      cambiarMembresia(true);
      location.href = "membresia-activada.html";
    }
  });
}

if ($("hasta")) $("hasta").textContent = fechaRenovacion();

if ($("cancelar-membresia")) {
  const boton = $("cancelar-membresia");
  boton.addEventListener("click", () => {
    if (boton.dataset.confirmar) {
      cambiarMembresia(false);
      location.href = "membresia.html";
    } else {
      boton.dataset.confirmar = "1";
      boton.textContent = "Toca otra vez para cancelar";
    }
  });
}

if ($("lista-ofertas")) {
  const miembro = esMiembro();
  $("banner-miembro").classList.toggle("oculto", !miembro);
  $("banner-bloqueo").classList.toggle("oculto", miembro);
  if (miembro) $("hasta-ofertas").textContent = `Activo hasta el ${fechaRenovacion()}`;

  const CANDADO = `<svg class="candado" width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden="true">
    <path d="M5 11V7a5 5 0 0 1 10 0v4" stroke="#002941" stroke-width="2.6"/><rect x="1" y="10" width="18" height="14" rx="3" fill="#002941"/></svg>`;

  $("lista-ofertas").innerHTML = OFERTAS.map(o => {
    const bloqueada = !miembro && !o.libre;
    const destino = bloqueada ? "membresia.html" : `detalle-oferta.html?id=${o.id}`;
    return `
      <a class="tarjeta oferta${bloqueada ? " oferta--bloqueada" : ""}" href="${destino}" data-cat="${o.cat}"
         ${bloqueada ? 'aria-label="' + o.titulo + ', solo para miembros"' : ""}>
        <img class="oferta__foto" src="img/comercios/${o.imagen}.png" alt="">
        <div>
          <h3>${o.titulo}</h3>
          <p>${o.lugar || o.comercio} · ${o.vigencia}</p>
          ${o.libre ? '<span class="etiqueta-nueva">Nueva</span>' : '<span class="etiqueta-azul">Solo miembros</span>'}
        </div>
        ${bloqueada ? CANDADO : '<span class="flecha" aria-hidden="true">›</span>'}
      </a>`;
  }).join("");

  const filtros = [["todas", "Todas"], ["farmacias", "Farmacias"], ["librerias", "Librerías"], ["copias", "Copias"],
                   ["florerias", "Florerías"], ["barberias", "Barberías"], ["salones", "Salones"], ["lavanderias", "Lavanderías"]];
  const extra = filtros.length - 4;
  $("filtros-ofertas").innerHTML =
    filtros.map(([v, t], i) => `<button class="chip${i === 0 ? " activo" : ""}${i > 3 ? " oculto" : ""}" type="button" data-filtro="${v}" aria-pressed="${i === 0}">${t}</button>`).join("") +
    `<button class="chip chip--mas" type="button" aria-expanded="false">+${extra}</button>`;

  $("filtros-ofertas").addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.classList.contains("chip--mas")) {
      const abrir = b.getAttribute("aria-expanded") === "false";
      b.setAttribute("aria-expanded", String(abrir));
      b.textContent = abrir ? "Menos" : `+${extra}`;
      [...$("filtros-ofertas").children].slice(4, -1).forEach(c => c.classList.toggle("oculto", !abrir));
      return;
    }
    $("filtros-ofertas").querySelectorAll("[data-filtro]").forEach(c => {
      c.classList.toggle("activo", c === b);
      c.setAttribute("aria-pressed", String(c === b));
    });
    document.querySelectorAll("#lista-ofertas .oferta").forEach(o => {
      o.classList.toggle("oculto", b.dataset.filtro !== "todas" && o.dataset.cat !== b.dataset.filtro);
    });
  });
}

if ($("detalle-oferta")) {
  const o = OFERTAS.find(x => x.id === parametro("id")) || OFERTAS[0];
  const bloqueada = !esMiembro() && !o.libre;
  document.title = `${o.titulo} · Nuvic`;
  $("miga-oferta").textContent = o.titulo;
  $("titulo-oferta").textContent = o.titulo;
  $("comercio-oferta").textContent = o.comercio;
  const img = $("imagen-oferta");
  img.src = `img/comercios/${o.grande || o.imagen}.png`;
  if (!o.grande) { img.style.objectFit = "cover"; $("sello-miembros").classList.remove("oculto"); }

  const filas = [["Válida", o.hasta || o.vigencia], ["Uso", o.uso], ["Aplica en", o.aplica]].filter(([, v]) => v);
  $("datos-oferta").innerHTML = filas.map(() => `<div><span></span><strong></strong></div>`).join("");
  [...$("datos-oferta").children].forEach((fila, i) => {
    fila.children[0].textContent = filas[i][0] === "Válida" && o.hasta ? "Válida hasta" : filas[i][0];
    fila.children[1].textContent = filas[i][1];
  });

  $("activar").href = bloqueada ? "membresia.html" : `oferta-activa.html?id=${o.id}`;
  $("activar").textContent = bloqueada ? "Hazte miembro para activarla" : "Activar oferta";
  $("ver-mapa").href = o.mapa;
}

if ($("oferta-activa")) {
  const o = OFERTAS.find(x => x.id === parametro("id")) || OFERTAS[0];
  $("resumen-oferta").textContent = `${o.titulo} · ${o.comercio}`;
}

if ($("pagina-canje")) {
  const clave = RECOMPENSAS[parametro("r")] ? parametro("r") : "copias";
  const r = RECOMPENSAS[clave];
  const puntos = leerPuntos();
  const alcanza = puntos >= r.costo;
  document.title = `${r.nombre} · Nuvic`;

  $("miga-canje").textContent = r.nombre;
  $("titulo-canje").textContent = alcanza ? "Confirmar canje" : r.nombre;
  $("img-canje").src = r.imagen;
  $("nombre-canje").textContent = r.detalle || r.nombre;
  $("comercio-canje").textContent = r.comercio;
  $("costo-canje").textContent = `${r.costo} pts`;

  $("vista-confirmar").classList.toggle("oculto", !alcanza);
  $("vista-faltan").classList.toggle("oculto", alcanza);

  if (alcanza) {
    $("tus-puntos").textContent = `${puntos} pts`;
    $("costo").textContent = `−${r.costo} pts`;
    $("quedan").textContent = `${puntos - r.costo} pts`;
    $("confirmar-canje").addEventListener("click", () => {
      cambiarPuntos(-r.costo, r.nombre, "Canje · Hoy");
      try { sessionStorage.setItem("nuvic-canje", clave); } catch (e) { /* nada */ }
      location.href = "recompensa-canjeada.html";
    });
  } else {
    $("progreso-texto").textContent = `${puntos} / ${r.costo}`;
    $("barra-canje").style.width = `${(puntos / r.costo) * 100}%`;
    $("faltan-texto").textContent = `Te faltan ${r.costo - puntos} puntos.`;
  }
}

if ($("canjeada")) {
  let clave = "copias";
  try { clave = sessionStorage.getItem("nuvic-canje") || clave; } catch (e) { /* nada */ }
  const r = RECOMPENSAS[clave];
  $("mensaje-canje").textContent = r.mensaje;
  $("usados").textContent = `−${r.costo} pts`;
  $("restantes").textContent = `${leerPuntos()} pts`;
}

if ($("lista-libreria")) {
  const precios = { resma: 4.60, cuaderno: 1.85 };
  const pintarTotal = () => {
    const total = Object.values(precios).reduce((a, b) => a + b, 0);
    $("total-libreria").textContent = `$${total.toFixed(2)}`;
    $("nota-total").textContent = precios.lapicero ? "con el lapicero" : "sin el lapicero";
  };

  $("cambiar-aqui").addEventListener("click", () => {
    precios.lapicero = 3.25;
    $("fila-lapicero").classList.add("oculto");
    $("alternativa").classList.add("oculto");
    $("aviso-lista").classList.add("oculto");
    $("lapicero-nuevo").classList.remove("oculto");
    $("quitar-lapicero").classList.add("oculto");
    $("subtitulo-lista").textContent = "3 productos · 2 comercios";
    pintarTotal();
  });
  $("quitar-lapicero").addEventListener("click", () => {
    ["fila-lapicero", "alternativa", "aviso-lista", "quitar-lapicero"].forEach(id => $(id).classList.add("oculto"));
    $("subtitulo-lista").textContent = "2 productos · Librería La Ibérica";
    pintarTotal();
  });
  pintarTotal();
}

if ($("reintentar")) {
  $("reintentar").addEventListener("click", () => {
    if (navigator.onLine) history.length > 1 ? history.back() : (location.href = "productos.html");
    else $("sigue-sin").classList.remove("oculto");
  });
}
