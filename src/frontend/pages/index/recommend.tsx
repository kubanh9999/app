import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import { ProductPicker } from "components/product/picker";
import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { recommendProductsState } from "state";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { DividerMini } from "../../components/divider-mini";

export const RecommendContent: FC = () => {
  const recommendProducts = useRecoilValue(recommendProductsState);

  return (
    <Section title="FLASH SALE" padding="title-only" statusText="Chương trình đã kết thúc">
      <DividerMini />
      <Swiper
        slidesPerView={1.25}
        spaceBetween={16}
        className="px-4"
        autoplay={{ delay: 2000 }}
        modules={[Autoplay]}
      >
        {recommendProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductPicker product={product}>
              {({ open }) => (
                <div onClick={open} className="space-y-3">
                  <Box className="relative rounded-lg bg-cover bg-center bg-skeleton w-full h-48">
                    <img
                      src={product.image} // Hình ảnh sản phẩm
                      alt={product.name} // Mô tả sản phẩm
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    {/* Khung viền */}
                    <Box
                      className="absolute inset-0"
                      style={{
                       /*  backgroundImage: 'url("https://theme.hstatic.net/200000427375/1000801978/14/brand_1.jpg?v=511")', */
                        backgroundSize: 'contain', // Đặt backgroundSize thành contain
                        backgroundPosition: 'center', // Căn giữa hình nền
                        backgroundRepeat: 'no-repeat', // Không lặp lại hình nền
                        borderRadius: '20px',
                        pointerEvents: 'none',
                      }}
                    />
                  </Box>
                  <Box className="space-y-1">
                    <Text size="small">{product.name}</Text>
                    <Text size="large" className="font-medium text-green">
                      <FinalPrice>{product}</FinalPrice>
                    </Text>
                  </Box>
                </div>
              )}
            </ProductPicker>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
  
  
};

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

export const Recommend: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
