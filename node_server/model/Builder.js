import Pool from '../db/index.js'

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

export default {
    Select, Update
}