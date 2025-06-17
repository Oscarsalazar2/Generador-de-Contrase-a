const generarContraseña = (base, longitud) => {
  let contraseña = "";
  for (let x = 0; x < longitud; x++) {
    let aleatorio = Math.floor(Math.random() * base.length);
    contraseña += base.charAt(aleatorio);
  }
  return contraseña;
};

const generar = () => {
  let longitud = parseInt(inputLength.value);
  let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeros = "0123456789";
  const simbolos = ".?,;-_¡!¿*%&$/()[]{}|@><";

  if (checkbox1.checked) base += numeros;
  if (checkbox2.checked) base += simbolos;

  const contraseña = generarContraseña(base, longitud);
  generatedPassword.innerText = contraseña;

  // Copiar al portapapeles
  navigator.clipboard.writeText(contraseña).then(() => {
    const alerta = document.getElementById("copyAlert");
    alerta.classList.remove("d-none");

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      alerta.classList.add("d-none");
    }, 2000);
  });
};

async function verificarContraseñaComprometida(contraseña) {
  const sha1 = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(contraseña));
  const hash = Array.from(new Uint8Array(sha1)).map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  const prefijo = hash.substring(0, 5);
  const sufijo = hash.substring(5);

  const respuesta = await fetch(`https://api.pwnedpasswords.com/range/${prefijo}`);
  const texto = await respuesta.text();
  return texto.includes(sufijo);
}

function traducirSugerencias(sugerencias) {
  const traducciones = {
    "Add another word or two. Uncommon words are better.": "Agrega una o dos palabras más. Las palabras poco comunes son mejores.",
    "Use a few words, avoid common phrases": "Usa algunas palabras, evita frases comunes.",
    "No need for symbols, digits, or uppercase letters": "No necesitas símbolos, números o mayúsculas.",
    "Avoid repeated words and characters": "Evita repetir palabras o caracteres.",
    "Avoid sequences": "Evita secuencias.",
    "Avoid recent years": "Evita usar años recientes.",
    "Avoid years that are associated with you": "Evita años relacionados contigo.",
    "Avoid dates and years that are associated with you": "Evita fechas y años relacionados contigo.",
    "Capitalization doesn't help very much": "Las mayúsculas no ayudan mucho.",
    "All-uppercase is almost as easy to guess as all-lowercase": "Todo en mayúsculas es casi tan fácil de adivinar como todo en minúsculas.",
    "Reversed words aren't much harder to guess": "Palabras al revés no son mucho más seguras.",
    "Predictable substitutions like '@' instead of 'a' don't help very much": "Sustituciones predecibles como '@' en lugar de 'a' no ayudan mucho."
  };

  return sugerencias.map(texto => traducciones[texto] || texto);
}

function actualizarBarraDeFuerza(puntuacion) {
  const barra = document.getElementById("passwordStrengthBar");
  const niveles = [
    { color: "bg-danger", texto: "Muy débil", porcentaje: 20 },
    { color: "bg-warning", texto: "Débil", porcentaje: 40 },
    { color: "bg-info", texto: "Aceptable", porcentaje: 60 },
    { color: "bg-primary", texto: "Fuerte", porcentaje: 80 },
    { color: "bg-success", texto: "Muy fuerte", porcentaje: 100 }
  ];

  const nivel = niveles[puntuacion];
  barra.className = `progress-bar ${nivel.color}`;
  barra.style.width = `${nivel.porcentaje}%`;
  barra.innerText = nivel.texto;
}

function mostrarRetroalimentacion(mensaje, color = "secondary") {
  const retroalimentacion = document.getElementById("passwordFeedback");
  let icono = "ℹ️";
  if (color === "success") icono = "✅";
  if (color === "warning") icono = "⚠️";
  if (color === "danger") icono = "❌";

  retroalimentacion.innerText = `${icono} ${mensaje}`;
  retroalimentacion.className = `badge bg-${color} text-wrap text-center p-2`;
}

window.addEventListener("DOMContentLoaded", () => {
  btnGenerate.addEventListener("click", () => {
    generar();
  });

  btnVerifical.addEventListener("click", async (e) => {
    e.preventDefault();
    const campoContraseña = document.getElementById("password");
    const contraseña = campoContraseña.value.trim();

    if (contraseña.length === 0) {
      mostrarRetroalimentacion("Por favor, ingresa una contraseña.", "warning");
      actualizarBarraDeFuerza(0);
      return;
    }

    const resultado = zxcvbn(contraseña);
    actualizarBarraDeFuerza(resultado.score);

    if (resultado.score < 3) {
      const sugerenciasTraducidas = traducirSugerencias(resultado.feedback.suggestions);
      mostrarRetroalimentacion("Contraseña débil: " + sugerenciasTraducidas.join(", "), "danger");
    } else if (await verificarContraseñaComprometida(contraseña)) {
      mostrarRetroalimentacion("Esta contraseña ha sido filtrada en la web. Elige otra.", "danger");
    } else {
      mostrarRetroalimentacion("¡Contraseña segura y no ha sido filtrada!", "success");
    }
  });
});