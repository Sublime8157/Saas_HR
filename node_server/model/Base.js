import pool from '../db/index.js'
import queryBuilder from './Builder.js'

export default class Base {
    constructor(tableName){
        this.tableName = tableName
    }

    async insert(data){
        const keys = Object.keys(data)
        const values = Object.values(data)
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ')

        const query = `INSERT INTO ${this.tableName}(${keys.join(', ')}) VALUES (${placeholders}) RETURNING id`; 
        const result = await pool.query(query, values)

        return result.rows[0]
    }
    
    findByColumns(columns){
        return new queryBuilder.Select(this.tableName, columns)
    }

    async findCompany(code){
        const query = `SELECT * FROM ${this.tableName} WHERE code = '${code}'` 
        const result = await pool.query(query)
        
        return result.rows
    }
}
