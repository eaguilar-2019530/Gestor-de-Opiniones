'use strict'

import { Router } from 'express'
import { test, save, get, update, deleteP} from './public.controller.js'

const api = Router()

api.get('/test', test)
api.post('/save', save)
api.get('/get', get)
api.put('/update/:id',update)
api.delete('/deleteP/:id', deleteP)


export default api