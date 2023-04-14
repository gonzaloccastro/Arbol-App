export const isAdminRole = (req,res,next)=>{
    console.log("isAdmin", req.user)
    if(req.user.rol ==="admin"){
        next();
    } else {
        res.send("no tienes permisos")
    }
}

export const isUserRole = (req,res,next)=>{
    console.log("isUser", req.user)
    if(req.user.rol ==="usuario"){
        next();
    } else {
        res.send("no tienes permisos")
    }
}


