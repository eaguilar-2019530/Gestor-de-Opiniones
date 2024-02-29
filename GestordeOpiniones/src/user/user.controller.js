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