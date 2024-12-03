




// Obtener el contexto del canvas
const ctx = document.getElementById('myChart').getContext('2d');





async function queryTwo() {
    try {
        const response = await fetch('http://localhost:3000/client/byWeek');
        if (response.ok) {
            // Convertimos la respuesta a JSON
            const data = await response.json();
            console.log('Datos recibidos:', data);
            week1 = data[0][0].TotalSales;
            week2 = data[0][1].TotalSales;
            week3 = data[0][2].TotalSales;
            week4 = data[0][3].TotalSales;
            // Crear la gráfica
            const myChart = new Chart(ctx, {
                type: 'bar', // Tipo de gráfica (puedes usar 'line', 'pie', etc.)
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Ventas $MXN',
                        data: [week1, week2, week3, week4],
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
        } else {
            console.log('Error: respuesta no ok');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}


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

async function queryThree() {
    try {
        const response = await fetch('http://localhost:3000/client/avg');
        if (response.ok) {
            // Convertimos la respuesta a JSON
            const data = await response.json();
            console.log('Datos recibidos:', data);
            // Mostrar la informacion
            document.getElementById('avgDiscount').innerHTML =  
            "<li>" + new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(data[0].TOTAL)+"</li>";
        
        } else {
            console.log('Error: respuesta no ok');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

async function queryFour() {
    try {
        const response = await fetch('http://localhost:3000/client/edoEnvios');
        if (response.ok) {
            const data = await response.json();
            console.log('Datos recibidos edoEnvio:', data);

            // Llenar la tabla
            const tableBody = document.querySelector('#envioTable tbody');
            tableBody.innerHTML = data.map(row => {
                //const totalFacturado = Number(row.TotalFacturado) || 0; // Convierte a número o asigna 0 si es inválido
                return `
                    <tr>
                        <td>${row.Metodo_Envio}</td>
                        <td>${row.Estado_envio}</td>
                        <td>${row.Costo}</td>
                    </tr>
                `;
            }).join('');

           
        } else {
            console.error('Error en la respuesta del servidor.');
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
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


        } else {
            console.error('Error en la respuesta del servidor.');
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

queryOne();
queryTwo();
queryThree();
queryFour();
queryFive();