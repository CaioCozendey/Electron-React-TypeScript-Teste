import {model, Schema} from "mongoose";

const novaTarefaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
});

module.exports = model('Tarefa', novaTarefaSchema)