'use strict'

import Public from './public.model.js'
import User from '../user/user.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send({message: 'La funcion de test '})
}

export const save = async(req,res)=>{
    try {
        let data = req.body
        let user = await User.findOne({_id: data.keeper})
        if(!user) return res.status(404).send({message: 'Keeper not found'})
        let publi = new Public(data)
        await publi.save()
        return res.send({message: 'Publicación agregada correctamente'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al guardar publicación'})
    }
}

export const get = async(req,res)=>{
    try {
        let publics = await Public.find().populate('keeper', [ 'name', 'surname'])
        return res.send({ publics })
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: "Erro mostrar"})
    }
}

export const update = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'hacen falta datos para actualizar'})
        let updatePublic = await Public.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('keeper', ['name', 'suername'])
        if(!updatePublic) return res.status(404).send({message: 'Publicación no encontrada y no actualizada'})
        return res.send({message: 'Publicación actualizada correctamente', updatePublic})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al actualizar'})
    }
}

export const deleteP = async(req,res)=>{
    try {
        let { id } = req.params
        let deletePublic = await Public.deleteOne({ _id: id})
        if(deletePublic.deleteCount == 0) return res.status(404).send({message: ' Publicación no encontrada, no eliminda'})
        return res.send({message: 'Publicación eliminada correctamente'})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error al eliminar la publicación'})
    }
}