import React, { useEffect, useState } from "react"
import { getDate } from "../../common/getDate"


import styles from "./App.module.scss"
import logo from "../public/logo192.png"

export const App: React.FC = () => {

    const [date, setDate] = useState(getDate())

    useEffect(() => {
        setTimeout(() => setDate(getDate()), 1000)
    }, [date, setDate])



    const nomeTarefa = document.querySelector("#nomeTarefa") as HTMLInputElement;
    const descrTarefa = document.querySelector("#descricaoTarefa") as HTMLInputElement;
    //const btnAdicionar = document.querySelector("#btnAdicionar")
    const formTarefa = document.querySelector("#formTarefas");

    formTarefa?.addEventListener("submit", e => {
        e.preventDefault();
        alert((nomeTarefa.value, descrTarefa.value));

    });

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
        </>
    )
}