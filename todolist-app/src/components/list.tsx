import ListItem from "./list-item";
import Config from "./config";
import { FormEventHandler, MouseEventHandler, useContext } from "react";
import { useState } from "react";
import { ItemsContext, ItemsDispatchContext } from "../item-context";
import ListForm from "./list-form";
import ItemForm from "./item-form";


export default function List (props: {
    id: number,
    title: string,
    onUpdate: FormEventHandler<HTMLFormElement>,
    onDelete: MouseEventHandler<HTMLButtonElement>,
}) {

    const [editMode, setEditMode] = useState(false);
    const [itemCreation, setItemCreation] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const items = useContext(ItemsContext);
    const dispatch = useContext(ItemsDispatchContext);


    function handleCreateItem(event: any) {
        event.preventDefault();
        if(dispatch) {
            dispatch({
                type: 'createdItem',
                item: {
                    id: parseInt(crypto.randomUUID()),
                    listId: props.id,
                    title: event.target.title.value,
                    description: event.target.description.value,
                    dueDate: new Date(event.target.dueDate.value)
                }

            });
        }
    }
    
    return (
        <div className="list">
            <Config onEdit={() => setEditMode(!editMode)} onDelete={props.onDelete}/>
            { editMode ? 
            <>
            <ListForm list={{id: props.id, title: props.title}} onList={(event) => props.onUpdate(event)} />
            <button onClick={() => setEditMode(!editMode)}>Cancel</button>
            </>
            :
            <h2 onClick={() => setIsOpen(!isOpen)}>{props.title}</h2>
            }
            {isOpen && items?.filter(item => item.listId === props.id)
            .map((item) => {
                return (
                <ListItem 
                    id={item.id}
                    listId={item.listId}
                    title={item.title}
                    description={item.description}
                    dueDate={item.dueDate}
                />
                );
            })
            }
            {isOpen && (itemCreation? 
            <>
            <ItemForm onItem={(event) => handleCreateItem(event)} />
            <button onClick={() => setItemCreation(!itemCreation)}>Cancel</button>
            </>
            :
            <button onClick={() => setItemCreation(!itemCreation)}>Add Item</button>)}
        </div>
    );

}
