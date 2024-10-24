import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    tableName: Product.PRODUCT_TABLE_NAME, // Sử dụng PRODUCT_TABLE_NAME từ class Product
})
export class Product extends Model<Product> { // Đổi tên class thành Product
    public static PRODUCT_TABLE_NAME = "products"; // Đặt tên bảng
    public static PRODUCT_ID = "id"; // Đặt tên cho ID
    public static PRODUCT_NAME = "name"; // Đặt tên cho tên
    public static PRODUCT_DESCRIPTION = "description"; // Đặt tên cho mô tả
    public static PRODUCT_CATEGORY_ID = "category_id"; // Đặt tên cho khóa ngoại của category
    public static PRODUCT_TYPE_ID = "product_type_id"; // Đặt tên cho khóa ngoại của product_type
    public static PRODUCT_PRICE = "price"; // Đặt tên cho giá
    public static PRODUCT_DISCOUNT = "discount"; // Đặt tên cho giảm giá
    public static PRODUCT_STOCK = "stock"; // Đặt tên cho số lượng tồn kho
    public static PRODUCT_IMAGE = "image"; // Đặt tên cho hình ảnh

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
        type: DataType.INTEGER, // Giả định rằng 'category_id' là số nguyên
       field: 'category_id'
    })
    categoryId!: number;
    

    @Column({
        type: DataType.INTEGER,
        field: 'product_type_id' // Giả định rằng 'product_type_id' là số nguyên
    })
    productTypeId!: number;
 

    @Column({
        type: DataType.FLOAT, // Giả định rằng 'price' là số thực
    })
    price!: number;

    @Column({
        type: DataType.FLOAT, // Giả định rằng 'discount' là số thực
    })
    discount!: number;

    @Column({
        type: DataType.INTEGER, // Giả định rằng 'stock' là số nguyên
    })
    stock!: number;

    @Column({
        type: DataType.STRING, // Giả định rằng 'description' là chuỗi
    })
    description!: string;

    @Column({
        type: DataType.STRING, // Giả định rằng 'image' là chuỗi chứa đường dẫn ảnh
    })
    image!: string;

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
