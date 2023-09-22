import colors from 'colors'
import readline from 'readline'

const mostrarMenu = () => {
    return new Promise( (resolve) => {
        console.clear()
        console.log('===================================='.blue)
        console.log('       Seleccione una opción'.blue)
        console.log('====================================\n'.blue)

        console.log(`${'1.'.blue} Crear tarea`)
        console.log(`${'2.'.cyan} Listar tareas`)
        console.log(`${'3.'.blue} Listar tareas completadas`)
        console.log(`${'4.'.cyan} Listar tareas pendientes`)
        console.log(`${'5.'.blue} Completar tarea(s)`)
        console.log(`${'6.'.cyan} Borrar tarea`)
        console.log(`${'0.'.blue} Salir \n`)

        const reLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        reLine.question('Seleccione una opción: ', (opt) => {
            console.log({ opt })
            reLine.close()
            resolve(opt)
        })
    })
}

const pausa = () => {
    return new Promise( (resolve) => {
        const reLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        reLine.question(`\nPresione ${'ENTER'.blue} para continuar\n`, (opt) => {
            reLine.close();
            resolve();
        })
    })
}

export { mostrarMenu, pausa }