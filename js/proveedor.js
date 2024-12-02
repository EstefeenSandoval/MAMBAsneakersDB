// CONSULTAS

async function queryOne() {
    try {
        const response = await fetch('http://localhost:3000/provider/getTopMoreProductsSupplied');
        if (response.ok) {
            // Convertimos la respuesta a JSON
            const data = await response.json();
            console.log('Datos recibidos:', data);
            // Mostrar la informacion
            document.getElementById('getTopMoreProductsSupplied').innerHTML = data.map((proveedor, index) => `<li class="list-group-item d-flex justify-content-between align-items-start">
                      <span class="position-number">${index + 1}</span>
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">${proveedor.Proveedor}</div>
                      </div>
                      <span class="badge rounded-pill">${proveedor.ProductosSuministrados}</span>
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
        const response = await fetch('http://localhost:3000/provider/getBilling');
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
      // Solicitar datos del backend
      const response = await fetch('http://localhost:3000/provider/getLowExcistence');
      
      if (response.ok) {
        // Convertir la respuesta a JSON
        const data = await response.json();
        console.log('Datos recibidos:', data);
  
        let nameProduct = [];
        let existence = [];
        let providerProduct = [];  // Este array guardará las etiquetas proveedor + producto
  
        // Mapear los datos recibidos
        data.forEach((product) => {
          // Etiquetas con nombre del proveedor + nombre del producto
          providerProduct.push(`${product.Proveedor} - ${product.Producto}`);
          existence.push(product.Existencias); // Extraer cantidad de existencias
        });
  
        const ctx3 = document.getElementById('myPieChart').getContext('2d');
  
        // Función para asignar colores según la cantidad de existencias
        const getColor = (value) => {
          if (value < 6) {
            return 'rgba(255, 99, 132, 0.6)'; // Rojo para valores bajos
          } else if (value >= 6 && value < 8) {
            return 'rgba(255, 206, 86, 0.6)'; // Amarillo para valores medios
          } else {
            return 'rgba(75, 192, 192, 0.6)'; // Verde para valores altos
          }
        };
  
        // Asignar colores basados en las existencias
        const backgroundColors = existence.map(getColor);
  
        // Crear la gráfica de pastel (Pie Chart)
        const myPieChart = new Chart(ctx3, {
          type: 'pie',
          data: {
            labels: providerProduct, // Etiquetas: proveedor + producto
            datasets: [{
              label: 'Existencias',
              data: existence, // Datos: cantidades de existencias
              backgroundColor: backgroundColors, // Colores dinámicos
              borderColor: backgroundColors.map(color => color.replace('0.6', '1')), // Bordes más opacos
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw} existencias`; // Personalizar tooltip
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
  

async function queryFour() {
    try {
        const response = await fetch('http://localhost:3000/provider/getAvgDiscount');
        if (response.ok) {
            // Convertimos la respuesta a JSON
            const data = await response.json();
            console.log('Datos recibidos:', data);
            // Mostrar la informacion
            document.getElementById('avgDiscount').innerHTML = data.map((product, index) => `<li>$${product.DescuentoPromedio}</li>`);
        } else {
            console.log('Error: respuesta no ok');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

async function queryFive() {
    try {
        const response = await fetch('http://localhost:3000/provider/getBilling');
        if (response.ok) {
            const data = await response.json();
            console.log('Datos recibidos:', data);

            // Llenar la tabla
            const tableBody = document.querySelector('#facturacionTable tbody');
            tableBody.innerHTML = data.map(row => {
                const totalFacturado = Number(row.TotalFacturado) || 0; // Convierte a número o asigna 0 si es inválido
                return `
                    <tr>
                        <td>${row.Proveedor}</td>
                        <td>${row.Cliente}</td>
                        <td>${row.Region}</td>
                        <td>$${totalFacturado.toFixed(2)}</td>
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
queryThree();
queryFour();
queryFive();