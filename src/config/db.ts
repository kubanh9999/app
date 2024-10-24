
import * as dotenv from "dotenv";
import { log } from "console";
import { Category } from "../model/categories";
import { Discount} from "../model/discount";
import { Product} from "../model/products";
import { User} from "../model/users";
import { Order} from "../model/orders";
import { Comment} from "../model/comment";
import { OrderDetail } from "../model/order_details";
import { ProductType} from "../model/product_types";
import { Shipment} from "../model/shippment";


import { Sequelize } from "sequelize-typescript";


// Load environment variables from .env file
dotenv.config();

class Database {
    public sequelize: Sequelize | undefined;
    private MYSQL_DB = process.env.MYSQL_DB as string; // Database name
    private MYSQL_HOST = process.env.MYSQL_HOST as string; // Hostname
    private MYSQL_PORT = process.env.MYSQL_PORT as unknown as number; // Port
    private MYSQL_USER = process.env.MYSQL_USER as string; // Username
    private MYSQL_PASSWORD = process.env.MYSQL_PASSWORD as string; // Password

    constructor() {
        this.connect(); // Call connect without console.log
    }

    private async connect() {
        log(this.MYSQL_DB)
        this.sequelize = new Sequelize({
            database: this.MYSQL_DB,
            username: this.MYSQL_USER,
            password: this.MYSQL_PASSWORD,
            host: this.MYSQL_HOST,
            port: this.MYSQL_PORT,
            dialect: "mysql", // Ensure you are using MySQL
            models: [Category,Discount,Product,User,Order,Comment,OrderDetail,ProductType,Shipment] 
          
        });

        try {
            await this.sequelize.authenticate();
            console.log("Kết nối thành công"); // Connection successful
        } catch (err) {
            console.error("Kết nối thất bại", err); // Connection failed
        }
    }
}

export default Database; // Export the Database class
