import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const routesPath = path.join(__dirname)
const files = fs.readdirSync(routesPath)

for(const file of files){
    if (file === 'index.js' || !file.endsWith('.js')) continue

    const module = await import(`./${file}`)
    const routeName = path.parse(file).name
    
    router.use(`/${routeName}`, module.default)

}

export default router;