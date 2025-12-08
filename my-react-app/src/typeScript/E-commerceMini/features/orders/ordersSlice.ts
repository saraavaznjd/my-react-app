import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import {
    getAllOrders,
    saveAllOrders,
    addOrder as svcAdd,
    updateOrder as svcUpdate,
    deleteOrder as svcDelete,
} from "./ordersServices.js";

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "canceled";

export interface OrderItem {
    id: number,
    title: string,
    price: number,
    quantity: number,
    image?: string
}

export interface Order {
    orderId: string,
    userId?: string,
    total: number,
    items: OrderItem[],
    status: OrderStatus,
    createdAt: number,
    updatedAt?: number
}

export interface OrderState {
    orders: Order[]
}

const initialState: OrderState = {
    orders: getAllOrders()
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: ({
        refreshOrders: (state) => {
            state.orders = getAllOrders();
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            svcAdd(action.payload);
            state.orders = getAllOrders();
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            svcUpdate(action.payload);
            state.orders = getAllOrders();
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            svcDelete(action.payload);
            state.orders = getAllOrders();
        },
    })
})

export const { addOrder, updateOrder, deleteOrder, refreshOrders } = ordersSlice.actions;
export default ordersSlice.reducer