import React, { FC, Suspense ,useEffect} from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { Box } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { GiftWrap } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";
import { giftWapSate } from "state";

export const ProductGift: FC = () => {
  const products = useRecoilValue(giftWapSate);
console.log("gift:",products);

  return (
    <Section title="gói quà">
      <Box className="grid grid-cols-4 gap-4 "  style={{ display: 'flex', overflow:'auto' }}>

        {products.map((product) => ( // Sử dụng dấu ngoặc nhọn chỉ một lần
        <GiftWrap key={product.id} product={product} />
        ))}
      </Box>
    </Section>
  );
  
};

export const ProductListContent: FC<{ limit?: number }> = ({ limit }) =>{
  // show variant in homepage when clicked (productsState)
  const products = useRecoilValue(productsState);
  console.log("Product nè: ", products);
    // Giới hạn số lượng sản phẩm hiển thị
  const displayedProducts = limit ? products.slice(0, limit) : products;
  return (
    <Section title="sản phẩm mới nhất">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>
    </Section>
  );
};


export const ProductList: FC = () => {
  const products = useRecoilValue(productsState);

  useEffect(() => {
    console.log("Sản phẩm được cập nhật:", products);
  }, [products]);

  return (
    <Suspense fallback={<div className="flex w-52 flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>}>
      <ProductListContent limit={4} />
    </Suspense>
  );
};
