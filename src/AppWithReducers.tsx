import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './state/todolists-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export  type FilterValueType = 'all' | 'active' | 'completed'

function AppWithReducers() {
    // BLL
    const todolistsID_1 = v1()
    const todolistsID_2 = v1()

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todolistsID_1, title: 'What to learn', filter: 'all'},
        {id: todolistsID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTotasksReducer] = useReducer(tasksReducer,{
        [todolistsID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistsID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Meat', isDone: false},
        ],
    })

    function removeTask(taskID: string, todoListID: string) {

        const action = removeTaskAC(taskID, todoListID);
        dispatchTotasksReducer(action);

    }
    function addTask(title: string, todoListID: string) {
        dispatchTotasksReducer(addTaskAC(title,todoListID));

    }
    function changeTaskStatus(taskID: string, newValue: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskID, newValue, todoListID);
        dispatchTotasksReducer(action);

    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const action = changeTaskTitleAC(taskID, title, todoListID);
        dispatchTotasksReducer(action);
    }



    function changeTodoListFilter(filter: FilterValueType, todoListID: string) {
        const action = changeTodoListFilterAC(filter, todoListID);
        dispatchToTodolistsReducer(action);
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        const action = changeTodoListTitleAC(title, todoListID);
        dispatchToTodolistsReducer(action);
    }
    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID);
        dispatchToTodolistsReducer(action);
        dispatchToTodolistsReducer(action)
    }
    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatchToTodolistsReducer(action);
        dispatchTotasksReducer(action)
        // }
        // setTodoLists([...todolists, newTodoList])
        // setTasks({...tasks, [newTodoListID]: []})
    }

// UI
    function getFilterTasks(tl: TodoListType) {
        switch (tl.filter) {
            case 'active':
                return tasks[tl.id].filter(t => !t.isDone)
            case 'completed':
                return tasks[tl.id].filter(t => t.isDone)
            default:
                return tasks[tl.id]
        }
    }

    const todoListComponents = todolists.map(tl => {
        const tasksForTodoList = getFilterTasks(tl)
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button
                        color={'inherit'}
                        variant={'outlined'}
                    >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );

}

export default AppWithReducers;
