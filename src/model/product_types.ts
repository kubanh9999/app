import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";

@Table({
    tableName: "product_types", // Tên bảng trong cơ sở dữ liệu
    timestamps: true,           // Sử dụng `created_at` và `updated_at`
})
export class ProductType extends Model<ProductType> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,        // Khóa chính
    })
    id!: number;

    @Column({
        type: DataType.STRING,    // Kiểu dữ liệu cho tên loại sản phẩm
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,     // Kiểu dữ liệu cho đường dẫn hoặc tên hình ảnh
        allowNull: true,           // Cho phép null nếu không có hình ảnh
    })
    image!: string;

    @CreatedAt                   // Ngày tạo bản ghi
    @Column({
        type: DataType.DATE,
        field: 'created_at'      // Đảm bảo trường trong DB là 'created_at'
    })
    createdAt!: Date;            // Đổi tên trường thành 'createdAt' cho tính nhất quán

    @UpdatedAt                   // Ngày cập nhật bản ghi
    @Column({
        type: DataType.DATE,
        field: 'updated_at'      // Đảm bảo trường trong DB là 'updated_at'
    })
    updatedAt!: Date;            // Đổi tên trường thành 'updatedAt' cho tính nhất quán
}
