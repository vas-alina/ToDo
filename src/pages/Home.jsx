import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appRoutes, routesNames } from '../router/consts';
import styles from "../styles/Home.module.css"
import { TiSortAlphabeticallyOutline, TiSortNumericallyOutline, TiTick } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import UseGetTodos from '../hooks/useGetTodos'
import { UseAddDeleteChangeTodos } from '../hooks/useAddDeleteChangeTodos'
import { UseSortAndSearchTodos } from '../hooks/useSortAndSearchTodos'
import { GoTriangleRight } from "react-icons/go";
export const Home = () => {
    
    const [todo, setTodo] = useState('');
    
    const { todos, 
        fetchTodos, 
        isLoading, 
        error } = UseGetTodos();
    const { addTodo, 
        updateAddTodos } = UseAddDeleteChangeTodos();
    const { isSorted, 
        search, 
        handleSearchChange, 
        displayedTodos, 
        toggleSortMode, 
         } = UseSortAndSearchTodos(todos);
    
    useEffect(() => {
        fetchTodos();
    }, [  updateAddTodos, fetchTodos]);
    
    const handleAdd = () => {
        const newTodo = {  title: todo }; 
        addTodo(newTodo); 
        setTodo(""); 
    };
    const substringTitle = (title, maxLength) => {
        if (!title) return '';
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.addTodoContainer}>
                <input
                    className={styles.addTodoInput}
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Задача"
                />
                <button
                    className={styles.addTodoButton}
                    disabled={isLoading}
                    onClick={handleAdd}
                >
                  <TiTick />
                </button>
                {isLoading && <p>Загрузка...</p>}
                {error && <p className={styles.error}>Ошибка: {error}</p>}
            </div>

            <div className={styles.searchAndSortTodo}>
                <IoSearch className={styles.icon}/>
                    <input 
                        type="text" 
                        value={search} 
                        onChange={handleSearchChange} 
                        placeholder="Поиск по задачам"
                    />
                    <button onClick={toggleSortMode}>
                        {isSorted ? <TiSortNumericallyOutline className={styles.icon}/> 
                            : <TiSortAlphabeticallyOutline className={styles.icon} />}
                    </button>
            </div>

            <div className={styles.todosContainer}>
                <div>
                    {displayedTodos.map((todo) => (
                        <div key={todo.id} className={styles.todoItems}>
                            <span className={styles.todosText}>
                                {substringTitle (todo.title, 50)}
                            </span>
                            <Link to={appRoutes[routesNames.TODO_ITEM]
                                .replace(':id', todo.id)}>
                                    <button >
                                        <GoTriangleRight className={styles.icon} />
                                    </button>
                            </Link>
                        </div>
                    ))}
                </div>    
            </div>
        </div>
    );

}