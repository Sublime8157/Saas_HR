import Pool from '../db/index.js'
import Common from '../helpers/common.js'

class Select {
    constructor(tableName, columns) {
        this.tableName = tableName
        this.columns = columns
        this.order = null
        this.direction = null
    }

    asc(column) {
        this.column = column
        this.order = 'ASC'
        return this
    }

    desc(column) {
        this.column = column
        this.order = 'DESC'
        return this
    }

    async execute() {
        let query = `SELECT ${this.columns.join(', ')} FROM ${this.tableName}`

        if(this.order) {
            query += ` ORDER BY ${this.column} ${this.order}`
        }

        const result = await Pool.query(query)
        return result.rows
    }

}

class Update {
    constructor(tableName, data){
        this.tableName = tableName
        this.data = data
        this.whereColumn = null
        this.whereValue = null 
    }

    where(column, value){
        this.whereColumn = column
        this.whereValue = value
        return this 
    }
    
    async execute(){
        let columns = Object.keys(this.data)
        let values = Object.values(this.data)

        if(columns.length === 0){
            throw new Error('No fields provided for update.')
        }
        
        if(!this.whereColumn || this.whereValue === undefined){
            throw new Error('WHERE clause is required for UPDATE')
        }   

        const setClause = columns
            .map((col, index) => `${col} = $${index + 1}`)
            .join(', ')
     
        const whereIndex = columns.length + 1

        const query = `
            UPDATE ${this.tableName} 
            SET ${setClause} 
            WHERE ${this.whereColumn} = $${whereIndex}
            RETURNING *
        `;
        
        const finalValue = [...values, this.whereValue]
        const result = await Pool.query(query, finalValue)
        
        return result.rows
    }
    
}

class Delete {
    constructor(tableName) {
        this.tableName = tableName
        this.whereClause = null
        this.expre = null
    }

    where(where){
        this.whereClause = where
        return this 
    }
    
    expression(expression){
        this.expre = null
        return this
    }
    
    async execute(){
        const keys = Object.keys(this.whereClause)
        const values = Object.values(this.whereClause)
        
        if(!keys.length) throw new Error('Refusing to delete missing WHERE clause');
        
        const where = keys 
            .map((col, i) => `${Common.ident(col)} = $${i + 1}`)
            .join(' AND ')
            
        const query = `
            DELETE FROM ${Common.ident(this.tableName)} 
            WHERE ${where} RETURNING *`             
        
        const result = await Pool.query(query, values)
        return result.rows

    }
}

export default {
    Select, Update, Delete
}