



document.addEventListener('DOMContentLoaded', function() {



    fetch('http://localhost:3000/products/all')
    .then(response => {
        if (!response.ok) 
            throw new Error('Error at inicio.js request');
        return response.json();
    })
    .then(data => {
        console.log("Succesful connection to server");
        console.log(data[0]);
        console.log('DOM fully loaded');

        const size = data.length;
        const cont = document.getElementById('cont');
        const row = document.createElement('div');
        row.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4'; // Responsividad
        cont.appendChild(row);

        for (let i = 0; i < size; i++) {
            const divB = document.createElement('div');
            divB.className = 'col';
            const card = document.createElement('div');
            card.className = 'card h-100';
            divB.appendChild(card);

            const img = document.createElement('img');
            img.src = '../resources/productos/sneakers/' + data[i].Imagen_Prod;
            img.className = 'card-img-top img-thumbnail';
            card.appendChild(img);

            const divC = document.createElement('div');
            divC.className = 'card-body text-center';
            card.appendChild(divC);

            const p = document.createElement('p');
            p.className = 'shoe-name';
            p.textContent = data[i].Nombre_Prod;
            divC.appendChild(p);

            const p2 = document.createElement('p');
            p2.className = 'shoe-desc';
            p2.textContent = data[i].Descripcion_Prod;
            divC.appendChild(p2);

            const p3 = document.createElement('p');
            p3.className = 'shoe-price';
            const stringAmount = data[i].PrecioUnit_Prod; 
            const numberAmount = parseFloat(stringAmount);
            const formattedAmount = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'MXN',
            }).format(numberAmount);
            p3.textContent = formattedAmount;
            divC.appendChild(p3);

            row.appendChild(divB);
        }
        
    })
    .catch(error => console.error('Fetch error:', error));

    

    
});

