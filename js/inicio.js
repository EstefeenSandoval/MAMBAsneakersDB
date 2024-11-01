document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded for catalog page');
    const images = 30;
    const cont = document.getElementById('cont');
    for (let i = 0; i <= images / 3; i++) {
        const row = document.createElement('div');
        row.className = 'row row-cols-3 g-4';
        for (let j = 0; j < 3; j++) {
            const divB = document.createElement('div');
            divB.className = 'card';
            row.appendChild(divB);

            const img = document.createElement('img');
            img.src = 'pages/au.png';
            img.className = 'img-thumbnail';
            divB.appendChild(img);

            const divC = document.createElement('div');
            divC.className = 'card-body textDesc';
            divB.appendChild(divC);

            const p = document.createElement('p');
            p.className = 'shoe-name';
            p.style.fontFamily = 'Arial';
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
        }
        cont.appendChild(row);
    }
});