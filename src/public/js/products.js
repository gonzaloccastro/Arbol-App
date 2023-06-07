console.log("product js");

// const  addToCart = (productId)=> {
//     console.log('El producto recibido es:', productId);
// };

const getCart = async () => {
    const cart = await fetch("/api/carts", {
        method: "POST",
        });
    const data = cart.json();
    return data;
};

const addToCart = async (productId) => {
    const carrito = await getCart();
    const cartId = carrito.result._id;
        try {
            await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "POST",
            });
            alert("Producto agregado al carrito");
            window.location.href = `/api/carts/${cartId}`
        } catch (err) {
            console.log(err);
        }
};

if (document.getElementById("addProduct")) {
    document.getElementById("addProduct").addEventListener("click",
   async () => {
    try {
        let productTitle = document.getElementById("productTitle").value;
        // function validarTitulo() {
        //     if (productTitle.length == 0) {
        //         alert('Debe completar el título');
        //         console.log('Debe completar estos campos: Título, Descripción, Precio, Código, Categoría')
        //         return false          
        //     }
        //     else {
        //     return true;
        //     }
        // }
        // if (!validarTitulo()) {
        //     return;
        // }

        const productDescription = document.getElementById("productDescription").value;
        let productPrice = document.getElementById("productPrice").value;

        // function validarPrecio() {
        //     if (productPrice.length == 0) {
        //         alert('Debe completar el precio');
        //         console.log('Debe completar estos campos: Título, Descripción, Precio, Código, Categoría')
        //         return false;        
        //     } else {
        //     return true;
        //     }
        // }

        // if (!validarPrecio()) {
        //     return;
        // }
        const productStock = document.getElementById("productStock").value;
        const productThumbnail = document.getElementById("productThumbnail").value;
        const productCode = document.getElementById("productCode").value;
        const productCategory = document.getElementById("productCategory").value;

        const data = { 
            title: productTitle, 
            description: productDescription, 
            price: productPrice, 
            code: productCode, 
            stock: productStock,
            status: true,
            category: productCategory, 
            thumbnail: productThumbnail
        };
        console.log(data);

        const addProduct = await fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        .then((data) => {
            const result = data.json();
            console.log(result);
            // if (data.status === 200) {
            // window.location.href = "http://localhost:8080/api/products";
            // }
        });
        } catch (error) {
        console.log(error);
  }});
}
