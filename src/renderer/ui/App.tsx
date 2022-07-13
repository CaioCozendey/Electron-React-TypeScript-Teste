import React, { useEffect, useState } from "react"
import { getDate } from "../../common/getDate"

const { ipcRedenrer } = require('electron')

import styles from "./App.module.scss"
import logo from "../public/logo192.png"
import {IntegerType} from "mongodb";

export const App: React.FC = () => {

    const [date, setDate] = useState(getDate())

    useEffect(() => {
        setTimeout(() => setDate(getDate()), 1000)
    }, [date, setDate])


    let tarefas: any[] = [];

    const nomeTarefa = document.querySelector("#nomeTarefa") as HTMLInputElement;
    const descrTarefa = document.querySelector("#descricaoTarefa") as HTMLInputElement;
    const formTarefa = document.querySelector("#formTarefas");
    const containerTarefas = document.querySelector("#tarefasContainer") as HTMLOutputElement;

    function renderizaTarefa(tarefa: any[]){
        containerTarefas.innerHTML = '';
        tarefa.map(t => {
            containerTarefas.innerHTML += ' ' +
                ' <div>' +
                    '<h2> ID Tarefa ${t.nome}</h2>'+
                    '<p> Nome: ${t.nome} </p>' +
                    '<p> Descrição: ${t.descricao}</p>' +
                    ' <button onClick={ "apagarTarefa()" }> Apagar </button>'+
                    ' <button> Editar </button>'+
                 '</div>'
        })
    }

    function apagarTarefa(id: IntegerType){
        const resultado = confirm('Tem certeza que deseja apagar a tarefa?');
        if (resultado){
            ipcRedenrer.send('deleta-tarefa', id);
        }
        return;
    }

    formTarefa?.addEventListener("submit", e => {
        e.preventDefault();

        const tarefa = {
            nome: nomeTarefa.value,
            descricao: descrTarefa.value
        }
        ipcRedenrer.send('Nova Tarefa', tarefa )
    });

    ipcRedenrer.on('Nova Tarefa criada', (e: string , args: string) => {
        const novaTarefa = JSON.parse(args)
        tarefas.push(novaTarefa);
        renderizaTarefa(tarefas)
        alert('Tarefa criada com sucesso!');
    });

    ipcRedenrer.envia('pega-parefas');

    ipcRedenrer.on('pega-tarefas', (e: string, args: string)  => {
        const tarefaRecebida = JSON.parse(args);
        tarefas = tarefaRecebida;

        renderizaTarefa(tarefas);
    });

    ipcRedenrer.on('tarefa-deletada-com-sucesso', (e: string, args: string) =>{
        const tarefaDeletada = JSON.parse(args)
        const novaTarefa = tarefas.filter(t => {
            return t.id !== tarefaDeletada.id
        })
        tarefas = novaTarefa;
        renderizaTarefa(tarefas)
    })

    return (
        <>
            <div className={styles.app}>
                <img
                    src={logo}
                    alt="React logo"/>
                <h1> Teste High Jump - Electron React TS</h1>
                <p> Código Criado por Caio Dias</p>
                <pre>{date}</pre>
            </div>
            <div className={styles.container}>
                <form id={ "formTarefas" }>
                    Tarefa: <input type={ "text" }
                                   placeholder={ "Nome da Tarefa" }
                                   id={ "nomeTarefa"}/>
                    Descrição: <input type={ "text" }
                                      placeholder={ "Descrição da Tarefa" }
                                      id={ "descricaoTarefa" }/>
                    <button className={styles.btn} type={ "submit" } id={ "btnAdicionar" }>
                        Adicionar
                    </button>
                     <a href={"Lista.tsx"} className={styles.btn} >
                        Lista de Tarefas
                    </a>
                </form>
            </div>

            <div className={ styles.tarefasContainer } id={ "tarefasContainer" }>

            </div>
        </>
    )
}