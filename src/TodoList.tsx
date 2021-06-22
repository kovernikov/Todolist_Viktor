import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Backspace, Delete} from '@material-ui/icons';

type PropsTodoListType = {
    filter: FilterValueType
    todoListID: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filterValue: FilterValueType, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}


function TodoList(props: PropsTodoListType) {
    const {filter} = props;

    const tasksJSXElement = props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
            return (
                <div key={t.id}>
                    <span className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            size={'small'}
                            color={'primary'}
                            checked={t.isDone}
                            onChange={changeTaskStatus}
                        />
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    </span>
                    {/*<span>{t.title}</span>*/}
                    <IconButton onClick={removeTask} color={'secondary'}>
                        <Backspace/>
                    </IconButton>
                </div>

            )
        }
    )
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const onClickSetAllFilter = () => props.changeTodoListFilter('all', props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter('active', props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListID)


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} color={'secondary'}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={() => props.removeTodoList(props.todoListID)}>X</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={{listStyle: 'none', padding: '0px'}}>
                {tasksJSXElement}
            </div>
            <div>
                <Button
                    size={'small'}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetAllFilter}>All
                </Button>
                <Button
                    style={{margin: '5px'}}
                    size={'small'}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetActiveFilter}>Active
                </Button>
                <Button
                    // style={{marginLeft: '3px'}}
                    size={'small'}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onClickSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;
