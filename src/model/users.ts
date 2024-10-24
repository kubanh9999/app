import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";

@Table({
    tableName: "users",    // Tên bảng trong cơ sở dữ liệu
    timestamps: true,      // Sử dụng `created_at` và `updated_at`
})
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,       // Kiểu dữ liệu số nguyên
        autoIncrement: true,          // Tự động tăng
        primaryKey: true,             // Khóa chính
    })
    id!: number;

    @Column({
        type: DataType.STRING,        // Kiểu dữ liệu chuỗi
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,        // Email của người dùng
        allowNull: false,
        unique: true,                 // Email phải là duy nhất
    })
    email!: string;

    @Column({
        type: DataType.STRING,        // Mật khẩu đã mã hóa
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING,        // Số điện thoại của người dùng
        allowNull: false,
    })
    phone!: string;

    @Column({
        type: DataType.STRING,        // Địa chỉ của người dùng
        allowNull: false,
    })
    address!: string;

    @Column({
        type: DataType.STRING,        // Vai trò (admin/user)
        allowNull: false,
    })
    role!: string;

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

    @Column({
        type: DataType.STRING,        // Trạng thái tài khoản (ví dụ: active, inactive)
        allowNull: false,
    })
    status!: string;
}
