require('colors');

const { guardarData, leerData } = require('./helpers/guardarArchivo');
const { inquireMenu, pausar, leerInput, listadoTareasBorrar, confirmar,listadoTareasCompletar } = require('./helpers/inquireMenu');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerData();

    if (tareasDb) {
        tareas.cargarTareas(tareasDb);
    }


    do {
        opt = await inquireMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
                case '5':
                   const ids= await listadoTareasCompletar(tareas.listadoArr);
                   tareas.toggleCompletadas(ids);
                   console.log({ids});
                    break;
                case '6':
                const id= await listadoTareasBorrar(tareas.listadoArr);
                if (id!='0') {
                    const ok =await confirmar('¿Estas seguro ?');
                    if (ok) {
                        tareas.borrarTareas(id);
                        console.log('Tarea borrada exitosamente');
                    }
                }
  
                break;
            default:
                break;
        }
        guardarData(tareas.listadoArr);

        await pausar();

    } while (opt !== '0');

    // pausa();
}

main();