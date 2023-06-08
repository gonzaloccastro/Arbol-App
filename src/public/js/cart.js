console.log("cart js");


const deleteCart = async (id) => {
        try {
            await fetch(`/api/carts/${id}`, {
            method: "DELETE",
            });
            alert("Carrito Eliminado");
            window.location.href = `/products`
        } catch (err) {
            console.log(err);
        }
};

const purchase = async (id) => {
    const url = window.location.href;
    const parts = url.split("/");
    const cartId = parts[parts.length - 1];
    try {
        await fetch(`/api/carts/${cartId}/purchase`, {
        method: "PUT",
        });
        // window.location.href = `/products`
    } catch (err) {
        console.log(err);
    }
};
