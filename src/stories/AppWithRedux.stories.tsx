import React, {Component} from 'react';
import {ComponentMeta, ComponentStory, Meta, Story} from '@storybook/react';
import AppWithRedux from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';
import {Provider} from 'react-redux';
import {store} from '../state/store';

export default {
    title: 'ToDoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
    // argTypes: {},
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />



export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};