// Slider de imágenes rotativas
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Cambiar la imagen cada 5 segundos
setInterval(nextSlide, 4000);

// Mostrar la fecha actual en el formato "dd/mm/yyyy"
const fechaElement = document.getElementById('fecha');
const hoy = new Date();
const fechaActual = hoy.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
});
fechaElement.textContent = fechaActual;


// Generar dinámicamente el calendario para el mes actual
const calendarBody = document.getElementById('calendar-body');

function generarCalendario() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // Mes actual (0-11)
    const anoActual = fechaActual.getFullYear(); // Año actual
    const primerDia = new Date(anoActual, mesActual, 1).getDay(); // Primer día del mes (0-6)
    const diasMes = new Date(anoActual, mesActual + 1, 0).getDate(); // Total de días en el mes actual

    let filas = '';
    let dia = 1;

    // Ajustar para que el primer día de la semana sea lunes (0 = lunes)
    const primerDiaCorregido = (primerDia === 0) ? 6 : primerDia - 1;

    for (let semana = 0; semana < 6; semana++) {
        filas += '<tr>';
        for (let i = 0; i < 7; i++) {
            if (semana === 0 && i < primerDiaCorregido) {
                filas += '<td></td>'; // Días vacíos antes del primer día del mes
            } else if (dia > diasMes) {
                filas += '<td></td>'; // Días vacíos después de que el mes termine
            } else {
                filas += `<td>${dia}</td>`;
                dia++;
            }
        }
        filas += '</tr>';
    }

    calendarBody.innerHTML = filas;
}

generarCalendario();