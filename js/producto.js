// CONSULTAS

async function queryOne() {
    try {
        const response = await fetch('http://localhost:3000/products/topThreeBestSellers');
        if (response.ok) {
            // Convertimos la respuesta a JSON
            const data = await response.json();
            console.log('Datos recibidos:', data);
            // Mostrar la informacion
            document.getElementById('topThreeBestSellers').innerHTML = data.map((product, index) => `<li class="list-group-item d-flex justify-content-between align-items-start">
                      <span class="position-number">${index + 1}</span>
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">${product.Producto}</div>
                        Precio: $${product.Precio}
                      </div>
                      <span class="badge rounded-pill">${product.CantidadVendida}</span>
                    <img src="../resources/productos/${product.Img}" alt="Imagen ${index + 1}" class="product-image ms-3">
                    </li>`);
        } else {
            console.log('Error: respuesta no ok');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

async function queryTwo() {
    try {
        const response = await fetch('http://localhost:3000/products/getTopIncomesPerProduct');
        if (response.ok) {
            // Convertimos la respuesta a JSON
            const data = await response.json();
            console.log('Datos recibidos:', data);
            let nameProduct = [];
            let totalIncome = [];
            data.map((product) => {
                nameProduct.push(product.Producto);
                totalIncome.push(product.IngresosTotales);
            });
            // Mostrar la informacion
            // Obtener el contexto del canvas
            const ctx = document.getElementById('myChart').getContext('2d');
            // Crear la gráfica
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nameProduct,
                    datasets: [{
                        label: 'Ingresos',
                        data: totalIncome,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    indexAxis: 'y',
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });


        } else {
            console.log('Error: respuesta no ok');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

async function queryThree() {
    try {
        const response = await fetch('http://localhost:3000/products/getLowExcistence');
        if (response.ok) {
            // Convertimos la respuesta a JSON
            const data = await response.json();
            console.log('Datos recibidos:', data);

            let nameProduct = [];
            let existence = [];
            data.map((product) => {
                nameProduct.push(product.Producto);
                existence.push(product.Existencias);
            });

            const ctx3 = document.getElementById('myPieChart').getContext('2d');

            // Definir los colores según los rangos de valores
            const getColor = (value) => {
                if (value < 6) {
                    return 'rgba(255, 99, 132, 0.6)'; // Rojo para valores bajos
                } else if (value >= 6 && value < 8) {
                    return 'rgba(255, 206, 86, 0.6)'; // Amarillo para valores medios
                } else {
                    return 'rgba(75, 192, 192, 0.6)'; // Verde para valores altos
                }
            };

            // Asignar colores basados en los datos
            const backgroundColors = existence.map(getColor);

            // Crear gráfica de pastel
            const myPieChart = new Chart(ctx3, {
                type: 'pie',
                data: {
                    labels: nameProduct,
                    datasets: [{
                        label: 'Existencias',
                        data: existence,
                        backgroundColor: backgroundColors, // Colores dinámicos
                        borderColor: backgroundColors.map(color => color.replace('0.6', '1')), // Bordes más opacos
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right', // Muestra la leyenda a la derecha
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw} existencias`;
                                }
                            }
                        }
                    }
                }
            });
        } else {
            console.log('Error: respuesta no ok');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}





queryOne();
queryTwo();
queryThree();

const ctx3 = document.getElementById('myLineChart').getContext('2d');

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
});
// Obtener el contexto del canvas
const ctx4 = document.getElementById('myScatterChart').getContext('2d');

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
});