'use strict'

import User from '../user/user.model.js'
import Public from '../public/public.model.js'
import Comment from '../comments/comments.model.js'

export const test = (req, res)=>{
    return res.send({message: 'Existe la conexion de Comentario.'})
}

export const save = async(req,res)=>{
    try {
        
    } catch (err) {
        console.error(err)
        return res.send(500).send({message: 'Error al guardar comentario'})
    }
}