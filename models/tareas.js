const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTareas(id=''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareas(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        //apunta a la tarea
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {

        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} ::  ${estado}`);
        });

    }

    listarPendientesCompletadas(completadas = true) {
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} ::  ${completadoEn}`.green);
                }
            } else if (!completadoEn) {
                contador += 1;
                console.log(`${contador.toString().red}. ${desc} ::  ${estado}`);

            }

        });

    }

    toggleCompletadas(ids=[]){
        ids.forEach(id => {
            const tarea =this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn=new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn=null;
            }
        });
    }

}

module.exports = Tareas;