import { FinalPrice } from "components/display/final-price";
import React, { FC, useMemo } from "react";
import { Product } from "types/product";
import { Box, Text } from "zmp-ui";
import { ProductPicker } from "./picker";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  let discount = 0
  
  console.log((product.sale));
  console.log("sale goc ",typeof product.sale);
  
  if(product.sale && typeof product.sale === 'string'){
    console.log("sale phat hien la striing ",typeof product.sale);
    console.log("Raw product.sale:", JSON.stringify(product.sale));
    try {
      // Parse một lần duy nhất
      product.sale = JSON.parse(product.sale);
      console.log("sale sau khi parse ",typeof product.sale);
    } catch (error) {
      console.error("Error parsing product.sale:", error);
    }
  }
  if(product.sale && product.sale?.type === "percent"){
    discount = parseInt(String(product.sale.percent * 100));
  }
  
  return (
    <ProductPicker product={product}>
    {({ open }) => (
      <div className="space-y-2" onClick={open}>
        <Box 
  className="w-full aspect-square relative" 
>
  {/* Khung nền (frame) */}
  
  
  {/* Ảnh sản phẩm */}
  <img
    loading="lazy"
    src={product.image}
    className="absolute object-cover object-center rounded-lg"
    style={{
      width: "100%", // Điều chỉnh kích thước ảnh để vừa khung
      height: "100%", // Điều chỉnh chiều cao ảnh để vừa khung
      zIndex: 0, // Ảnh có thứ tự z-index thấp hơn khung
    }}
  />
            {product.price && discount != 0 && (
              <div
                className="absolute top-0 right-0 text-red-600 font-bold"
                style={{
                  width:"30px",
                  height:"25px",
                  backgroundColor: "#FFD700", // Màu vàng của nhãn
                  textAlign:"center",
                  borderRadius: "0 0 0 0", // Bo góc trên phải
                  zIndex: 2, // Đảm bảo nhãn giảm giá hiển thị trên ảnh và khung nền
                  fontSize: "10px", // Kích thước chữ
                  position: "relative",
                  display: "flex",
                  justifyContent: "center", // Căn giữa theo chiều ngang
                  alignItems: "center",
                }}
              >
               -{discount}%

              {/* Tam giác nhọn phía dưới bên phải */}
              <div
                  style={{
                    position: "absolute",
                    bottom: "-10px", // Tam giác nằm dưới nhãn
                    right: 0,
                    width: 0,
                    height: 0,
                    borderStyle: "solid",
                    borderWidth: "0 10px 10px 0", // Tạo tam giác
                    borderColor: "transparent #FFD700 transparent transparent", // Màu tam giác giống màu nền nhãn
                  }}
                />

                {/* Tam giác nhọn phía dưới bên trái */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-10px", // Tam giác nằm dưới nhãn
                    left: 0,
                    width: 0,
                    height: 0,
                    borderStyle: "solid",
                    borderWidth: "0 0 10px 10px", // Tạo tam giác
                    borderColor: "transparent transparent transparent #FFD700", // Màu tam giác giống màu nền nhãn
                  }}
                />
              </div>
            )}

</Box>

  
        <Text style={styles.productName}>{product.name}</Text>
        <Text size="xxSmall" className="text-gray pb-2">
          <FinalPrice>{product}</FinalPrice>
        </Text>
      </div>
    )}
  </ProductPicker>
  
  );
};

/* export cosnt ProductNew  */
const styles = {
  productName: {
    width: '100%', 
    whiteSpace: 'nowrap', // Không cho văn bản xuống dòng
    overflow: 'hidden', // Ẩn phần văn bản tràn ra ngoài
    textOverflow: 'ellipsis', // Thay thế phần văn bản bị ẩn bằng dấu ba chấm
  },
};
