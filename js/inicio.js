document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    const images = 32;
    const cont = document.getElementById('cont');

    const row = document.createElement('div');
    row.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4'; // Responsividad
    cont.appendChild(row);

    for (let i = 0; i < images; i++) {
        const divB = document.createElement('div');
        divB.className = 'col';
        const card = document.createElement('div');
        card.className = 'card h-100';
        divB.appendChild(card);

        const img = document.createElement('img');
        img.src = '../pages/au.png';
        img.className = 'card-img-top img-thumbnail';
        card.appendChild(img);

        const divC = document.createElement('div');
        divC.className = 'card-body text-center';
        card.appendChild(divC);

        const p = document.createElement('p');
        p.className = 'shoe-name';
        p.textContent = 'Name of the shoe example';
        divC.appendChild(p);

        const p2 = document.createElement('p');
        p2.className = 'shoe-desc';
        p2.textContent = 'Fairly long description of the shoe example';
        divC.appendChild(p2);

        const p3 = document.createElement('p');
        p3.className = 'shoe-price';
        p3.textContent = '$100';
        divC.appendChild(p3);

        row.appendChild(divB);
    }
});