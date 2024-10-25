import React, { FC } from "react";
import { Pagination, Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { getDummyImage_brand } from "utils/product";
import { Box } from "zmp-ui";

export const Banner: FC = () => {
  return (
    <Box className="bg-white" pb={4}>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        cssMode
      >
        {[1, 2,3,4]
          .map((i) => getDummyImage(`slider_${i}.jpg`))
          .map((banner, i) => (
            <SwiperSlide key={i} className="px-4">
              <Box
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${banner})` }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
//small banner 
export const BrandBanner: FC = () => {
  return (
    <Box className="bg-gray-100" pb={4} style={{ height: '170px' }}>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        cssMode
      >
        {[1, 2, 3, 4]
          .map((i) => getDummyImage_brand(`brand_${i}.jpg`)) // Gọi đúng function
          .map((banner, i) => (
            <SwiperSlide key={i} className="px-3">
              <Box
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{ 
                  backgroundImage: `url(${banner})`, 
                  height: '150px' // Điều chỉnh chiều cao tại đây
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
