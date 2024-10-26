import AxiosClient from "api/axios-client";
import { serialize } from "object-to-formdata";
import { Product } from "types/product";

export const ProductService = {
  getAll: async (): Promise<Product[]> => {
    try {
      return await AxiosClient.get("/product");
    } catch (error) {
      return [];
    }
  },
  getNew: async (): Promise<Product[]> => {
    try {
      return await AxiosClient.get("/product/new");
    } catch (error) {
      return [];
    }
  },
  giftwrap: async (): Promise<Product[]> => {
    try {
      return await AxiosClient.get("/product_types");
    } catch (error) {
      return [];  
    }
  },
  getGiftwrapId: async (id: string): Promise<Product | null> => { // Đảm bảo trả về một sản phẩm hoặc null
    try {
        const response = await AxiosClient.get(`/product_types/${id}`);
        
        return response as any; // Trả về null nếu không có dữ liệu
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return null; // Trả về null nếu có lỗi
    }
},

  getByCategoryId: async (categoryId: string): Promise<Product[]> => {
    return await AxiosClient.get(`/product/category/id/${categoryId}`);
  },

  getById: async (id: string): Promise<Product> => {
    return await AxiosClient.get(`/product/${id}`);
  },

  create: async (newProduct: Product): Promise<Product> => {
    return await AxiosClient.post(`/product`, serialize(newProduct), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update: async (updateProduct: Product): Promise<Product> => {
    return await AxiosClient.put(
      `/product/${updateProduct.id}`,
      serialize(updateProduct),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  delete: async (id: string): Promise<any> => {
    return await AxiosClient.delete(`/product/${id}`);
  },
};
