'use strict'

import { Schema, model } from 'mongoose'

const CommentSchema = Schema({
    coment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    publi: {
        type: Schema.ObjectId,
        ref: 'Tilte',
        required: true
    }
})

export default model('comment', CommentSchema)