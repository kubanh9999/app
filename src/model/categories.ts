import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    tableName: Category.CATEGORY_TABLE_NAME, // Sử dụng CATEGORY_TABLE_NAME từ class Category
})
export class Category extends Model<Category> { // Đổi tên class thành Category
    public static CATEGORY_TABLE_NAME = "categories"; // Đặt tên bảng
    public static CATEGORY_ID = "id"; // Đặt tên cho ID
    public static CATEGORY_NAME = "name"; // Đặt tên cho tên
    public static CATEGORY_DESCRIPTION = "description"; // Đặt tên cho mô tả

    @PrimaryKey // Đánh dấu khóa chính
    @AutoIncrement // Tự động tăng
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        type: DataType.STRING, // Giả định rằng 'name' là chuỗi
    })
    name!: string;

    @Column({
        type: DataType.STRING, // Giả định rằng 'description' là chuỗi
    })
    description!: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW, // Tự động thiết lập created_at là ngày hiện tại
        field: 'created_at'
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW, // Tự động thiết lập updated_at là ngày hiện tại
        field: 'updated_at'
    })
    updatedAt!: Date;
}
