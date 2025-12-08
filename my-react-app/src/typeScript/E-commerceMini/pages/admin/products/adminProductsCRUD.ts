import type { AdminProduct } from "../../../types/types.js";

const KEY = "admin_products";

export const getAdminProducts = (): AdminProduct[] =>
  JSON.parse(localStorage.getItem(KEY) || "[]");

export const saveAdminProducts = (products: AdminProduct[]) =>
  localStorage.setItem(KEY, JSON.stringify(products));

export const addAdminProduct = (product: AdminProduct) => {
  const products = getAdminProducts();
  products.push(product);
  saveAdminProducts(products);
};

export const getAdminProductById = (id: string): AdminProduct | undefined => {
  const products = getAdminProducts();
  return products.find((p) => p.id === id);
};

export const updateAdminProduct = (updated: AdminProduct) => {
  const products = getAdminProducts();
  const index = products.findIndex((p) => p.id === updated.id);
  if (index !== -1) {
    products[index] = updated;
    saveAdminProducts(products);
  }
};

export const deleteAdminProduct = (id: string) => {
  const products = getAdminProducts();
  const filtered = products.filter((p) => p.id !== id);
  saveAdminProducts(filtered);
};