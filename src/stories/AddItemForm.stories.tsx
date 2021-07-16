import AddItemForm from '../AddItemForm';
import React, {Component} from 'react';
import { action } from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'ToDoList/AddItemForm ',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked'
        }
    }
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
    addItem: action('Button clicked')
}