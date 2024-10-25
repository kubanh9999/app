import React, { useState } from "react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { categoriesState, productsState, variantState } from "state";
import { Product, PercentSale } from "types/product";
import { Box } from "zmp-ui";
import _, { initial } from "lodash";
import useProducts from "hooks/useProducts";
import { selectedFileState, selectedProductState } from "../../state";
import { formFields } from "./form-field";
import { CSForm } from "components/csform";
import { modalVisibleState } from "components/csmodal";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

export const ManageProductForm = () => {
  const variants = useRecoilValueLoadable(variantState);
  const categories = useRecoilValueLoadable(categoriesState);

  const selectedProduct = useRecoilValue(selectedProductState);
  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState);
  const { addProduct, updateProduct } = useProducts();
  const refresh = useRecoilRefresher_UNSTABLE(productsState);
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const [sizeLabels, setSizeLabels] = useState<string[]>([]);
  const [colorLabels, setColorLabels] = useState<string[]>([]);
  const [colorImgs, setColorImgs] = useState<string[]>([]);

  const navigate = useNavigate();
  
  const handleSubmitProduct = (val: Product) => {
    
    let submitProduct = _.merge(val, { image: selectedFile });
  //   console.log("Kích thước:", submitProduct.size);
  // console.log("Màu sắc:", submitProduct.color);
    submitProduct.sizes = sizeLabels?sizeLabels:[];  // Gán mảng sizeLabels vào thuộc tính size
    submitProduct.colors = colorLabels?colorLabels:[];
    submitProduct.colorImgs = colorImgs?colorImgs:[];
    if(!submitProduct.sale?.type || submitProduct.sale.type == "percent"){
      submitProduct.sale = {
        type: "percent",
        percent: parseFloat(String(submitProduct.sale?.percent)), 
      };
      if(!submitProduct.sale.percent){
        submitProduct.sale = null
      }
    }
    console.log("submit product: ", submitProduct);
    console.log("submit product size: ", submitProduct.sizes);
    console.log("submit product color: ", submitProduct.colors);
    console.log("submit product img color: ", submitProduct.colorImgs);
    
    if (!submitProduct.id) {
      addProduct(submitProduct, true);
    } else {
      updateProduct(submitProduct, true);
      
    }
    navigate('/admin/product');
  };

  const handleOnChangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files?.item(0));
  };

  if (variants.state === "loading" || categories.state === "loading") {
    return;
  }
  // console.log('Variants:', JSON.stringify(variants, null, 2));
  // console.log("category: ", categories);
  
//   const uniqueOptions = new Set();
//   const optionData = variants.contents.flatMap(variant => 
//     variant.options.filter(option => {
//       // Tạo khóa duy nhất từ label (có thể thay đổi nếu cần thiết)
//       const key = option.label; 
//       if (uniqueOptions.has(key)) {
//           return false; // Nếu đã có trong Set, không thêm vào
//       }
//       uniqueOptions.add(key); // Thêm khóa vào Set
//       return true; // Nếu chưa có, thêm vào mảng kết quả
//   })
//   .map(option => ({
//       id: option.id,
//       label: option.label,
//   }))
// );
// console.log('Option Data:', optionData);
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
    <Box flex flexDirection="column" className="gap-y-4">
      <CSForm
        fields={formFields}
        initialValue={selectedProduct}
        arrMulCbxs={{
          variantId: selectedProduct.variants,
          categoryId: categories.contents,
        }}
        sizeLabels={sizeLabels}
        colorLabels={colorLabels}
        setSizeLabels= {setSizeLabels}
        setColorLabels= {setColorLabels}
        colorImgs={colorImgs}
        setColorImgs= {setColorImgs}
        
        onCSSubmit={(data) => handleSubmitProduct(data)}
        formDataPattern={(value: object) => {
          return value;
        }}
        
      >
        
        <input
          type="file"
          className="input w-full rounded-xl"
          hidden
          id="uploadProductImage"
          onChange={(e) => handleOnChangeFile(e)}
        />
 
        
      </CSForm>
     
    </Box>
    </ErrorBoundary>
  );
};
