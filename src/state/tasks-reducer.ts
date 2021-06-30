import {TasksStateType, TaskType, TodoListType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';


export type RemoveTaskAT = {
	type: 'REMOVE-TASK'
	taskId: string
	todoListId: string
}
type addTaskAT = {
	type: 'ADD-TASK'
	title: string,
	todolistId: string,
}
type changeTaskStatusAT = {
	type: 'CHANGE-TASK-STATUS',
	taskId: string,
	isDone: boolean,
	todoListId: string
}
type changeTaskTitleAT = {
	type: 'CHANGE-TASK-TITLE',
	taskId: string,
	title: string,
	todoListId: string
}

type ActionType = RemoveTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodoListAT | RemoveTodoListAT;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const todolistTasks = state[action.todoListId];
			todolistTasks.filter(task => task.id !== action.taskId)
			return {...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)};
		}
		case 'ADD-TASK': {
			const newTask: TaskType = {
				id: v1(),
				title: action.title,
				isDone: false
			}
			return {
				...state,
				[action.todolistId]: [newTask, ...state[action.todolistId]]
			}
		}
		case 'CHANGE-TASK-STATUS':
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map(task => {
					if (task.id === action.taskId) {
						return {...task, isDone: action.isDone}
					} else {
						return task
					}
					// return  task.id === action.taskId ? {...task, isDone: action.isDone} : task
				})
			}
		case 'CHANGE-TASK-TITLE': {
			const copyTasks = {...state}
			copyTasks[action.todoListId] = state[action.todoListId].map(task => task.id === action.taskId ? {
				...task,
				title: action.title
			} : task)
			return copyTasks
		}
		case 'ADD-TODOLIST':
			return {
				...state,
				[action.todolistId]: []
			}
		case 'REMOVE-TODOLIST':
			let newState = {...state}
			delete newState[action.todoListID]
			return newState
		default:
			return state;
	}
}
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskAT => {
	return {type: 'REMOVE-TASK', taskId: taskId, todoListId}
}
export const addTaskAC = (title: string, todolistId: string,): addTaskAT => {
	return {type: 'ADD-TASK', title: title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): changeTaskStatusAT => {
	return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): changeTaskTitleAT => {
	return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId}
}
