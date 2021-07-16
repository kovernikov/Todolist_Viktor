
import React, {Component} from 'react';
import { action } from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../Task';
import {FilterValueType, TaskType} from '../App';

export default {
    title: 'ToDoList/Task',
    component: Task,
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle:'),
        removeTask: action('removeTask'),
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>;

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    task: {id:'11', isDone: true, title: 'JS'},
    todoListID: '1',
}

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    task: {id:'12', isDone: false, title: 'JS'},
    todoListID: '1',
}