import { useEffect} from "react";
 import styles from '../styles/Home.module.css';
 import { UseAddDeleteChangeTodos } from "../hooks/useAddDeleteChangeTodos";
 import { UseSortAndSearchTodos } from '../hooks/useSortAndSearchTodos'
 import UseGetTodos from '../hooks/useGetTodos'
 import { TiPencil, TiTrash, TiTickOutline } from "react-icons/ti";
import { useParams, Link } from "react-router-dom";
import { appRoutes, routesNames } from "../router/consts";
import { GoTriangleLeft } from "react-icons/go";

export const TodoPage = () => {
    const { id } = useParams();
    const selectedTodoId = id;

    const {todos, fetchTodos} = UseGetTodos();
    const {  
        deleteTodo, 
        changeTodo, 
        updateChangeTodos, 
        updateDeleteTodos, 
     } = UseAddDeleteChangeTodos();

    const { 
        displayedTodos,
        toggleEdit, 
        handleDelete, 
        handleTitleChange, 
        handleSave, 
        editingTodoId, 
    
 } = UseSortAndSearchTodos(todos, deleteTodo, changeTodo);

        
        useEffect(() => {
            fetchTodos();
        }, [  updateChangeTodos,updateDeleteTodos, fetchTodos]);

        

        return (

            <div className={styles.todoContainer}>
              

              <div>
                {displayedTodos.map((todo) => {
                  if (todo.id === selectedTodoId) {
                    return (
                      <div key={todo.id} className={styles.todoItem}>
                        {editingTodoId === todo.id ? (
                          <>
                            <input 
                              className={styles.toggleInput}
                              value={todo.title}
                              onChange={(e) => handleTitleChange(e, todo.id)}
                              placeholder="Новый текст для задачи"
                            />
                            <button className={styles.buttonSave} onClick={() => handleSave(todo.id)}>
                              <TiTickOutline className={styles.icon}/>
                            </button>
                          </>
                        ) : (
                          <>
                            
                <Link to={appRoutes[routesNames.HOME]}>
                  <button className={styles.buttonHome}><GoTriangleLeft className={styles.iconGo}/></button>
                </Link>
             
                            <span className={styles.todoText}>{todo.title}</span>
                            <button onClick={() => toggleEdit(todo.id)}><TiPencil className={styles.icon}/></button>
                            <button onClick={() => handleDelete(todo.id)}><TiTrash className={styles.icon}/></button>
                          </>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
}

