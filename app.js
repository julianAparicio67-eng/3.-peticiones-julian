const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const tareas = [
    {
        titulo: "salir a caminar",
        descripcion: "sales a dar una vuelta por el parque",
        estado: "pendiente",
        pasos: 3
    },
    {
        titulo: "salir a saltar",
        descripcion: "sales por el parque",
        estado: "realizado",
        pasos: 1
    },
    {
        titulo: "estudiar JavaScript",
        descripcion: "practicar funciones y arreglos",
        estado: "pendiente",
        pasos: 4
    },
    {
        titulo: "hacer ejercicio",
        descripcion: "entrenar durante 30 minutos",
        estado: "realizado",
        pasos: 2
    },
    {
        titulo: "leer un libro",
        descripcion: "leer un capitulo antes de dormir",
        estado: "pendiente",
        pasos: 5
    }
];


app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.get('/tareas/pendientes', (req, res)=>{
    const tareasPendientes = tareas.filter(i => i.estado === "pendiente");
    res.json(tareasPendientes);
})

app.get('/tareas/realizadas', (req, res)=>{
    const tareasRealizadas = tareas.filter(i => i.estado === "realizado");
    res.json(tareasRealizadas);
})

app.delete('/tareas/:titulo', (req, res) => {
    const tituloBuscado = req.params.titulo;
        const index = tareas.findIndex(t => t.titulo === tituloBuscado);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Tarea no encontrada para eliminar" });
    }
    const tareaEliminada = tareas.splice(index, 1);
    res.json({
        mensaje: "Tarea eliminada con éxito",
        tarea: tareaEliminada[0]
    });
});

app.patch('/tareas/:titulo/estado', (req, res) => {
    const tituloBuscado = req.params.titulo;
        const index = tareas.findIndex(t => t.titulo === tituloBuscado);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }
    if (req.body.estado) {
        tareas[index].estado = req.body.estado;
    }
    res.json({
        mensaje: "Estado de la tarea actualizado con éxito",
        tarea: tareas[index]
    });
});

app.put('/tareas/:titulo', (req, res) => {
    const tituloBuscado = req.params.titulo;
    const index = tareas.findIndex(t => t.titulo === tituloBuscado);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Tarea no encontrada para actualizar" });
    }

    tareas[index] = {
        titulo: req.body.titulo || tareas[index].titulo,
        descripcion: req.body.descripcion || tareas[index].descripcion,
        estado: req.body.estado || tareas[index].estado,
        pasos: req.body.pasos || tareas[index].pasos
    };

    res.json({
        mensaje: "Tarea actualizada con éxito",
        tareaActualizada: tareas[index]
    });
});
app.put('/tareas/:titulo', (req, res)=>{
    const titulon = req.params.titulo;
    const is = tareas.findIndex(i => i.titulo === titulon)

})

app.get('/tareas/:titulo', (req, res)=>{
    const titulo = req.params.titulo;
    const tareaencontrada = tareas.find(
        t => t.titulo === titulo
    );
    if (!tareaencontrada){
        return res.status(404).send("tarea no encontrada");
    }
    res.json(tareaencontrada);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});