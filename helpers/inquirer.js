import colors from 'colors'
import inquirer from 'inquirer'

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.blue}. Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.blue}. Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.blue}. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.blue}. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.blue}. Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.blue}. Borrar tarea(s)`
            },
            {
                value: '0',
                name: `${'0'.blue}. Salir`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear()
    console.log('===================================='.blue)
    console.log('       Seleccione una opción'.yellow)
    console.log('====================================\n'.blue)

    const { opcion } = await inquirer.prompt(preguntas)

    return opcion
}

const pausa = async () => {
    const preguntaPausa = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.blue} para cotinuar`
        }
    ]

    console.log('\n')
    await inquirer.prompt(preguntaPausa)    
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if( value.length === 0 ) {
                    return 'Ingrese un valor'
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}

const listadoTareasBorrar = async(tareas) => {
    console.log()

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.blue

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.blue + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas)
    return id
}

const confirmar = async(message) => {
    const preguntas = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(preguntas)
    return ok
}

const mostrarListadoCheck = async(tareas) => {
    console.log()

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.blue

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.complementosEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta)
    return ids
}

export {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheck} 