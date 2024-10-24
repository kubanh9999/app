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
import { Product } from './products'; // Import mô hình Product

@Table({
    tableName: "product_images", // Tên bảng trong cơ sở dữ liệu
    timestamps: true,            // Sử dụng `created_at` và `updated_at`
})
export class ProductImage extends Model<ProductImage> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,         // Khóa chính
    })
    id!: number;

    @ForeignKey(() => Product)    // Khóa ngoại tham chiếu đến bảng sản phẩm
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    product_id!: number;

    @Column({
        type: DataType.STRING,      // Kiểu dữ liệu cho đường dẫn hoặc tên hình ảnh
        allowNull: false,
    })
    image!: string;

    @CreatedAt                    // Ngày tạo bản ghi
    @Column({
        type: DataType.DATE,
    })
    created_at!: Date;

    @UpdatedAt                    // Ngày cập nhật bản ghi
    @Column({
        type: DataType.DATE,
    })
    updated_at!: Date;
}
