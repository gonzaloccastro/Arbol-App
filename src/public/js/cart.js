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