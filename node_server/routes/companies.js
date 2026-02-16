import express from 'express'
import Company from '../model/Companies.js'
import common from '../helpers/common.js'

const router = express.Router()

router.post('/addCompanies', async (req, res) => {
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
    const cols = ['name', 'active','email', 'code'] // columns to fetch
    const result = await Company.findByColumns(cols).asc('id').execute()
    
    res.status(200).json(result)
    
})

router.get('/getCompany', async(req, res) => {
    const { Code } = req.body
    const result = await Company.findCompany(Code)
    
    res.status(200).json(result)
})

export default router