'use strict'

import { Schema, model } from 'mongoose'

const publiSchema = Schema({
    Tilte: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Text: {
        type: String,
        required: true
    },
    keeper: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model('publi', publiSchema)