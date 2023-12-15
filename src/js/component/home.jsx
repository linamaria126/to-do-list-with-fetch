import React, { useState, useEffect } from "react";

/*Constante inicial sin Fetch */

const initialState = {
  label: "",
  done: false,
};

const endpoint =
  "https://playground.4geeks.com/apis/fake/todos/user/linamaria126";

const Home = () => {
  const [task, setTask] = useState(initialState);
  const [lisTasks, setLisTasks] = useState([]);

  /*función para traer datos de la bd con Fetch */

  const getTasks = async () => {
    const response = await fetch(endpoint);
    const dataTask = await response.json();
    console.log(dataTask);
    setLisTasks(dataTask);
  };

  /*función para adicionar tareas por teclado */
  function handleChange(event) {
    setTask({
      ...task,
      label: event.target.value,
    });
  }
  /*función que modifica la base de datos, adiciona la nueva tarea ingresada a la lista */
  const putTask = async () => {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify([...lisTasks, task]),
      headers: {
        "Content-Type": "application/json",
      },
    });
    /*para probar por consola que se está actualizando la lista de tareas */
    const updateTasks = await response.json();
    console.log(updateTasks);
  };
  /*Cada que doy un Enter  sobre el input, se guarda la nueva tarea a la lista, se actualiza y se vuelve a llamar la nueva base de datos */
  async function saveTask(event) {
    if (event.key == "Enter") {
      // setLisTasks([...lisTasks, task]);
      setTask(initialState);
      await putTask();
      await getTasks();
    }
  }

  /*Para borrar una tarea de la lista. */
  function deleteTask(index) {
    const newlist = lisTasks.filter((item, i) => i !== index);
    setLisTasks(newlist);
  }
  /*Estado que permite que cuando se recargue la página, se cargue la lista de tareas que tengo en mi base de datos*/
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="bg-info vh-100">
      <h1 className="text-center pt-5 text-secondary display-1 newFont">
        TO DO LIST
      </h1>
      {/*Input de Tareas*/}

      <div className="container p-5 bg-dark-subtle bg-secondary bg-gradient border border-secondary rounded-2">
        <div className="input-group flex-nowrap">
          <span
            className="input-group-text border border-secondary"
            id="addon-wrapping"
          >
            <i className="fa-regular fa-message"></i>
          </span>
          <input
            type="text"
            className="form-control border border-secondary"
            placeholder="Add your task"
            value={task.label}
            aria-label="Username"
            aria-describedby="addon-wrapping"
            onChange={handleChange}
            onKeyDown={saveTask}
          />
        </div>
      </div>

      {/*Card de lista de Tareas*/}

      <div className="container bg-body-secondary border border border-secondary p-2 rounded-2">
        <div className="card">
          {lisTasks.length <= 0 ? (
            <p className="text-center text-secondary newFont fw-bold">
              No tienes tareas disponibles
            </p>
          ) : (
            <p className="text-center text-secondary newFont fw-bold">{`Te faltan ${lisTasks.length} tareas por terminar`}</p>
          )}
          <ul className="list-group list-group-flush p-4 d-flex justify-content-between">
            {lisTasks.map((item, index) => {
              return (
                <div
                  className="d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <li className="list-group-item newFont w-100">
                    {item.label}
                  </li>
                  <div>
                    <button
                      className="btn btn-secondary bg-info"
                      type="button"
                      onClick={() => deleteTask(index)}
                    >
                      <span>
                        <i className="fa-solid fa-trash py-1"></i>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
