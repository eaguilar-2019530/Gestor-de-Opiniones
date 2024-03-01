'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req,res)=>{
    return res.send('Holis')
}

export const register = async(req, res)=>{
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: 'Registro completado'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al registrar el usuario', err})
    }
}

export const login = async(req, res)=>{
    try{
        let { email, username, password } = req.body
        let user = await User.findOne({ $or: [{ username}, { email }] })
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Bienvenido ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Credenciales Invalidas'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al iniciar sesión'})
    }
}

export const update = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        // let update = checkUpdate(data, id)
        // if(!update) return res.status(400).send({message: 'Los datos enviado no se pueden actualizar o falta datos'})
        let updateUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateUser) return res.status(401).send({message: 'Usuario no encotrado y no actualizado'})
        return res.send({message: 'Usuario actualizado',updateUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).sed({message: `Usuario ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error al actualizar perfil'})
    }
}

export const deleteU = async(req,res)=>{
    try {
        let { id } = req.params
        let deletedUser = await User.findOneAndDelete({_id: id})
        if(!deletedUser) return res.status(404).send({message: 'Cuenta no encotrada y no eliminada'})
        return res.send({message: `La cuenta con el nombre de usuario ${deletedUser.username} se eliminó correctamente`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al eliminar'})
    }
}