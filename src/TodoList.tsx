import React, {useCallback} from 'react';
import {FilterValueType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

type PropsTodoListType = {
	filter: FilterValueType
	todoListID: string
	title: string
	tasks: Array<TaskType>
	addTask: (title: string, todoListID: string) => void
	removeTodoList: (todoListID: string) => void
	changeTodoListFilter: (filterValue: FilterValueType, todoListID: string) => void
	changeTodoListTitle: (title: string, todoListID: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
	changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
	removeTask: (taskID: string, todoListID: string) => void
}


export const TodoList = React.memo(function (props: PropsTodoListType) {
	const {filter} = props;

	const getFilterTasks = (filter: FilterValueType) =>{
		switch (filter) {
			case 'active':
				return props.tasks.filter(t => !t.isDone)
			case 'completed':
				return props.tasks.filter(t => t.isDone)
			default:
				return props.tasks
		}
	}

	const tasksJSXElement = getFilterTasks(props.filter).map(t => <Task
		task={t}
		changeTaskStatus={props.changeTaskStatus}
		changeTaskTitle={props.changeTaskTitle}
		removeTask={props.removeTask}
		todoListID={props.todoListID}
		key={t.id}
	/>)
	const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask, props.todoListID])
	const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListID), [props.changeTodoListTitle, props.todoListID])
	const removeTodoList = useCallback(() => props.removeTodoList(props.todoListID),[props.removeTodoList, props.todoListID])
	const onClickSetAllFilter = useCallback(() => props.changeTodoListFilter('all', props.todoListID), [props.changeTodoListFilter, props.todoListID]);
	const onClickSetActiveFilter = useCallback(() => props.changeTodoListFilter('active', props.todoListID), [props.changeTodoListFilter, props.todoListID]);
	const onClickSetCompletedFilter = useCallback(() => props.changeTodoListFilter('completed', props.todoListID), [props.changeTodoListFilter, props.todoListID]);

	// const removeTask = useCallback(() => props.removeTask(props.task.id, props.todoListID), [props.removeTask, props.task.id, props.todoListID])

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
})

