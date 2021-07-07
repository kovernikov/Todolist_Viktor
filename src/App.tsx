import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodoList} from './TodoList';

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

function App() {
	// BLL
	const todolistsID_1 = v1()
	const todolistsID_2 = v1()

	const [todolists, setTodoLists] = useState<Array<TodoListType>>([
		{id: todolistsID_1, title: 'What to learn', filter: 'all'},
		{id: todolistsID_2, title: 'What to buy', filter: 'all'},
	])
	const [tasks, setTasks] = useState<TasksStateType>({
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
		tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
		setTasks({...tasks})
	}

	function addTask(title: string, todoListID: string) {
		const newTask: TaskType = {
			id: v1(),
			title,
			isDone: false,
		}
		const copyTasks = {...tasks}
		copyTasks[todoListID] = [newTask, ...tasks[todoListID]]
		setTasks(copyTasks)

		// const newTasks = [newTask, ...tasks]
		// setTasks(newTasks)
		// setTasks([{id: v1(), title, isDone: false},...tasks])
	}

	function changeTaskStatus(taskID: string, newValue: boolean, todoListID: string) {

		// let task = tasks.find(t => t.id === taskId)
		// if (task) {
		//     task.isDone = isDone;
		// }
		// setTasks([...tasks])

		const copyTasks = {...tasks}
		copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newValue} : t)
		setTasks(copyTasks)

		// const updatedTasks = tasks.map(t => t.id === taskId ? {...t, isDone: newValue} : t)
		// setTasks(updatedTasks)
	}

	function changeTaskTitle(taskID: string, title: string, todoListID: string) {
		const copyTasks = {...tasks}
		copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
		setTasks(copyTasks)
	}


	function changeTodoListFilter(filter: FilterValueType, todoListID: string) {
		setTodoLists(todolists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
	}

	function changeTodoListTitle(title: string, todoListID: string) {
		setTodoLists(todolists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
	}

	function removeTodoList(todoListID: string) {
		setTodoLists(todolists.filter(tl => tl.id !== todoListID))
		const copyTasks = {...tasks}
		delete copyTasks[todoListID]
		setTasks(copyTasks)
	}

	function addTodoList(title: string) {
		const newTodoListID = v1()
		const newTodoList: TodoListType = {
			id: newTodoListID,
			title,
			filter: 'all'
		}
		setTodoLists([...todolists, newTodoList])
		setTasks({...tasks, [newTodoListID]: []})
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

export default App;
