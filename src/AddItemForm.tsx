import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddItem()
        }
    }
    const onClickAddItem = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addItem(validatedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const errorMessage = error
        ? <div style={{color: 'red'}}>Title is required!</div>
        : null

    return (
        <div>
            <TextField
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}

                label={'Title'}
                error={error}
                helperText={error && 'Title is required!'}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeTitle}*/}
            {/*    onKeyPress={onKeyPressAddItem}*/}
            {/*    className={error ? "error" : ""}*/}
            {/*/>*/}
            {/*<IconButton onClick={onClickAddItem} color={"primary"}>*/}
            {/*    <AddBox/>*/}
            {/*</IconButton>*/}


            <IconButton onClick={onClickAddItem} color={'primary'}>
                <AddCircle/>
            </IconButton>

            {/*{errorMessage}*/}
            {/*{error && <div style={{color: "red"}}>Title is required!</div>}*/}
        </div>
    )
}

export default AddItemForm;
