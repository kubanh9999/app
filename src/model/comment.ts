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
import { Product } from "./products";     // Nhập mô hình Product

@Table({
    tableName: "comments", // Đảm bảo tên bảng đúng
    timestamps: true,
})
export class Comment extends Model<Comment> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    product_id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    star!: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    content!: string;

    @CreatedAt
    @Column({
        type: DataType.DATE,
    })
    created_at!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
    })
    updated_at!: Date;
}
