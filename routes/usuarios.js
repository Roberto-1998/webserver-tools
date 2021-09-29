const {Router}=require('express');
const { check } = require('express-validator');
const {  notFound, usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');



const router=Router();

router.get('/', usuariosGet)

router.post('/',[
    check('nombre', 'El nombre es requerido').not().isEmpty(), 
    check('password', 'El password debe contener más de 6 letras').isLength({min:6}), 
    check('correo', 'El correo no es válido').isEmail(), 
    check('correo', 'Ese correo ya está registrado').custom(existeEmail), 
    /* check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),  */
    check('rol').custom(esRoleValido),//? Esto es una forma abreviada de ponerlo, donde se sabe que el primer argumento que enviará el custom será el primer argumento que recibirá el esRolValido: lo mismo que (rol)=>esRoleValido(rol)
    validarCampos
],usuariosPost)


router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut)

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete) 

router.get('*', notFound);

module.exports=router;