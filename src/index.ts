import express, { Application, Request, Response } from "express"; // Import express và các type cần thiết
import Database from "./config/db";
import { Category } from "./model/categories"; // Đổi tên từ categories thành Category
import { Discount } from "./model/discount";
import { Product } from "./model/products"; // Chỉ cần import một lần
import { User } from "./model/users";
import { Order } from "./model/orders";
import { Comment } from "./model/comment";
import { OrderDetail } from "./model/order_details";
import { ProductType} from "./model/product_types";
import { Shipment} from "./model/shippment";

import cors from "cors"

class App {
    public app: Application;

    constructor() {
        this.app = express(); // Khởi tạo express
        this.app.use(cors());
        this.routes();
        this.databaseSync();
    }

    protected async databaseSync(): Promise<void> {
        const db = new Database();
        try {
            await db.sequelize?.sync(); // Chờ đồng bộ hóa cơ sở dữ liệu
            console.log("Cơ sở dữ liệu đã được đồng bộ hóa");
        } catch (error) {
            console.error("Lỗi khi đồng bộ hóa cơ sở dữ liệu:", error);
        }
    }

    protected routes(): void {
        this.app.route("/").get((__req: Request, res: Response) => {
            res.send("dcmm");
        });

        // Định nghĩa route trước khi khởi động server
        this.app.get(`${process.env.PREFIX}/categories`, async (_req: Request, res: Response) => {
            try {
                const categories = await Category.findAll(); // Lấy tất cả danh mục
                res.json(categories);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });

        this.app.get(`${process.env.PREFIX}/discount`, async (_req: Request, res: Response) => {
            try {
                const discount = await Discount.findAll(); // Lấy tất cả giảm giá
                res.json(discount);
            } catch (error) {
                console.error("Lỗi khi lấy giảm giá:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });

     this.app.get(`${process.env.PREFIX}/productByCategories`, async (_req: Request, res: Response) => {
    try {
        const categoryId = parseInt(_req.query.categoryId as string); // Lấy ID danh mục từ query string
        console.log(categoryId);
        
        const filteredProducts = await Product.findAll({
            where: {
                categoryId: categoryId // Lọc sản phẩm theo categoryId
            }
        });
        res.json(filteredProducts);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
});
        this.app.get(`${process.env.PREFIX}/product/new`, async (_req: Request, res: Response) => {
            try {
                const newProducts = await Product.findAll({
                        order: [['createdAt', 'DESC']], // Sắp xếp theo `createdAt` giảm dần
                        limit: 4,  
                    }); // Lấy tất cả sản phẩm
                    res.json(newProducts);
                } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });
        this.app.get(`${process.env.PREFIX}/users`, async (_req: Request, res: Response) => {
            try {
                const user = await User.findAll(); // Lấy tất cả sản phẩm
                res.json(user);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });
        this.app.get(`${process.env.PREFIX}/orders`, async (_req: Request, res: Response) => {
            try {
                const orders = await Order.findAll(); // Lấy tất cả sản phẩm
                res.json(orders);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });
        this.app.get(`${process.env.PREFIX}/comments`, async (_req: Request, res: Response) => {
            try {
                const comment = await Comment.findAll(); // Lấy tất cả sản phẩm
                res.json(comment);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });
        this.app.get(`${process.env.PREFIX}/order_details`, async (_req: Request, res: Response) => {
            try {
                const order_details = await OrderDetail.findAll(); // Lấy tất cả sản phẩm
                res.json(order_details);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });
        this.app.get(`${process.env.PREFIX}/product_types`, async (_req: Request, res: Response) => {
            try {
                const product_types = await ProductType.findAll(); // Lấy tất cả sản phẩm
                res.json(product_types);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });
         this.app.get(`${process.env.PREFIX}/product_types`, async (_req: Request, res: Response) => {
            try {
                const product_types = await ProductType.findAll(); // Lấy tất cả sản phẩm
                res.json(product_types);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });
      
        
        this.app.get(`${process.env.PREFIX}/product_types/:id`, async (req: Request, res: Response) => {
            const { id } = req.params;
            try {
                const product_type = await ProductType.findByPk(id);// Lấy tất cả sản phẩm
                res.json(product_type);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });
        this.app.get(`${process.env.PREFIX}/shipment`, async (_req: Request, res: Response) => {
            try {
                const shipment = await Shipment.findAll(); // Lấy tất cả sản phẩm
                res.json(shipment);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                res.status(500).json({ error: "Lỗi server" });
            }
        });
    }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log('Server started successfully on port', port); // Thông báo cổng đã khởi động
});
