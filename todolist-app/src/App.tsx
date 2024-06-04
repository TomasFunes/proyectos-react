import List from "./components/list"
import { useReducer, useState } from "react";
import { ItemsContext, ItemsDispatchContext } from "./item-context";
import ListForm from "./components/list-form";
import Header from "./components/header";

type List = {
    id: number,
    title: string
}

type Item = {
    id: number,
    listId: number,
    title: string,
    description: string,
    dueDate: Date
}

type ListsAction = {
    type: string,
    list: List
}

type ItemsAction = {
    type: string,
    item: Item
}

function listsReducer(lists: List[], action: ListsAction) {
    switch (action.type) {
        case 'createdList': {
            return [...lists, action.list];
        }
        case 'updatedList': {

            return lists.map(list => {
                if(list.id === action.list.id) {
                    console.log('match');
                    return {
                        ...list,
                        title: action.list.title
                    }
                }
                return list;
            });
        }
        case 'deletedList': {
            console.log('list deleted');
            return lists.filter(list => list.id !== action.list.id);
        }
        default: {
            throw Error('Unkwon action: ' + action.type);
        }
    }
}

function itemsReducer(items: Item[], action: ItemsAction) {
    switch(action.type){
        case 'createdItem': {
            return [...items, action.item];
        }
        case 'updatedItem': {
            return items.map(item => {
                if(item.id === action.item.id) {
                    return {
                        ...item,
                        title: action.item.title,
                        description: action.item.description,
                        dueDate: new Date(action.item.dueDate)
                    }
                }
                return item;
            });
        }
        case 'deletedItem': {
            return items.filter(item => item.id !== action.item.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export default function App() {

    const initialLists = [
        {
            id: 1,
            title: "List 1"
        },
        {
            id: 2,
            title: "List 2"
        },
        {
            id: 3,
            title: "List 3"
        }

    ]

    const initialItems = [
        {
            id: 1,
            listId: 1,
            title: "Item 1",
            description: "A new Item",
            dueDate: new Date("06-02-2024")
        },
        {
            id: 1,
            listId: 1,
            title: "Item 2",
            description: "Another Item",
            dueDate: new Date("08-12-2024")
        }
    ]

    const [lists, dispatchLists] = useReducer(listsReducer, initialLists);
    const [items, dispatchItems] = useReducer(itemsReducer, initialItems);
    const [listCreation, setListCreation] = useState(false);
    

    function handleCreateList(event: any) {
        event.preventDefault();
        dispatchLists({
            type: 'createdList',
            list: {
                id: parseInt(crypto.randomUUID()),
                title:  event.target.title.value
            } 
        });

    }
    function handleUpdateList(event: any) {
        event.preventDefault();
        console.log(event.target.id);
        dispatchLists({
            type: 'updatedList',
            list: {
               id: parseInt(event.target.id.value),
               title: event.target.title.value 
            }

        });
    }

    function handleDeleteList(listId: number) {
        dispatchLists({
            type: 'deletedList',
            list: {
                id: listId,
                title: ""
            }

        });
    }


    return (
        <>
        <Header />
        <ItemsContext.Provider value={items}>
            <ItemsDispatchContext.Provider value={dispatchItems}>
                {lists.map(list => {
                    return <List 
                        id={list.id} 
                        title={list.title} 
                        onUpdate={handleUpdateList} 
                        onDelete={() => handleDeleteList(list.id)} 
                        />
                })}
                {listCreation ? 
                <>
                <ListForm onList={(event: any) => handleCreateList(event)} />
                <button onClick={() => setListCreation(!listCreation)}>Cancel</button>
                </>
                :
                <button onClick={() => setListCreation(!listCreation)}>Add new list</button>
                }
            </ItemsDispatchContext.Provider>
        </ItemsContext.Provider>
        </>
    );
}