const inquirer = require('inquirer');
require('colors');


const pause = [{
    type: 'input',
    name: 'enter',
    message: `Persione ${'ENTER'.green} para continuar`
}];

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar Tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tareas`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const listadoTareasBorrar=async(tareas =[])=>{
    const choices =tareas.map((tarea,i)=>{
        const idx=`${i+1}`.green;
        return {
            value:tarea.id,
            name:`${idx} ${tarea.desc}`
        }
    });
  
     choices.unshift({
         value:'0',
         name:`0.`.green
     });

    const preguntas =[
        {
            type:'list',
            name:'id',
            message:'¿Que tarea deseas Borrar?',
            choices//le agrego las opciones aqui para mandar solo el objeto preguntas
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}
const confirmar=async(message)=>{
    const question=[{
        type:'confirm',
        name:'ok',
        message
    }];

      const {ok} =await inquirer.prompt(question);
   return ok;
};


const inquireMenu = async () => {

    console.clear();
    console.log('======================'.green);
    console.log('   SELECCIONE UNA OPCION   '.white);
    console.log('======================\n'.green);
    const { option } = await inquirer.prompt(questions);
    return option;
}

const pausar = async () => {
    console.log('\n');
    await inquirer.prompt(pause);
}

const leerInput = async (mensaje) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if (value.length===0) {
                    return 'Ingrese un valor '
                }
                return true;
            }
        }

    ];

    const {desc}= await inquirer.prompt(question);
    return desc;
}


const listadoTareasCompletar=async(tareas =[])=>{
    const choices =tareas.map((tarea,i)=>{
        const {desc,completadoEn} =tarea;
        const idx=`${i+1}`.green;
        return {
            value:tarea.id,
            name:`${idx} ${desc}`,
            checked:(completadoEn)?true:false
        }
    });
  
 
    const preguntas =[
        {
            type:'checkbox',
            name:'ids',
            message:'Seleccione',
            choices//le agrego las opciones aqui para mandar solo el objeto preguntas
        }
    ]
    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    inquireMenu,
    pausar,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCompletar
}