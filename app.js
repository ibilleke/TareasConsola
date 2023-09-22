import colors from 'colors'
import { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheck
} from './helpers/inquirer.js'
import Tareas from './models/tareas.js'
import { guardarDB,
        leerDB
} from './helpers/guardarArchivo.js'

const main = async () => {
    let opt = ''
    const tareas = new Tareas()
    const tareasDB = leerDB()

    if ( tareasDB ) {
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                // Crear opción
                const desc = await leerInput('Descripción:')
                tareas.crearTarea(desc)
                break

            case '2':
                tareas.listadoCompleto()
                break

            case '3':
                tareas.listaPendientesCompletadas(true)
                break

            case '4':
                tareas.listaPendientesCompletadas(false)
                break

            case '5':
                const ids = await mostrarListadoCheck(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break
            
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if(id !== '0') {
                    const ok = await confirmar(`¿Está seguro que desea ${'eliminarlo'.red}?`)
                    if(ok) {
                        tareas.borrarTarea(id)
                        console.log(`Tarea borrada ${'correctamente'.yellow}`)
                    }
                }
                break
        }

        guardarDB( tareas.listadoArr)

        await pausa()
    } while ( opt !== '0')
}

main()