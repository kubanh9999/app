import React, { useEffect, useState } from 'react';
import { Box, Header, Page } from 'zmp-ui';
import { useParams } from 'react-router-dom';
import { ProductService } from 'api/services/product.service';
import { Product } from 'types/product';
import { ProductPicker } from 'components/product/picker';
import { useRecoilState } from 'recoil';
import { giftProductState } from 'state';

export const ProductGiftPage = () => {
    const { id } = useParams<{ id: string }>(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState<Product>({} as Product); // Khai báo state để lưu trữ thông tin sản phẩm
    const [products, setProducts] = useState<Product[]>([]); // Khai báo state để lưu trữ danh sách sản phẩm
    const [loading, setLoading] = useState(true); // Thêm biến để quản lý trạng thái tải

    const [giftProducts, setGiflProducts]  = useRecoilState(giftProductState)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) { // Kiểm tra ID có tồn tại không trước khi gọi API
                    const fetchedProduct = await ProductService.getGiftwrapId(id); // Gọi API với ID
                    if (fetchedProduct && fetchedProduct.id) {
                        setProduct(fetchedProduct);
                    } else {
                        console.error('Không tìm thấy sản phẩm hoặc sản phẩm không hợp lệ.');
                    }
                } else {
                    console.error('ID sản phẩm không hợp lệ.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            } finally {
                setLoading(false); // Dừng trạng thái tải khi hoàn thành
            }
        };

        const fetchAllProducts = async () => {
            try {
                const allProducts = await ProductService.getAll(); // Lấy tất cả sản phẩm
                setProducts(allProducts);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        };

        fetchProduct();
        fetchAllProducts();
    }, [id]); // useEffect chạy mỗi khi id thay đổi

    return (
        <Page>
            <Header />
            <Box className="p-4 bg-white rounded-lg shadow-md flex flex-col">
                <h1 className="text-xl font-bold mb-4">giỏ quà</h1>

                {loading ? (
                    <div className="flex w-52 flex-col gap-4" /* onClick={() => setGiflProducts(
                       qq)} */>
                        <div className="flex items-center gap-4">
                            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                            <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-20"></div>
                                <div className="skeleton h-4 w-28"></div>
                            </div>
                        </div>
                        <div className="skeleton h-32 w-full"></div>
                    </div>
                ) : product ? (
                    <div className="flex flex-col items-center">
                        <img
                            loading="lazy"
                            src={product.image}
                            alt={product.name}
                            className="object-cover object-center rounded-lg mt-4"
                            style={{
                                width: "50%",
                                height: "auto",
                            }}
                        />
                        <h2 className="text-2xl font-semibold text-center">{product.name}</h2>
                    </div>
                ) : (
                    <p>Không tìm thấy sản phẩm.</p>
                )}

                {/* Hiển thị danh sách sản phẩm bên dưới */}
                <Box className="mt-6">
                <h3 className="text-lg ">hãy chọn sản phẩm dưới đây vô giỏ quà của bạn </h3>
                <br />
                    <h3 className="text-lg font-bold">Danh sách sản phẩm</h3>
                    <div className="flex flex-wrap gap-4">
                        {products.map((prod) => (
                            <ProductPicker key={prod.id} product={prod}>
                                {({ open }) => (
                                    <div className="space-y-2" onClick={open}>
                                        <Box className="w-full aspect-square relative">
                                            <img
                                                loading="lazy"
                                                src={prod.image}
                                                className="absolute object-cover object-center rounded-lg"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    zIndex: 0,
                                                }}
                                            />
                                            {product.price && (
                                                <div
                                                    className="absolute top-0 right-0 text-red-600 font-bold"
                                                    style={{
                                                        width: "30px",
                                                        height: "25px",
                                                        backgroundColor: "#FFD700",
                                                        textAlign: "center",
                                                        borderRadius: "0 0 0 0",
                                                        zIndex: 2,
                                                        fontSize: "10px",
                                                        position: "relative",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    -{product.discount}%
                                                    {/* Tam giác nhọn phía dưới bên phải */}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            bottom: "-10px",
                                                            right: 0,
                                                            width: 0,
                                                            height: 0,
                                                            borderStyle: "solid",
                                                            borderWidth: "0 10px 10px 0",
                                                            borderColor: "transparent #FFD700 transparent transparent",
                                                        }}
                                                    />
                                                    {/* Tam giác nhọn phía dưới bên trái */}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            bottom: "-10px",
                                                            left: 0,
                                                            width: 0,
                                                            height: 0,
                                                            borderStyle: "solid",
                                                            borderWidth: "0 0 10px 10px",
                                                            borderColor: "transparent transparent transparent #FFD700",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </Box>
                                        <p className="text-center">{prod.name}</p>
                                       {/*  <p className="text-gray pb-2">{prod.price && <FinalPrice>{prod}</FinalPrice>}</p> */}
                                    </div>
                                )}
                            </ProductPicker>
                        ))}
                    </div>
                </Box>
            </Box>
        </Page>
    );
};
