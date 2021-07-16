import AddItemForm from '../AddItemForm';
import React, {Component} from 'react';
import { action } from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import EditableSpan from '../EditableSpan';

export default {
	title: 'ToDoList/EditableSpan',
	component: EditableSpan,
	argTypes: {
		changeTitle: {
			description: 'Value EditableSpan change'
		},
		title: {
			defaultValue: 'HTML',
			description: 'Start value EditableSpan'
		}
	}
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
	changeTitle: action('Value EditableSpan change')
}