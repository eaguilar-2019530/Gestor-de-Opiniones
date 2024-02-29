import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password:{
        type: String,
        minLegth: [8,'Contraseña requiere de 8 caracteres'],
        required: true    
    }
})

export default mongoose.model('user', userSchema)