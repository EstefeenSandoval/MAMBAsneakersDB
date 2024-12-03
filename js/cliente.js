




// Obtener el contexto del canvas
const ctx = document.getElementById('myChart').getContext('2d');



// Crear la gráfica
const myChart = new Chart(ctx, {
    type: 'bar', // Tipo de gráfica (puedes usar 'line', 'pie', etc.)
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
            label: 'Ventas 2024',
            data: [120, 190, 300, 500, 200, 300],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// Obtener el contexto del canvas
const ctx2 = document.getElementById('myPieChart').getContext('2d');

// Crear la gráfica de pastel
const myPieChart = new Chart(ctx2, {
    type: 'pie', // Tipo de gráfica de pastel
    data: {
        labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
        datasets: [{
            label: 'Distribución de Ventas',
            data: [30, 20, 25, 25], // Porcentajes o valores de cada segmento
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Posición de la leyenda
            },
            tooltip: {
                enabled: true
            }
        }
    }
});
/*const ctx3 = document.getElementById('myLineChart').getContext('2d');

// Crear la gráfica de líneas
const myLineChart = new Chart(ctx3, {
    type: 'line', // Tipo de gráfica de línea
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [{
            label: 'Ventas 2024',
            data: [30, 50, 45, 70, 60, 80, 90], // Valores para cada mes
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.3, // Curvatura de la línea
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Ventas (en miles)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Meses'
                }
            }
        }
    }
});*/
// Obtener el contexto del canvas
/*const ctx4 = document.getElementById('myScatterChart').getContext('2d');

// Crear la gráfica de dispersión
const myScatterChart = new Chart(ctx4, {
    type: 'scatter', // Tipo de gráfica de dispersión
    data: {
        datasets: [{
            label: 'Muestra de Personas',
            data: [
                { x: 5, y: 80 },   // Edad: 5 años, Altura: 80 cm
                { x: 10, y: 100 }, // Edad: 10 años, Altura: 100 cm
                { x: 15, y: 140 },
                { x: 20, y: 160 },
                { x: 25, y: 170 },
                { x: 30, y: 175 },
                { x: 35, y: 173 },
                { x: 40, y: 170 }
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 5
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Edad (años)'
                },
                min: 0,
                max: 50
            },
            y: {
                title: {
                    display: true,
                    text: 'Altura (cm)'
                },
                min: 50,
                max: 200
            }
        }
    }
});*/

async function queryOne() {
    try {
        const response = await fetch('http://localhost:3000/client/top3');
        if (response.ok) {
            // Convertimos la respuesta a JSON
            const data = await response.json();
            console.log('Datos recibidos:', data);
            // Mostrar la informacion
            document.getElementById('topThreeBestSellers').innerHTML = data.map((cliente, index) => 
                `<li class="list-group-item d-flex justify-content-between align-items-start">
                      <span class="position-number">${index + 1}</span>
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">${cliente.NOMBRE_CTE}</div>
                        Consumo: $${cliente.TOTAL}
                      </div>
                    </li>`);
        } else {
            console.log('Error: respuesta no ok');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

async function queryFive() {
    try {
        const response = await fetch('http://localhost:3000/client/favProds');
        if (response.ok) {
            const data = await response.json();
            console.log('Datos recibidos:', data);

            // Llenar la tabla
            const tableBody = document.querySelector('#facturacionTable tbody');
            tableBody.innerHTML = data.map(row => {
                const totalFacturado = Number(row.TotalFacturado) || 0; // Convierte a número o asigna 0 si es inválido
                return `
                    <tr>
                        <td>${row.Nombre_Cte}</td>
                        <td>${row.Nombre_Prod}</td>
                        <td>${row.TotalQuantity}</td>
                    </tr>
                `;
            }).join('');


            // Preparar datos para gráficos
            const regions = [...new Set(data.map(item => item.Region))];
            const totalByRegion = regions.map(region => {
                return data
                    .filter(item => item.Region === region)
                    .reduce((sum, item) => sum + item.TotalFacturado, 0);
            });

            // Crear gráfico de pastel
            const ctx = document.getElementById('regionChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: regions,
                    datasets: [{
                        label: 'Facturación por Región',
                        data: totalByRegion,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                    }
                }
            });
        } else {
            console.error('Error en la respuesta del servidor.');
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

queryOne();
queryFive();