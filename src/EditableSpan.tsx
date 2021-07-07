import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), [])
    const onEnterOffEditMode = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }, [])

    return (
        editMode
            ? <TextField
                value={title}
                autoFocus  /*или autoFocus={true}*/
                onBlur={offEditMode}
                onChange={onChangeTitle}
                onKeyPress={onEnterOffEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

export default EditableSpan;
