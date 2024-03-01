'use strict'

import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { test, register, login, update, deleteU } from './user.controller.js'

const api = express.Router()

api.get('/test',  test)

api.put('/update/:id',update)
api.delete('/deleteU/:id', deleteU)

api.post('/register', register)
api.post('/login', login)

export default api