import {TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: string
    todoListID: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}

export type ActionType = RemoveTodoListAT | ChangeTodoListFilterAT | AddTodoListAT | ChangeTodoListTitleAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID);
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        default:
            return todoLists
    }
}
 export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID: todoListID
    }
 }
export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId: v1(),
    }
};

export const changeTodoListFilterAC = (filter: string, todoListID: string): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter: filter,
        todoListID: todoListID,
    }
};

export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        todoListID: todoListID,
    }
}
