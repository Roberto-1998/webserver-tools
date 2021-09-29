const {request, response}=require('express');
const Usuario=require('../models/usuario');
const bcryptjs=require('bcryptjs');


const usuariosGet=async(req=request, res=response)=>{


    const {limite=5, desde=0}=req.query;
    const query={estado:true}


   

    const [total, usuarios]=await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])


    res.json({
      total, usuarios
    });
}

const usuariosPost=async(req=request, res=response)=>{

    const {nombre, correo, password, rol}=req.body;
    const usuario=new Usuario({nombre, correo, password, rol});
    
    //Encriptar contraseña 
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    
    res.json(usuario);
}

const usuariosPut=async(req=request, res=response)=>{
    const id=req.params.id;

    const {_id, password, google,correo, ...resto}=req.body;

    // TODO validar contra base de datos
    if(password){
            //Encriptar contraseña 
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password, salt);
    }
    const usuario=await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete=async(req=request, res=response)=>{
    const {id}=req.params;

    //Físicamente lo borramos
/*     const usuario=await Usuario.findByIdAndDelete(id); */

    const usuario=await Usuario.findByIdAndUpdate(id, {estado:false});
    //No se aconseja eliminarlo completamente porque se pierde la integridad referencial del usuario, es mejor practica actualizar el estado a false


    res.json({
        usuario
    });
}

const notFound=(req=request, res=response)=>{
    res.json({
        msg:'Page not Found'
    })

}





module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    notFound
}