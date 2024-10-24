import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";

@Table({
    tableName: "shipments", // Tên bảng trong cơ sở dữ liệu
    timestamps: true,       // Sử dụng `created_at` và `updated_at`
})
export class Shipment extends Model<Shipment> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Khóa chính
    })
    id!: number;

    @Column({
        type: DataType.DATE, // Kiểu dữ liệu cho ngày gửi
        allowNull: false,
        field: 'shipment_date',
    })
    shipmentDate!: Date;

    @Column({
        type: DataType.STRING, // Kiểu dữ liệu cho trạng thái gửi hàng
        allowNull: false,
    })
    status!: string;

    @Column({
        type: DataType.STRING, // Kiểu dữ liệu cho số theo dõi
        allowNull: true, // Cho phép null nếu không có số theo dõi
        field: 'tracking_number',
    })
    trackingNumber!: string;

    @Column({
        type: DataType.STRING, // Kiểu dữ liệu cho nhà vận chuyển
        allowNull: true, // Cho phép null nếu không có nhà vận chuyển
    })
    carrier!: string;

    @CreatedAt // Ngày tạo bản ghi
    @Column({
        type: DataType.DATE,
        field: 'created_at',
    })
    createdAt!: Date;

    @UpdatedAt // Ngày cập nhật bản ghi
    @Column({
        type: DataType.DATE,
        field: 'updated_at',
    })
    updatedAt!: Date;
}
