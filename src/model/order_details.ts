import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";

// Đảm bảo rằng bạn đã import các mô hình cần thiết cho ForeignKey
import { Order } from './orders'; // Import mô hình Order
import { Product } from './products'; // Import mô hình Product

@Table({
    tableName: "order_details", // Tên bảng trong cơ sở dữ liệu
    timestamps: true,           // Sử dụng `created_at` và `updated_at`
})
export class OrderDetail extends Model<OrderDetail> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,        // Khóa chính
    })
    id!: number;

    @ForeignKey(() => Order)    // Khóa ngoại tham chiếu đến bảng đơn hàng
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    order_id!: number;

    @ForeignKey(() => Product)   // Khóa ngoại tham chiếu đến bảng sản phẩm
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    product_id!: number;

    @Column({
        type: DataType.INTEGER,    // Số lượng sản phẩm
        allowNull: false,
    })
    quantity!: number;

    @Column({
        type: DataType.FLOAT,      // Giá của sản phẩm
        allowNull: false,
    })
    price!: number;

    @Column({
        type: DataType.FLOAT,      // Tổng giá
        allowNull: false,
    })
    total_price!: number;

    @CreatedAt                   // Ngày tạo bản ghi
    @Column({
        type: DataType.DATE,
    })
    created_at!: Date;

    @UpdatedAt                   // Ngày cập nhật bản ghi
    @Column({
        type: DataType.DATE,
    })
    updated_at!: Date;
}
