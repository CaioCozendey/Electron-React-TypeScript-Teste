import React, { useEffect, useState } from "react"
import { getDate } from "../../common/getDate"

import styles from "./App.module.scss"
import logo from "../public/logo192.png"

export const App: React.FC = () => {

  const [date, setDate] = useState(getDate())

  useEffect(() => {
    setTimeout(() => setDate(getDate()), 1000)
  }, [date, setDate])

    function adiciona() {
        return undefined;
    }

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
              Tarefa <input type={"text"} />
              Descrição <input type={"text"} />
              <button className={styles.addBtn} type={"submit"} onClick={adiciona()}> Adicionar </button>
              <button className={styles.addBtn}> Lista de Tarefas </button>
          </div>
      </>
  )
}
