'use strict'

import { Router } from "express"
import { test } from './comments.controller.js'


const api = Router()

api.get('/test', test)


export default api