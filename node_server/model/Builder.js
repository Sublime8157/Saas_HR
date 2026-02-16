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

export default {
    Select
}