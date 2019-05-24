firebase.initializeApp({
    apiKey: "AIzaSyAiaTh-ZndEBdAKwwB1imZBXTc9hJTmNfk",
    authDomain: "crud-2eef3.firebaseapp.com",
    projectId: "crud-2eef3"
  });
  
// Initialize Cloud Firestore through Firebase
 var db = firebase.firestore();

// Agregar colecciones
function guardar(){
    var producto = document.getElementById('producto').value;
    var categoria = document.getElementById('categoria').value;
    var cantidad = document.getElementById('cantidad').value;
    var precio = document.getElementById('precio').value;

    db.collection("products").add({
        product: producto,
        category: categoria,
        stock: cantidad,
        price: precio
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('producto').value='';
        document.getElementById('categoria').value='';
        document.getElementById('cantidad').value='';
        document.getElementById('precio').value='';
        
     
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//listar coleciones
//function leer (){
    var tabla = document.getElementById('tabla');
    db.collection("products").onSnapshot((querySnapshot) => {
        tabla.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            tabla.innerHTML +=`
            <tr>
                <th scope="row">${doc.id} </th>
                <td>${doc.data().product} </td>
                <td>${doc.data().category}</td>
                <td>${doc.data().stock}</td>
                <td>${doc.data().price}</td>
                <td> <a class="btn btn-warning mb-3" onclick="editar('${doc.id}') ">Editar</a> </td>
                <td> <a class="btn btn-danger mb-3" onclick="eliminar('${doc.id}') ">Eliminar</a> </td>
            </tr>
            `
        });
    });
//}

function eliminar(id){
    db.collection("products").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    toastr.error('Are you the 6 fingered man?')

}

function editar (id){
    var variable = db.collection("products").doc(id);
    variable.get().then(function(doc) {

        document.getElementById('producto').value = doc.data().product;
        document.getElementById('categoria').value = doc.data().category;
        document.getElementById('cantidad').value = doc.data().stock;
        document.getElementById('precio').value = doc.data().price;

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    var titulo = document.getElementById('titulo');
    titulo.innerHTML = 'Actualizar producto';

    boton.onclick = function(){

        var producto = document.getElementById('producto').value;
        var categoria = document.getElementById('categoria').value;
        var cantidad = document.getElementById('cantidad').value;
        var precio = document.getElementById('precio').value;

        // Set the "capital" field of the city 'DC'
        return variable.update({
            product: producto,
            category: categoria,
            stock: cantidad,
            price: precio
        })
        .then(function() {
            console.log("Document successfully updated!");
            titulo.innerHTML = 'Agregar producto';
            boton.innerHTML = 'Guardar';
            document.getElementById('producto').value='';
            document.getElementById('categoria').value='';
            document.getElementById('cantidad').value='';
            document.getElementById('precio').value='';
            boton.onclick=function(){
                guardar();
            }
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}

