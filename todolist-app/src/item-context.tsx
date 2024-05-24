import { createContext } from "react";
import { Dispatch } from "react";

type Item = {
    id: number,
    listId: number,
    title: string,
    description: string,
    dueDate: Date
}

type ItemsAction = {
    type: string,
    item: Item
}

export const ItemsContext = createContext<Item[] | null>(null);
export const ItemsDispatchContext = createContext<Dispatch<ItemsAction> | null>(null);