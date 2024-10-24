import { Model, Column, PrimaryKey, AutoIncrement, DataType, Table } from 'sequelize-typescript';

@Table({
    tableName: Discount.TABLE_NAME, // Đặt tên bảng
})
export class Discount extends Model<Discount> {
    public static TABLE_NAME = "discounts"; // Đặt tên bảng
    public static ID = "id"; // Đặt tên cho ID
    public static CODE = "code"; // Đặt tên cho tên
    public static DISCOUNT_PERCENT = "discount_percent"; 
    public static DESCRIPTION = "description";
    public static VALID_FROM = "valid_form"; // Đặt tên cho valid_form
    public static VALID_END = "valid_end"; // Đặt tên cho valid_end

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false, // Không cho phép giá trị null
    })
    code!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false, // Không cho phép giá trị null
    })
    discount_percent!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true, // Có thể là null
    })
    description!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'valid_form' // Đảm bảo tên trường khớp
    })
    validFrom!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'valid_end' // Đảm bảo tên trường khớp
    })
    validEnd!: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        field: 'created_at' // Đảm bảo tên trường khớp
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        field: 'updated_at' // Sửa lỗi từ 'update_at' thành 'updated_at'
    })
    updatedAt!: Date; // Sửa tên trường từ 'updated_at' thành 'updatedAt' để khớp với tên cột
}
