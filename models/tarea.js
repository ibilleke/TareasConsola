import { v4 as uuidv4 } from 'uuid'

class Tarea {
    constructor( desc ) {
        this.id = uuidv4()
        this.desc = desc
        this.complementosEn = null
    }
}

export default Tarea