import mongoose from "mongoose"

const publicSchema = mongoose.Schema({
    tilte:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
})

export default mongoose.model('public', publicSchema)