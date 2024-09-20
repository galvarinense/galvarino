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

/*function generarCalendario() {
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

generarCalendario();*/

function generateCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth(); // Mes actual
    const currentYear = today.getFullYear(); // Año actual
    const currentDay = today.getDate(); // Día actual

    // Obtener el primer día del mes
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); 
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    let date = 1;

    // Crear las filas del calendario (6 filas son suficientes para cualquier mes)
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        // Crear 7 columnas (una para cada día de la semana)
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            // Rellenar las celdas en blanco antes del primer día del mes
            if (i === 0 && j < (firstDay === 0 ? 6 : firstDay - 1)) {
                const emptyCell = document.createTextNode('');
                cell.appendChild(emptyCell);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                // Salir si ya no hay más días en el mes
                break;
            } else {
                const cellText = document.createTextNode(date);

                // Destacar el día actual
                if (date === currentDay) {
                    cell.classList.add('current-day');
                }

                // Hacer los domingos rojos
                if (j === 6) {
                    cell.classList.add('sunday');
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }

        calendarBody.appendChild(row);
    }
}

// Llamar a la función para generar el calendario al cargar la página
generateCalendar();