import Base from './Base.js'

class Company extends Base {
    constructor() {
        super('companies') // Pass the table name
    }
}

export default new Company()