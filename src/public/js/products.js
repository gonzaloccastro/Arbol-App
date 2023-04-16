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
            const addCartProduct = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "POST",
            });
            alert("Producto agregado al carrito");
            window.location.href = `/api/carts/${cartId}`
        } catch (err) {
            console.log(err);
        }
};
