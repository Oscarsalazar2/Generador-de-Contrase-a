# 🔐 Generador y Verificador de Contraseñas Seguras

Esta es una aplicación web simple y responsiva que permite generar contraseñas seguras y verificar su fortaleza. Desarrollada con HTML, CSS, JavaScript y Bootstrap.

## 🚀 Funcionalidades

- ✅ Generación de contraseñas aleatorias.
- 🔢 Opción para incluir números y símbolos.
- 📋 Copia automática al portapapeles al generar.
- 📱 Interfaz adaptable a móviles.
- 🧠 Verificación de fortaleza con la librería `zxcvbn`.
- ⚠️ Detección de contraseñas filtradas (usando la API de Have I Been Pwned).


## 📦 Tecnologías usadas

- HTML5
- CSS3
- JavaScript
- [Bootstrap 5](https://getbootstrap.com/)
- [zxcvbn](https://github.com/dropbox/zxcvbn) – Análisis de fortaleza de contraseñas
- [Have I Been Pwned API](https://haveibeenpwned.com/API/v3) – Verificación de contraseñas filtradas


## 🔧 Instalación y uso

1. Clona el repositorio o descarga los archivos.
2. Abre `index.html` en cualquier navegador moderno.
3. ¡Listo! Puedes generar y verificar contraseñas.

## 🌐 Cómo funciona la verificación

- `zxcvbn` analiza la contraseña e indica si es débil, buena o excelente.
- La API de Have I Been Pwned verifica si la contraseña ha aparecido en filtraciones públicas usando **k-anonimato**, protegiendo tu privacidad.

## 📱 Responsive Design

La página ha sido diseñada para adaptarse correctamente a cualquier dispositivo: computadoras, tablets y smartphones.

## 💡 Mejoras futuras

- Modo oscuro automático.
- Opción para guardar contraseñas temporalmente.
- Exportar contraseñas como archivo `.txt`.

## 🛡️ Aviso de seguridad

Este generador **no guarda ni transmite contraseñas**. Toda la lógica se ejecuta en el navegador del usuario.

## 👨‍💻 Autor

- Oscar Salazar

---

¡Gracias por visitar el proyecto! ⭐ Si te gustó, considera darle una estrella o contribuir con mejoras.
