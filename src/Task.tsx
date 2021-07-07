import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from './EditableSpan';
import {Backspace} from '@material-ui/icons';
import {TaskType} from './App';

type TaskPropsType = {
	changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
	changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
	removeTask: (taskId: string, todoListID: string) => void
	task: TaskType
	todoListID: string
}
export const Task = React.memo((props: TaskPropsType) => {
	const removeTask = useCallback(() => props.removeTask(props.task.id, props.todoListID), [props.removeTask, props.task.id, props.todoListID])
	const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID), [props.changeTaskStatus, props.task.id, props.todoListID])
	const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.task.id, title, props.todoListID), [props.changeTaskTitle, props.task.id, props.todoListID])
	return (
		<div key={props.task.id}>
                    <span className={props.task.isDone ? 'is-done' : ''}>
                        <Checkbox
							size={'small'}
							color={'primary'}
							checked={props.task.isDone}
							onChange={changeTaskStatus}
						/>
                        <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
                    </span>
			{/*<span>{t.title}</span>*/}
			<IconButton onClick={removeTask} color={'secondary'}>
				<Backspace/>
			</IconButton>
		</div>
	)
})