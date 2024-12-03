// Base URL for API endpoints
const API_BASE_URL = 'http://localhost:3000'; 

// Fetch and populate tables
async function loadTables() {
    try {
        // Fetch Providers
        const providersResponse = await fetch(`${API_BASE_URL}/providers/all`);
        const providers = await providersResponse.json();
        populateProviderTable(providers);

        // Fetch Clients
        const clientsResponse = await fetch(`${API_BASE_URL}/clients/all`);
        const clients = await clientsResponse.json();
        populateClientTable(clients);

        // Fetch Products
        const productsResponse = await fetch(`${API_BASE_URL}/products/all`);
        const products = await productsResponse.json();
        populateProductTable(products);
    } catch (error) {
        console.error('Error loading tables:', error);
        alert('Error loading data. Please try again.');
    }
}

// Populate Provider Table
function populateProviderTable(providers) {
    const tableBody = document.querySelector('#provider-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    providers.forEach(provider => {
        const row = `
            <tr>
                <td>${provider.ID_Prov}</td>
                <td>${provider.Nombre_Prov}</td>
                <td>${provider.Contacto_Prov}</td>
                <td>${provider.Telefono_Prov}</td>
                <td>${provider.Email_Prov}</td>
                <td>${provider.Direccion_Prov}</td>
                <td>${provider.Ciudad_Prov}</td>
                <td>${provider.Pais_Prov}</td>
                <td>${provider.LocalidadID}</td>
                <td>
                    <button style="margin: 5px; cursor: pointer;" onclick="editProvider(${provider.ID_Prov})"> <i class="fa-solid fa-pen-to-square fa-lg" style="color: #0068b8;"></i></button>
                    <button style="margin: 5px; cursor: pointer;" onclick="deleteProvider(${provider.ID_Prov})"><i class="fa-solid fa-trash fa-xl" style="color: #a80000;"></i></button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Populate Client Table
function populateClientTable(clients) {
    const tableBody = document.querySelector('#client-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    clients.forEach(client => {
        const row = `
            <tr>
                <td>${client.RFC_Cte}</td>
                <td>${client.Nombre_Cte}</td>
                <td>${client.Calle}</td>
                <td>${client.Colonia}</td>
                <td>${client.LocalidadID}</td>
                <td>
                    <button style="margin: 5px; cursor: pointer;" onclick="editClient('${client.RFC_Cte}')"> <i class="fa-solid fa-pen-to-square fa-lg" style="color: #0068b8;"></i></button>
                    <button style="margin: 5px; cursor: pointer;" onclick="deleteClient('${client.RFC_Cte}')"><i class="fa-solid fa-trash fa-xl" style="color: #a80000;"></i></button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Populate Product Table
function populateProductTable(products) {
    const tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.ID_Prod}</td>
                <td>${product.Nombre_Prod}</td>
                <td>${product.Descripcion_Prod}</td>
                <td>${product.Cantidad_Prod}</td>
                <td>${product.PrecioUnit_Prod}</td>
                <td>${product.Descuento_Prod}</td>
                <td>${product.Imagen_Prod}</td>
                <td>
                    <button style="margin: 5px; cursor: pointer;" onclick="editProduct(${product.ID_Prod})"> <i class="fa-solid fa-pen-to-square fa-lg" style="color: #0068b8;"></i></button>
                    <button style="margin: 5px; cursor: pointer;" onclick="deleteProduct(${product.ID_Prod})"><i class="fa-solid fa-trash fa-xl" style="color: #a80000;"></i></button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Handle form submission Provider
document.getElementById('data-prov').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data_prov_id = document.getElementById('data-prov-id').value;
    const data_prov_name = document.getElementById('data-prov-name').value;
    const data_prov_contact = document.getElementById('data-prov-contact').value;
    const data_prov_phone = document.getElementById('data-prov-phone').value;
    const data_prov_email = document.getElementById('data-prov-email').value;
    const data_prov_address = document.getElementById('data-prov-address').value;
    const data_prov_city = document.getElementById('data-prov-city').value;
    const data_prov_country = document.getElementById('data-prov-country').value;
    const data_prov_loc = document.getElementById('data-prov-loc').value;

    try {
        if (data_prov_id) {
            // Update Provider
            response = await fetch(`${API_BASE_URL}/providers/update/${data_prov_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre_Prov: data_prov_name,
                    Contacto_Prov: data_prov_contact,
                    Telefono_Prov: data_prov_phone,
                    Email_Prov: data_prov_email,
                    Direccion_Prov: data_prov_address,
                    Ciudad_Prov: data_prov_city,
                    Pais_Prov: data_prov_country,
                    LocalidadID: data_prov_loc
                })
            });
        } else {
            // Create Provider
            response = await fetch(`${API_BASE_URL}/providers/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre_Prov: data_prov_name,
                    Contacto_Prov: data_prov_contact,
                    Telefono_Prov: data_prov_phone,
                    Email_Prov: data_prov_email,
                    Direccion_Prov: data_prov_address,
                    Ciudad_Prov: data_prov_city,
                    Pais_Prov: data_prov_country,
                    LocalidadID: data_prov_loc
                })
            });
        }      
        if (response.ok) {
            // Reset form and reload tables
            document.getElementById('data-prov').reset();
            document.getElementById('data-prov-id').value = '';
            loadTables();
            alert('Operación exitosa');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar. Intente de nuevo.');
    }
});

// Handle form submission Client
document.getElementById('data-client').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data_client_id = document.getElementById('data-client-id').value;
    const data_client_rfc = document.getElementById('data-client-rfc').value;
    const data_client_name = document.getElementById('data-client-name').value;
    const data_client_street = document.getElementById('data-client-street').value;
    const data_client_col = document.getElementById('data-client-col').value;
    const data_client_loc = document.getElementById('data-client-loc').value;

    try{
        if (data_client_id) {
            // Update Client
            response = await fetch(`${API_BASE_URL}/clients/update/${data_client_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RFC_Cte: data_client_rfc,
                    Nombre_Cte: data_client_name,
                    Calle: data_client_street,
                    Colonia: data_client_col,
                    LocalidadID: data_client_loc
                })
            });
        } else {
            // Create Client
            response = await fetch(`${API_BASE_URL}/clients/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RFC_Cte: data_client_rfc,
                    Nombre_Cte: data_client_name,
                    Calle: data_client_street,
                    Colonia: data_client_col,
                    LocalidadID: data_client_loc
                })
            });
        }

        if (response.ok) {
            // Reset form and reload tables
            document.getElementById('data-client').reset();
            document.getElementById('data-client-id').value = '';
            document.getElementById('data-client-rfc').readOnly = false;
            loadTables();
            alert('Operación exitosa');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar. Intente de nuevo.');
    }
});

// Handle form submission Product
document.getElementById('data-prod').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data_prod_id = document.getElementById('data-prod-id').value;
    const data_prod_name = document.getElementById('data-prod-name').value;
    const data_prod_desc = document.getElementById('data-prod-desc').value;
    const data_prod_qty = document.getElementById('data-prod-qty').value;
    const data_prod_price = document.getElementById('data-prod-price').value;
    const data_prod_disc = document.getElementById('data-prod-disc').value;
    const data_prod_image = document.getElementById('data-prod-image').value;

    try{
        if (data_prod_id) {
            // Update Product
            response = await fetch(`${API_BASE_URL}/products/update/${data_prod_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre_Prod: data_prod_name,
                    Descripcion_Prod: data_prod_desc,
                    Cantidad_Prod: data_prod_qty,
                    PrecioUnit_Prod: data_prod_price,
                    Descuento_Prod: data_prod_disc,
                    Imagen_Prod: data_prod_image
                })
            });
        } else {
            // Create Product
            response = await fetch(`${API_BASE_URL}/products/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre_Prod: data_prod_name,
                    Descripcion_Prod: data_prod_desc,
                    Cantidad_Prod: data_prod_qty,
                    PrecioUnit_Prod: data_prod_price,
                    Descuento_Prod: data_prod_disc,
                    Imagen_Prod: data_prod_image
                })
            });
        }

        if (response.ok) {
            // Reset form and reload tables
            document.getElementById('data-prod').reset();
            document.getElementById('data-prod-id').value = '';
            loadTables();
            alert('Operación exitosa');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar. Intente de nuevo.');
    }
});   


// Clear prov form
document.getElementById('clear-prov').addEventListener('click', async (e) => {
    e.preventDefault();
    document.getElementById('data-prov').reset();
    document.getElementById('data-prov-id').value = '';
});

// Clear client form
document.getElementById('clear-client').addEventListener('click', async (e) => {
    e.preventDefault();
    document.getElementById('data-client').reset();
    document.getElementById('data-client-id').value = '';
    document.getElementById('data-client-rfc').readOnly = false;
});

// Clear product form
document.getElementById('clear-prod').addEventListener('click', async (e) => {
    e.preventDefault();
    document.getElementById('data-prod').reset();
    document.getElementById('data-prod-id').value = '';
});


// Edit providers
async function editProvider(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/providers/all`);
        const providers = await response.json();
        const provider = providers.find(p => p.ID_Prov === id);

        if (provider) {
            document.getElementById('data-prov-id').value = id;
            document.getElementById('data-prov-name').value = provider.Nombre_Prov;
            document.getElementById('data-prov-contact').value = provider.Contacto_Prov;
            document.getElementById('data-prov-phone').value = provider.Telefono_Prov;
            document.getElementById('data-prov-email').value = provider.Email_Prov;
            document.getElementById('data-prov-address').value = provider.Direccion_Prov;
            document.getElementById('data-prov-city').value = provider.Ciudad_Prov;
            document.getElementById('data-prov-country').value = provider.Pais_Prov;
            document.getElementById('data-prov-loc').value = provider.LocalidadID;
        }
    } catch (error) {
        console.error('Error fetching provider:', error);
    }
}

// Edit clients
async function editClient(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/clients/all`);
        const clients = await response.json();
        const client = clients.find(c => c.RFC_Cte === id);

        if (client) {
            document.getElementById('data-client-id').value = id;
            document.getElementById('data-client-rfc').value = client.RFC_Cte;
            document.getElementById('data-client-rfc').readOnly = true;
            document.getElementById('data-client-name').value = client.Nombre_Cte;
            document.getElementById('data-client-street').value = client.Calle;
            document.getElementById('data-client-col').value = client.Colonia;
            document.getElementById('data-client-loc').value = client.LocalidadID;
        }
    } catch (error) {
        console.error('Error fetching client:', error);
    }
}

// Edit products
async function editProduct(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/all`);
        const products = await response.json();
        const product = products.find(p => p.ID_Prod === id);

        if (product) {
            document.getElementById('data-prod-id').value = id;
            document.getElementById('data-prod-name').value = product.Nombre_Prod;
            document.getElementById('data-prod-desc').value = product.Descripcion_Prod;
            document.getElementById('data-prod-qty').value = product.Cantidad_Prod;
            document.getElementById('data-prod-price').value = product.PrecioUnit_Prod;
            document.getElementById('data-prod-disc').value = product.Descuento_Prod;
            document.getElementById('data-prod-image').value = product.Imagen_Prod;
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

// Delete providers
async function deleteProvider(id) {
    if (confirm('¿Está seguro de eliminar este proveedor?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/providers/delete/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadTables();
                alert('Proveedor eliminado exitosamente');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar. Intente de nuevo.');
        }
    }
}

// Delete clients
async function deleteClient(id) {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/clients/delete/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadTables();
                alert('Cliente eliminado exitosamente');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar. Intente de nuevo.');
        }
    }
}

// Delete products
async function deleteProduct(id) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/products/delete/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadTables();
                alert('Producto eliminado exitosamente');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar. Intente de nuevo.');
        }
    }
}

// Load tables when page loads
document.addEventListener('DOMContentLoaded', loadTables);