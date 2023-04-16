export const generateUserErrorInfo = (user)=>{
    return `
        Una o mas campos no son validos
        Listado de propiedades requeridas
        nombre es requerido y debe ser de tipo string, pero se recibio ${user.nombre}
        apellido es requerido y debe ser de tipo string, pero se recibio ${user.apellido}
        correo es requerido y debe ser de tipo string, pero se recibio ${user.correo}
    `
}

export const generateUserErrorParam = (userId)=>{
    return `
        el is del usuario debe ser de tipo numerico, pero se recibio ${userId}
    `
}


export const generateProductErrorInfo = (product)=>{
    return `
        Una o mas campos no son validos
        Listado de propiedades requeridas
        título es requerido y debe ser de tipo string, pero se recibio ${product.title}
    `
}