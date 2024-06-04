'use client';
import { useContext, useState } from "react";
import Config from "./config";
import { ItemsDispatchContext } from "../item-context";
import ItemForm from "./item-form";

type Item = {
    id: number,
    listId: number,
    title: string,
    description: string,
    dueDate: Date
}

export default function ListItem (props: Item) {

    const [editMode, setEditMode] = useState(false);
    const dispatch = useContext(ItemsDispatchContext);


    function handleUpdateItem(event: any, itemId: number) {
        event.preventDefault();
        if(dispatch) {
            dispatch({
                type: 'updatedItem',
                item: {
                    id: itemId,
                    listId: props.listId,
                    title: event.target.title.value,
                    description: event.target.description.value,
                    dueDate: event.target.dueDate.value
                }

            });
        }

        setEditMode(false);
    }

    function handleDeleteItem(id: number) {
        if(dispatch) {
            dispatch({
                type: 'deletedItem',
                item: {
                    id,
                    listId: props.listId,
                    title: props.title,
                    description: props.description,
                    dueDate: props.dueDate
                }
            });
        }
    }



    return (
        <>
            <Config onEdit={() => setEditMode(!editMode)} onDelete={() => handleDeleteItem(props.id)} />
            {editMode ?
                <>
                <ItemForm item={props} onItem={(event) => handleUpdateItem(event, props.id)}/>
                <button onClick={() => setEditMode(!editMode)}>Cancel</button>
                </>
                :
                <div className="list-item">
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                    <p>Due: {props.dueDate.toLocaleDateString()}</p>
                </div>
            }
        </>

    );
}