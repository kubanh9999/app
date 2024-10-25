import { FinalPrice } from "components/display/final-price";
import { Divider } from "components/divider";
import { DisplayPrice } from "components/display/price";
import { ProductPicker } from "components/product/picker";
import { ProductItem } from "components/product/item";
import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense, useEffect, useState } from "react";
import { FC } from "react";
import { useRecoilValue} from "recoil";
import { productsState } from "state";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { Product } from "../../types/product";
import { DividerMini } from "../../components/divider-mini";

interface CategoryProductsProps {
  category: string;
  title: string;
  }
  
const CategoryProducts: React.FC<CategoryProductsProps> = ({ category, title  }) => {
  
  const allProducts = useRecoilValue(productsState);
  // const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   const filteredProducts = allProducts.filter(product => product.categoryId.includes(category));
  //   setCategoryProducts(filteredProducts);
  // }, [category, allProducts]);
  
  let statusText="";
  if(title == "FLASH SALE") statusText="Chương trình đã kết thúc"

  if (allProducts.length === 0) return null;
  
    return (
    <>
      <Section title={title} statusText={statusText} padding="title-only" style={{ marginTop: '-30px' , }}>
        <DividerMini />
            <Swiper
            
                slidesPerView={2}
                spaceBetween={10}
             className="swiper-container d-flex justify-content-center"
                autoplay={{ 
                  delay: 2000, 
                  disableOnInteraction: true // Để autoplay không bị tắt khi người dùng trượt tay
                  }}
                speed={800}
                modules={[Autoplay, Pagination]}
            >
                {allProducts.map((product) => (
                <SwiperSlide key={product.id}>
                    <ProductItem key={product.id} product={product} />
                </SwiperSlide>
                ))}
            </Swiper>
        <Divider />
      </Section>
    </>
    );
  };

// export const RecommendContent: FC = () => {
//     // lưu ý điền id category vào mảng categorysToShow
//   const categorysToShow = ["flashsale","uncaocap", "dtovt", "spbc", "xdcnam", "ydcnu", "zdctre"]
//   const titleToShow = ["FLASH SALE","Ủng nhựa cao cấp đa năng","Dép tổ ong Việt Thắng","Sản phẩm bán chạy",
//                         "Dành cho nam" ,"Dành cho nữ","Dành cho trẻ em"]
  
//   return (
//     <>
//     {categorysToShow.map((category, index) => (
//       <CategoryProducts key={category} 
//       category={category} 
//       title={titleToShow[index]}
//        />
//     ))}
//   </>
//   );
// };


export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(3)];

  return (
    <Section title="Gợi ý cho bạn" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const ShowProductInHomePage: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      {/* <RecommendContent /> */}
    </Suspense>
  );
};
