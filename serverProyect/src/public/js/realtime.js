const socket = io()


socket.on( 'productos', data =>{
    console.log(data)
    let logs='' //Almacenar HTML

    let tbody = document.getElementById('listaProductos') // Se muestran en tbody


    data.forEach(el => { //Recorre array de productos
        logs += `<tr>
                    <td>${el.id}</td>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>${el.price}</td>
                    <td>${el.thumbnails}</td>
                    <td>${el.stock}</td>
                    <td>${el.code}</td>
                </tr>`
    });

    
    tbody.innerHTML = logs //Lo inserta en nuestro .html
})