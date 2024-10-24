import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";
import { User } from "./users";           // Nhập mô hình User
import { Discount } from "./discount"; 
@Table({
    tableName: "orders", // Tên bảng trong cơ sở dữ liệu
    timestamps: true,    // Sử dụng `created_at` và `updated_at`
})
export class Order extends Model<Order> {
    @Column({
        type: DataType.INTEGER,       // Kiểu dữ liệu là số nguyên
        autoIncrement: true,          // Tự động tăng
        primaryKey: true,             // Khóa chính
    })
    id!: number;

    @Column({
        type: DataType.STRING,        // Kiểu dữ liệu là chuỗi
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,        // Kiểu dữ liệu là chuỗi
        allowNull: false,
    })
    phone!: string;

    @Column({
        type: DataType.STRING,        // Kiểu dữ liệu là chuỗi
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,        // Kiểu dữ liệu là chuỗi
        allowNull: false,
    })
    address!: string;

    @Column({
        type: DataType.STRING,        // Trạng thái của đơn hàng
        allowNull: false,
    })
    status!: string;

    @Column({
        type: DataType.STRING,        // Phương thức thanh toán
        allowNull: false,
    })
    payment_method!: string;

    @ForeignKey(() => Discount)       // Khóa ngoại tham chiếu đến bảng giảm giá
    @Column({
        type: DataType.INTEGER,       // Số nguyên cho khóa ngoại
        allowNull: true,
    })
    discounts_id!: number;

    @ForeignKey(() => User)           // Khóa ngoại tham chiếu đến bảng người dùng
    @Column({
        type: DataType.INTEGER,       // Số nguyên cho khóa ngoại
        allowNull: false,
    })
    user_id!: number;

    @Column({
        type: DataType.FLOAT,         // Tổng số tiền là kiểu số thực
        allowNull: false,
    })
    total_amount!: number;

    @Column({
        type: DataType.STRING,        // Chuỗi token
        allowNull: true,
    })
    token!: string;

    @Column({
        type: DataType.DATE,          // Ngày đặt hàng
        allowNull: false,
    })
    order_date!: Date;

    @CreatedAt                       // Ngày tạo bản ghi
    @Column({
        type: DataType.DATE,
    })
    created_at!: Date;

    @UpdatedAt                       // Ngày cập nhật bản ghi
    @Column({
        type: DataType.DATE,
    })
    updated_at!: Date;
}
