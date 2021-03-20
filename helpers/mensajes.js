require('colors');

const mostrarMenu=()=>{

    return new Promise(resolve=>{
        console.clear();
        console.log('======================'.green);
        console.log('   SELECCIONE UNA OPCION   '.green);
        console.log('======================\n'.green);
    
        console.log(`${'1.'.green} Crear una tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tareas`);
        console.log(`${'6.'.green} Borrar Tareas`);
        console.log(`${'0.'.green} Salir\n`);
    
        const readline=require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
        //question para usar stdout
        readline.question('\nSeleccion una opcion ', (opt)=>{
            readline.close();
            resolve(opt);
        });


    });
   



}

const pausa=()=>{
    return new Promise(resolve=>{
        const readline=require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
        //question para usar stdout
        readline.question(`\nPersione ${'ENTER'.green} para continuar`, (opt)=>{
            readline.close();
            resolve();
        })
    });


};

module.exports={
    mostrarMenu,
    pausa
}