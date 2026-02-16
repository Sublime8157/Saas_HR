import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()
const __dirname = path.resolve()

fs.readdirSync(__dirname + '/routes').forEach(file => {
    if (file === 'index.js' || !file.endsWith('js')) return

    import(`./${file}`).then(module => {
        const routePath = '/' + file.replace('.js', '')
        router.use(routePath, module.default)
    }).catch(err => console.error(err))
})

export default router;