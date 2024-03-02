'use strict'

import User from '../user/user.model.js'
import Public from '../public/public.model.js'
import Comment from '../comments/comments.model.js'

export const test = (req, res)=>{
    return res.send({message: 'Existe la conexion de Comentario.'})
}

export const save = async(req,res)=>{
    try {
        let data = req.body
        let publi = await Public.findOne({_id: data.Tilte})
        if(!publi) return res.status(404).send({message: 'Keeper no funciona'})
        let comment = new Comment(data)
        await comment.save()
        return res.send({message: 'Commentario guardado correctamente'})
    } catch (err) {
        console.error(err)
        return res.send(500).send({message: 'Error al guardar comentario'})
    }
}

export const update = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedAnimal = await Animal.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('keeper', ['name', 'phone'])
        if(!updatedAnimal) return res.status(404).send({message: 'Animal not found, not updated'})
        return res.send({message: 'Animal updated successfully', updatedAnimal})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating animal'})
    }
}


