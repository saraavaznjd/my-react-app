import type { Order } from "./ordersSlice.js";

const KEY = "orders_v1";

export const getAllOrders = (): Order[] =>
  JSON.parse(localStorage.getItem(KEY) || "[]");

export const saveAllOrders = (orders: Order[]) =>
  localStorage.setItem(KEY, JSON.stringify(orders));

export const addOrder = (order: Order) => {
  const list = getAllOrders();
  list.unshift(order); //newest first
  saveAllOrders(list);
};

export const getOrderById = (id: string): Order | undefined =>
  getAllOrders().find((o) => o.orderId === id);

export const updateOrder = (updated: Order) => {
  const list = getAllOrders().map((o) => (o.orderId === updated.orderId ? updated : o));
  saveAllOrders(list);
};

export const deleteOrder = (id: string) => {
  const list = getAllOrders().filter((o) => o.orderId !== id);
  saveAllOrders(list);
};

export const getOrdersByUser = (userId?: string) =>
  (getAllOrders().filter((o) => (userId ? o.userId === userId : true)));
