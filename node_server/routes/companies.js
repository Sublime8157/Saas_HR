import express from 'express'
import Company from '../model/Companies.js'
import common from '../helpers/common.js'

const router = express.Router()

router.post('/addCompany', async (req, res) => {
    const { name, code,  email, active } = req.body
    const requiredFields = [ 'name', 'code',  'email', 'active' ]
    
    for(let field of requiredFields) {
        if(common.isBlank(req.body[field])){
            return res.status(400).json({
                message: `${field} is required`
            })
        }
    }

    try {
        const result = await Company.insert({ name, code, email, active })
        return res.status(201).json({
            message: `Record inserted successfully!`
        })
    } 
    catch(e) {
        return res.status(500).json({
            message: e.message
        })
    }
})

router.get('/', async (req, res) => {
    try{
        const cols = ['name', 'active','email', 'code'] // columns to fetch
        const result = await Company.findByColumns(cols).asc('id').execute()
        res.status(200).json(result)
    }
    catch(error){
        res.status(500).json({ error: error.message })
    }
})

router.get('/getCompany/:code', async(req, res) => {
    try{
        const { code } = req.params
        const result = await Company.find('code', code)
        res.status(200).json(result)
    } 
    catch (error){
        res.status(500).json({ error: error.message })
    }
})

router.patch('/editCompany/:code', async (req, res) => {
    try{
        const { data } = req.body
        const { code } = req.params

        const result = await Company
            .update(data)
            .where('code', code)
            .execute()

        if(common.isBlank(result.length)){
            return res.status(404).json({ error: `Company code: '${code}' does not exist` })
        }

        res.status(200).json(result)
    } 
    catch (error){
        res.status(500).json({ error: error.message })
    }
})

router.delete('/deleteCompany', async (req, res) => {
    try {
        const { where } = req.body
        const result = await Company.delete().where(where).execute()

        res.status(200).json(result)
    }
    catch (error){
        res.status(500).json({ error: error.message })
    }
    
})

export default router