const RUTA = "img/comercios/";

const COMERCIOS = {
  "farmacia-real": {
    nombre: "Farmacia Real",
    migaMapa: "mapa.html?cat=farmacias",
    subtitulo: "Farmacia · precios de referencia",
    portada: "portada-farmacia-real.jpg",
    aviso: "Precios de referencia · pueden variar en la farmacia",
    maps: "Farmacia Real",
    secciones: [
      { titulo: "Salud sexual", productos: [
        ["Taprost Duo", "Donovan Werke · 45 u", "$62.09", "taprost-duo"],
        ["Toallas Saba", "Buenas Noches · 8 u", "$2.95", "toallas-saba"],
        ["Pastilla anticonceptiva", "Postpil · 1 u", "$7.95", "pastilla-anticonceptiva"]
      ]},
      { titulo: "Alergias y gripe", productos: [
        ["Antigripal Rinokem Plus", "10 cápsulas", "$2.70", "antigripal-rinokem"],
        ["Loratadina MK 10 mg", "Alergias · 8 tabletas", "$8.48", "loratadina"],
        ["Difenhidramina 25 mg", "Somnium Fardel · 48 u", "$14.40", "difenhidramina"]
      ]},
      { titulo: "Piel", productos: [
        ["Neobol crema", "Neomicina · 30 g", "$6.90", "neobol-crema"]
      ]},
      { titulo: "Digestivo", productos: [
        ["Alka-Seltzer", "12 efervescentes", "$3.68", "alka-seltzer"],
        ["Alka Gastric", "Tableta por unidad", "$0.34", "alka-gastric"],
        ["Alka-Seltzer Extreme", "Boost · 50 u", "$17.50", "alka-seltzer-extreme"],
        ["Fulldigest", "30 cápsulas", "$15.00", "fulldigest"]
      ]}
    ]
  },

  "floreria-isabella": {
    nombre: "Florería Isabella",
    migaMapa: "mapa.html?cat=florerias",
    subtitulo: "Florería · 0.6 km de ti",
    portada: "portada-floreria-isabella.jpg",
    portadaBaja: true,
    direccion: "Av. Río Lempa",
    horario: "Lun–Sáb 9:00 am – 6:00 pm",
    estilo: "rojo",
    aviso: "Precios de referencia · pueden variar según disponibilidad",
    maps: "Florería Isabella",
    secciones: [
      { titulo: "Bouquets de florecitas", productos: [
        ["Kitties", "", "$28", "kitties"],
        ["Claveles Petit", "", "$22", "claveles-petit"],
        ["Claveles y margaritas", "", "$28", "claveles-margaritas"]
      ]},
      { titulo: "Ramitos", productos: [
        ["Ramo Candy", "", "$25", "ramo-candy"],
        ["Jardín de flores (en jarrón)", "", "$30", "jardin-de-flores"],
        ["24 rosas de Guatemala", "", "$32", "24-rosas"],
        ["Bouquet Pastel", "", "$38", "bouquet-pastel", "Sujeto a disponibilidad"],
        ["Gerberas", "", "$45", "gerberas", "Sujeto a disponibilidad"],
        ["Poppies", "", "$45", "poppies", "Pedir con 1 semana de anticipación"],
        ["25 rosas ecuatorianas y complementos", "", "$70", "25-rosas"]
      ]}
    ]
  },

  "libreria-la-iberica": {
    nombre: "Librería La Ibérica",
    migaMapa: "mapa.html?cat=librerias",
    subtitulo: "Librería y papelería · laiberica.com.sv",
    portada: "portada-libreria-la-iberica.jpg",
    estilo: "alto",
    aviso: "Precios de referencia · tomados de su sitio web",
    maps: "Librería La Ibérica",
    secciones: [
      { titulo: "Bolígrafos", productos: [
        ["Bolígrafo Artline", "5670 rojo", "$0.60", "boligrafo-5670"],
        ["Bolígrafo Artline", "EK-8210 negro", "$0.17", "boligrafo-ek8210"],
        ["Bolígrafo Artline", "SG-1 0.7 azul", "$0.45", "boligrafo-sg1-azul"],
        ["Bolígrafo Artline", "SG-1 0.7 negro", "$0.45", "boligrafo-sg1-negro"]
      ]},
      { titulo: "Cuadernos", productos: [
        ["Cuaderno 206 rayado", "100 pág. El Quijote", "$1.10", "cuaderno-206"],
        ["Cuaderno espiral #3", "El Quijote rayado", "$1.25", "cuaderno-espiral"],
        ["Cuaderno italiano", "NoteBook", "$5.75", "cuaderno-italiano"],
        ["Cuaderno Milan A4", "rayado 80 hojas", "$6.50", "cuaderno-milan-rayado"],
        ["Cuaderno Milan A4", "cuadriculado 120 h.", "$7.90", "cuaderno-milan-cuadriculado"]
      ]},
      { titulo: "Borradores", productos: [
        ["Borrador Ecoschool", "5 x 2 x 1 cm", "$0.15", "borrador-ecoschool"],
        ["Borrador Artline", "EER-8 pequeño", "$0.20", "borrador-artline"],
        ["Borrador Keyroad", "1244 Hybrid", "$0.45", "borrador-keyroad"],
        ["Borrador Bazic Neon", "para lápiz x20", "$1.25", "borrador-bazic"]
      ]},
      { titulo: "Blocks", productos: [
        ["Block carta rayado", "El Quijote", "$1.15", "block-carta-rayado"],
        ["Block amarillo carta", "Pointer 50 hojas", "$1.35", "block-amarillo"],
        ["Block Ledger 1/8", "50 hojas El Quijote", "$5.38", "block-ledger"],
        ["Block carta papel", "vegetal 25 hojas", "$6.25", "block-vegetal"]
      ]},
      { titulo: "Oficina", productos: [
        ["Talonario de llamadas", "telefónicas El Quijote", "$0.36", "talonario"],
        ["Archivador de", "comprobantes 706", "$0.90", "archivador"],
        ["Perforador LAIB", "2 hoyos · 20 hojas", "$3.95", "perforador"]
      ]}
    ]
  },

  "kairos": {
    nombre: "Kairos Beauty House",
    migaMapa: "mapa.html?cat=salones",
    subtitulo: "Salón de belleza · uñas y pedicura",
    portada: "portada-kairos.jpg",
    portadaBaja: true,
    direccion: "A 200M de la entrada peatonal UCA",
    horario: "Lun–Sáb 9:00 am – 7:00 pm",
    estilo: "icono",
    aviso: "Precios de referencia · pueden variar en el salón",
    maps: "Kairos Beauty House",
    secciones: [
      { titulo: "Servicios de uñas", productos: [
        ["Manicura express", "+ esmaltado permanente", "$15", "manicura-express"],
        ["Manicura rusa", "+ esmaltado permanente", "$18", "manicura-rusa"],
        ["Soft gel + manicura rusa", "+ esmaltado permanente", "desde $25", "soft-gel"],
        ["Uñas acrílicas", "", "desde $22", "unas-acrilicas"],
        ["Biogel", "", "desde $19", "biogel"],
        ["Poligel", "", "desde $25", "poligel"]
      ]},
      { titulo: "Pedicura", productos: [
        ["Pedicura express", "+ esmaltado permanente", "$15", "pedicura-express"],
        ["Pedicura rusa", "+ esmaltado permanente", "$18", "pedicura-rusa"],
        ["Pedicura spa", "+ esmaltado permanente", "$29", "pedicura-spa"]
      ]},
      { titulo: "Efectos y decoración", productos: [
        ["French", "", "$3", "french"],
        ["Efectos cromado", "/ ojo de gato", "$5", "cromado"],
        ["Decoración por uña", "líneas, relieves, flores", "desde $1", "decoracion"]
      ]},
      { titulo: "Retiros", productos: [
        ["Retiro de esmalte", "permanente", "$3", "retiro-permanente"],
        ["Retiro de acrílico,", "soft gel y otros", "$6", "retiro-acrilico"]
      ]}
    ]
  },

  "salon-lannys": {
    nombre: "Lanny’s Studio",
    migaMapa: "mapa.html?cat=salones",
    subtitulo: "Salón de belleza · cejas, luna y maquillaje",
    portada: "portada-lannys-studio.jpg",
    estilo: "alto",
    aviso: "Precios de referencia · pueden variar en el salón",
    maps: "Lanny´s Studio",
    secciones: [
      { titulo: "Depilación", productos: [
        ["Depilación de cejas", "", "$4.00", "depilacion-cejas"],
        ["Depilación de bozo", "", "$4.00", "depilacion-bozo"],
        ["Depilación de axilas", "", "$6.00", "depilacion-axilas"],
        ["Depilación de patillas", "", "$4.00", "depilacion-patillas"]
      ]},
      { titulo: "Laminado", productos: [
        ["Laminado de cejas", "", "$15.00", "laminado-cejas", "Incluye depilación"]
      ]},
      { titulo: "Baño de luna", productos: [
        ["Baño de luna brazos", "", "$5.00", "bano-luna-brazos"],
        ["Baño de luna pies", "", "$5.00", "bano-luna-pies"]
      ]},
      { titulo: "Maquillaje", productos: [
        ["Maquillaje social", "", "$25.00", "maquillaje-social", "Incluye pestañas"]
      ]}
    ]
  }
};

(function pintarComercio() {
  const main = document.getElementById("pagina-comercio");
  if (!main) return;
  const c = COMERCIOS[main.dataset.comercio];
  document.title = `${c.nombre} · Nuvic`;

  const datos = c.direccion ? `
    <div class="tarjeta datos-comercio mt-12">
      <div><img src="img/ico-ubicacion.svg" alt="">${c.direccion}</div>
      <div><img src="img/ico-horario.svg" alt="">${c.horario}</div>
    </div>` : "";

  const secciones = c.secciones.map(s => `
    <h3 class="categoria-precios">${s.titulo}</h3>
    <div class="lista">
      ${s.productos.map(([nombre, detalle, precio, imagen, nota]) => `
        <div class="tarjeta fila fila--catalogo ${c.estilo || ""}">
          <img class="fila__foto" src="${RUTA}${imagen}.png" alt="">
          <div class="fila__texto">
            <p class="fila__nombre">${nombre}</p>
            ${detalle ? `<p class="fila__detalle">${detalle}</p>` : ""}
            ${nota ? `<span class="nota">${nota}</span>` : ""}
          </div>
          <span class="fila__precio">${precio.startsWith("desde ") ? `<small>desde</small>${precio.slice(6)}` : precio}</span>
        </div>`).join("")}
    </div>`).join("");

  main.innerHTML = `
    <nav class="migas" aria-label="Ruta">
      <a href="index.html">Inicio</a> › <a href="${c.migaMapa}">Mapa</a> › ${c.nombre}
    </nav>
    <img class="portada ${c.portadaBaja ? "" : "portada--alta"} mt-12" src="${RUTA}${c.portada}" alt="Fachada de ${c.nombre}">
    <h1 class="nombre-comercio mt-12">${c.nombre}</h1>
    <p class="bajada" style="font-size: 12.5px;">${c.subtitulo}</p>
    ${datos}
    <h2 class="titulo-precios mt-20">Precios en este comercio</h2>
    ${secciones}
    <p class="aviso-precios">${c.aviso}</p>
    <a class="boton boton--rojo" href="${enlaceMaps(c.maps)}" target="_blank" rel="noopener">Cómo llegar en Google Maps</a>`;
})();
