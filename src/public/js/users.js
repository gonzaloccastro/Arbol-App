console.log("users js");

const deleteOldUsers = async () => {
    try {
        await fetch(`/api/users/deleteOldUsers`, {
        method: "GET",
        });
        alert("Usuarios viejos eliminados");
        window.location.href = `/api/users/deleteOldUsers`
    } catch (err) {
        console.log(err);
    }
};


const updateRole = async (id) => {
    try {
        await fetch(`/api/users/premium/${id}`, {
            method: "PUT",
            });
            alert("Rol cambiado con éxito");
            window.location.href = `/api/users/adminPanel`
    } catch (err) {
        console.log(err);
    }
};

const deleteUser = async (id) => {
        try {
            await fetch(`/api/users/deleteUser/${id}`, {
                method: "DELETE",
                });
                alert("Usuario Eliminado");
                window.location.href = `/api/users/adminPanel`
        } catch (error) {
            console.log(err);
        }
};        
