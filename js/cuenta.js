const CLAVE_SESION = "nuvic-sesion";
const esCorreoUCA = correo => /^[^\s@]+@uca\.edu\.sv$/i.test(correo.trim());

function iniciarSesion() {
  try { localStorage.setItem(CLAVE_SESION, "1"); } catch (e) { /* sin almacenamiento */ }
  location.href = "perfil.html";
}

function marcarError(input, hayError) {
  input.setAttribute("aria-invalid", hayError ? "true" : "false");
}

const formLogin = document.getElementById("form-login");
if (formLogin) {
  const alerta = document.getElementById("error-login");
  formLogin.addEventListener("submit", e => {
    e.preventDefault();
    const correo = formLogin.correo;
    const clave = formLogin.clave;
    const valido = esCorreoUCA(correo.value) && clave.value.length >= 8;
    marcarError(correo, !valido);
    marcarError(clave, !valido);
    alerta.classList.toggle("oculto", valido);
    if (valido) iniciarSesion();
  });
}

const botonMicrosoft = document.getElementById("btn-microsoft");
if (botonMicrosoft) botonMicrosoft.addEventListener("click", iniciarSesion);

const formCrear = document.getElementById("form-crear");
if (formCrear) {
  const alerta = document.getElementById("error-crear");
  formCrear.addEventListener("submit", e => {
    e.preventDefault();
    const revisiones = [
      [formCrear.nombre, formCrear.nombre.value.trim().length > 2],
      [formCrear.carne, /^\d{8}$/.test(formCrear.carne.value.trim())],
      [formCrear.correo, esCorreoUCA(formCrear.correo.value)],
      [formCrear.clave, formCrear.clave.value.length >= 8]
    ];
    revisiones.forEach(([input, ok]) => marcarError(input, !ok));
    const todoBien = revisiones.every(([, ok]) => ok) && formCrear.terminos.checked;
    alerta.classList.toggle("oculto", todoBien);
    if (todoBien) iniciarSesion();
  });
}

const formOlvide = document.getElementById("form-olvide");
if (formOlvide) {
  const alerta = document.getElementById("error-olvide");
  formOlvide.addEventListener("submit", e => {
    e.preventDefault();
    const valido = esCorreoUCA(formOlvide.correo.value);
    marcarError(formOlvide.correo, !valido);
    alerta.classList.toggle("oculto", valido);
    if (valido) {
      try { sessionStorage.setItem("nuvic-correo", formOlvide.correo.value.trim()); } catch (err) { /* nada */ }
      location.href = "correo-enviado.html";
    }
  });
}

const correoEnviado = document.getElementById("correo-destino");
if (correoEnviado) {
  try { correoEnviado.textContent = sessionStorage.getItem("nuvic-correo") || correoEnviado.textContent; } catch (e) { /* nada */ }
}
const cuenta = document.getElementById("cuenta-regresiva");
if (cuenta) {
  let segundos = 45;
  const reloj = setInterval(() => {
    segundos--;
    cuenta.textContent = segundos > 0
      ? `Puedes reenviarlo en 0:${String(segundos).padStart(2, "0")}`
      : "Ya puedes reenviar el enlace";
    if (segundos <= 0) clearInterval(reloj);
  }, 1000);
}

const formNueva = document.getElementById("form-nueva");
if (formNueva) {
  const reglas = {
    largo: v => v.length >= 8,
    mayuscula: v => /[A-ZÁÉÍÓÚÑ]/.test(v),
    numero: v => /\d/.test(v)
  };
  const alerta = document.getElementById("error-nueva");

  formNueva.clave.addEventListener("input", () => {
    const v = formNueva.clave.value;
    Object.entries(reglas).forEach(([nombre, cumple]) => {
      document.querySelector(`[data-regla="${nombre}"]`).classList.toggle("cumple", cumple(v));
    });
  });

  formNueva.addEventListener("submit", e => {
    e.preventDefault();
    const v = formNueva.clave.value;
    const fuerte = Object.values(reglas).every(cumple => cumple(v));
    const iguales = v === formNueva.confirmar.value;
    marcarError(formNueva.clave, !fuerte);
    marcarError(formNueva.confirmar, !iguales);
    alerta.textContent = !fuerte ? "La contraseña no cumple los requisitos." : "Las contraseñas no coinciden.";
    alerta.classList.toggle("oculto", fuerte && iguales);
    if (fuerte && iguales) location.href = "contrasena-actualizada.html";
  });
}

const cerrar = document.getElementById("cerrar-sesion");
if (cerrar) {
  cerrar.addEventListener("click", () => {
    try { localStorage.removeItem(CLAVE_SESION); } catch (e) { /* nada */ }
  });
}
