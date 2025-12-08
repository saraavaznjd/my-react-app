export interface Product {
    id:number,
    title:string,
    price:number,
    description:string,
    category:string,
    image:string
}

export interface AdminProduct {
  id: string;             // uuid
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  createdAt?: number;
  updatedAt?: number;
}


export type ReportRange = "today" | "7days" | "30days" | "year" | "all";

export interface MonthlySale {
  month: string; // e.g. "2025-07"
  total: number;
}

export interface Reports {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  deliveredOrders: number;
  pendingOrders: number;
  monthlySales: MonthlySale[]; // sorted ascending by month
  recentOrders: {
    id: string;
    userId?: string;
    total: number;
    status: string;
    createdAt: number;
  }[];
}
