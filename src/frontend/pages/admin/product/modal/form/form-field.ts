import { FormField } from "components/csform/types";

export const formFields: FormField[] = [
  {
    title: "Tên sản phẩm",
    field: "name",
    type: "txt",
    validate: {
      message: "Tên sản phẩm rổng",
    },
  },
  {
    title: "Giá sản phẩm",
    field: "price",
    type: "txt",
    validate: {
      message: "Giá sản phẩm rổng",
    },
  },
  {
    title: "Chi tiết sản phẩm",
    field: "description",
    type: "txtar",
  },
  {
    title: "Thể loại",
    field: "categoryId",
    type: "mulcbx",
  },
  {
    title: "thuộc tính",
    field: "variantId",
    type: "addField",
  },
  {
    title: "Giảm giá (ví dụ nhập 0.08 cho 8%)",
    field: "sale.percent",
    type: "txt",
  },
];
