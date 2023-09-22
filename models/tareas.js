import colors from 'colors'
import Tarea from './tarea.js'

class Tareas {

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id) {
        if(this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc) {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {
        console.log()

        this.listadoArr.forEach((tarea, i) => {
            const id = `${i + 1}.`.blue
            const {desc, complementosEn } = tarea
            const estado = (complementosEn) ? 'Completada'.yellow : 'Pendiente'.red

            console.log(`${id} ${desc} :: ${estado}`)
        })
    }

    listaPendientesCompletadas(Completadas) {
        let cont = 0
        console.log()
        
        this.listadoArr.forEach((tarea) => {

            const { desc, complementosEn } = tarea
            const estado = (complementosEn) ? 'Completada'.yellow : 'Pendiente'.red
            
            if(Completadas) {
                if(complementosEn) {
                    cont += 1
                    console.log(`${(cont + '.').blue} ${desc} :: ${complementosEn.yellow}`)
                }
            } else {
                if(!complementosEn) {
                    cont += 1
                    console.log(`${(cont + '.').blue} ${desc} :: ${estado}`)
                }
            }       
        })
    }

    toggleCompletadas(ids) {

        ids.forEach( id => {
            const tarea = this._listado[id]

            if(!tarea.complementosEn) {
                tarea.complementosEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].complementosEn = null
            }
        })
    }
}

export default Tareas