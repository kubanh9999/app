import React, { useState } from "react";

interface Option {
    id: string;
    label: string;
    priceChange: number;
    imgColor: string;
  }
  
  interface Variant {
    id: string;
    label: string;
    type: string;
    options: Option[];
  }

export type OptionsAttributeProps = {
    arrval: Variant[];
    sizeLabels?:string[] | undefined, 
    colorLabels?:string[] | undefined,
    setSizeLabels?:Function | undefined,
    setColorLabels?:Function | undefined,
    colorImgs?:string[] | undefined,
    setColorImgs?:Function | undefined,
};

export const OptionsAttribute = ({ 
    arrval,
    sizeLabels, 
    colorLabels,
    setSizeLabels,
    setColorLabels,
    colorImgs,
    setColorImgs,

    }: OptionsAttributeProps) => {
      const [selectedSize, setSelectedSize] = useState(''); 
      const [selectedColor, setSelectedColor] = useState(''); 
      const [selectedColorImg, setSelectedColorImg] = useState(''); 
    return (
        <>
        {arrval?.map((val: Variant) => (
            <div>
            <label htmlFor={val.label}
              className="flex items-center">{val.label}</label>
              <div className="space-y-2" key={val.id}>
                <div className="overflow-auto h-30 border rounded py-3">
                  <div className="flex flex-wrap justify-center gap-2 max-h-30">
                    {val.label === 'size' && sizeLabels && sizeLabels.map(va => 
                      <span className="btn btn-sm bg-base-300 px-5 py-2 rounded h-8 "
                      onClick={() => setSelectedSize(va)}>
                        {va}
                      </span>
                    )                    
                    }
                    {val.label === 'color' && colorLabels && colorImgs && colorLabels.map((va, index) => 
                      <span className="btn btn-sm bg-base-300 px-5 py-2 rounded h-8 "
                      key={index}
                      onClick={() => {setSelectedColor(va); setSelectedColorImg(colorImgs[index])}}
                      style={{ 
                        backgroundColor: colorImgs[index].startsWith('#') || colorImgs[index].startsWith('rgb') 
                          ? colorImgs[index] // Nếu là mã màu thì dùng backgroundColor
                          : '', // Nếu không phải mã màu
                        backgroundImage: !colorImgs[index].startsWith('#') && !colorImgs[index].startsWith('rgb') 
                          ? `url(${colorImgs[index]})` // Nếu là đường dẫn ảnh thì dùng backgroundImage
                          : '',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      >
                        {va}
                      </span>
                    )                    
                    }
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="w-full">
                  <input
                    type="text"
                    className="input w-full rounded-xl border-black mb-2"
                    placeholder={val.label === "color" ? "Thêm màu": "Thêm size"}
                    value={val.label === "color" ? selectedColor: selectedSize}
                    onChange={(e) => {
                      if (val.label === "color") {
                        setSelectedColor(e.target.value);
                      } else {
                        setSelectedSize(e.target.value);
                      }
                    }}
                  />
                  {val.label === "color" && (
                    <input 
                    className="input w-full rounded-xl border-black"
                    type="text" 
                    placeholder="Mã màu url/rgb(...)/#..."
                    value={selectedColorImg}
                    onChange={(e) => {const value = e.target.value;
                      // Kiểm tra nếu giá trị không phải là đường dẫn
                      if (!value.startsWith('http://') && !value.startsWith('https://')) {
                        setSelectedColorImg(value.trim().toLowerCase());
                      } else {
                        setSelectedColorImg(value); // Không thay đổi nếu là đường dẫn
                      }
                    }}
                    />
                  )}
                  </div>
                  {val.label === 'size' && sizeLabels && setSizeLabels && (
                    <div className="flex w-full pb-5 space-x-2">
                      <button className="btn flex-1" type="button" onClick={() => {
                        const valueToAdd = selectedSize.normalize('NFC').trim();
                        if (valueToAdd && !sizeLabels.includes(valueToAdd)) { // Kiểm tra chuỗi không rỗng và chưa có trong mảng
                          setSizeLabels((prevState) => [...prevState, valueToAdd]);
                          setSelectedSize('')
                        }
                      }}>add</button>
                      <button className="btn flex-1" type="button" onClick={() => {
                        const valueToRemove = selectedSize.normalize('NFC').trim();
                        if (valueToRemove) { // Chỉ xóa nếu giá trị không rỗng
                          setSizeLabels((prevState) => 
                            prevState.filter(c => c.normalize('NFC') !== valueToRemove)
                          );
                          setSelectedSize('')
                        }
                      }}>remove</button>
                    </div>
                  )}
                  {val.label === 'color' && colorLabels && setColorLabels && setColorImgs &&(
                    <div className="flex w-full pb-5 space-x-2">
                      <button className="btn flex-1" type="button" onClick={() => {
                        const valueToAdd = selectedColor.normalize('NFC').trim();
                        const ColorImg = selectedColorImg;
                        if (valueToAdd && ColorImg ) { // Kiểm tra chuỗi không rỗng và chưa có trong mảng
                          setColorLabels((prevState) => [...prevState, valueToAdd]);
                          setColorImgs((prevState) => [...prevState, ColorImg]);
                          setSelectedColor('');
                          setSelectedColorImg('');
                        }

                      }}>add</button>
                      <button className="btn flex-1" type="button" onClick={() => {
                        const valueToRemove = selectedColor.normalize('NFC').trim();
                        const ColorImgToRemove = selectedColorImg.trim().toLowerCase();
                        console.log("img remove: ", ColorImgToRemove);
                        
                        
                        if (valueToRemove && ColorImgToRemove) { 
                          const indexToRemove = colorLabels.indexOf(valueToRemove);// Chỉ xóa nếu giá trị không rỗng
                          console.log("index img remove: ", indexToRemove);
                          // Lọc colorLabels
                          setColorLabels((prevState) => {
                            const newColorLabels = prevState.filter(c => c.normalize('NFC') !== valueToRemove);

                            // Kiểm tra và loại bỏ phần tử trong colorImgs nếu chỉ số hợp lệ
                            if (indexToRemove !== -1) {
                              setColorImgs((prevStateImgs) => {
                                // Tạo một bản sao và xóa phần tử tại chỉ số
                                const newColorImgs = [...prevStateImgs];
                                newColorImgs.splice(indexToRemove, 1);
                                return newColorImgs; // Trả về mảng đã loại bỏ
                              });
                            }

                            return newColorLabels; // Trả về mảng colorLabels đã được lọc
                          })
                          setSelectedColor('');
                          setSelectedColorImg('');
                        }
                      }}>remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            ))}
        </>
    );
};