const {Schema, model}=require('mongoose');


const UsuarioSchema=Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es requerido']
    },
    correo:{
        type:String,
        required:[true, 'El correo es requerido'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'La contraseña es requerida']
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})


UsuarioSchema.methods.toJSON=function(){
    //Tengo que utilizar una funcion nomral para poder implementar el this haciendo referencia a este modelo
    //Extraigo los campos que no quiero retornar el Object y aplico el spread para agrupar los otros, y estos ultimos serán los que retorne
    const {__v, password, ...usuario}=this.toObject();
    return usuario

}


module.exports=model('Usuario', UsuarioSchema);


