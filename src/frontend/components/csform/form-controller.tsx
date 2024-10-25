import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { FormControllerProps } from "./types";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { object } from "prop-types";
import { Variant } from "framer-motion";
import { indexOf } from "lodash";
import { OptionsAttribute } from "./optionsAttribute";

export const selectTypeState = atom<string>({
  key: "selectTypeState",
  default: "",
});


export const FormController = ({
  title,
  tInput,
  register,
  errors,
  arrMulCbx,
  arrSelectBx,
  disable,
  select_register,
  selectType,
  sizeLabels, 
  colorLabels,
  setSizeLabels,
  setColorLabels,
  colorImgs,
  setColorImgs,
}: FormControllerProps) => {
  const [typeState, setTypeState] = useRecoilState(selectTypeState);
  

  const InpWrapper = useCallback(
    ({ children }) => {
      return (
        <label className="form-control w-full" htmlFor="">
          <div className="label">
            <span className={`label-text ${errors && "text-red-500"}`}>
              {title}
            </span>
          </div>
          {children}
          {errors && (
            <div className="bg-red-400 px-2 rounded-lg text-white inline-block mt-2">
              <HiExclamation className="inline" />
              <span>{errors?.message}</span>
            </div>
          )}
        </label>
      );
    },
    [errors]
  );

  switch (tInput) {
    case "txtar":
      return (
        <InpWrapper>
          <textarea
            className="textarea textarea-bordered rounded-xl w-full h-40 border-black"
            placeholder="Type here"
            {...register}
            disabled={disable}
            defaultValue=""
          ></textarea>
        </InpWrapper>
      );
    case "chk":
      return (
        <InpWrapper>
          <input
            type="checkbox"
            placeholder="Type here"
            className="checkbox"
            {...register}
            disabled={disable}
          />
        </InpWrapper>
      );
    case "date":
      return (
        <InpWrapper>
          <input
            type="date"
            placeholder="Type here"
            className="input w-full rounded-xl border-black"
            {...register}
            disabled={disable}
          />
        </InpWrapper>
      );
    case "mulcbx":
      return (
        <InpWrapper>
          <div className="grid grid-cols-2 gap-1 p-2 max-h-40 overflow-auto textarea textarea-bordered rounded-xl items-start border-black">
            {arrMulCbx?.map((val: object, key: number) => (
              <label
                htmlFor={val[Object.keys(val)[0]]}
                className="flex items-center"
                key={key}
              >
                <input
                  id={val[Object.keys(val)[0]]}
                  type="checkbox"
                  key={key}
                  value={val[Object.keys(val)[0]]}
                  {...register}
                  disabled={disable}
                />
                {val[Object.keys(val)[1]]}
              </label>
            ))}
          </div>
        </InpWrapper>
      );
    case "txtselect":
      return (
        <InpWrapper>
          <div className="flex justify-between gap-x-2">
            <input
              type="text"
              placeholder="Type here"
              className="input w-1/2 rounded-xl border-black"
              {...register}
              disabled={disable}
              onChange={(e) => e.target.focus}
            />
            <select
              className="select select-bordered rounded-xl border-black"
              name="type"
              {...select_register}
              onChange={(e) => setTypeState(e.target.value)}
            >
              <option disabled value={""}>
                Đơn vị
              </option>
              {arrSelectBx?.map((val) => (
                <option value={val[Object.keys(val)[0]]}>
                  {val[Object.keys(val)[1]]}
                </option>
              ))}
            </select>
          </div>
        </InpWrapper>
      );
    case "txt":
      return (
        <InpWrapper>
          <input
            type="text"
            placeholder="Type here"
            className="input rounded-xl border-black"
            {...register}
            disabled={disable}
            onChange={(e) => e.target.focus}
          />
        </InpWrapper>
      );
    case "numfloat":
      return (
        <InpWrapper>
          <input
            type="text"
            className="input rounded-xl border-black"
            {...register}
            disabled={disable}
            onChange={(e) => e.target.focus}
          />
        </InpWrapper>
      );

    case "addField":
      console.log("arrMulCbx: ", arrMulCbx);

      useEffect(() => {
        const newSizeLabels: string[] = [];
        const newColorLabels: string[] = [];
        const newColorImgs: string[] = [];

        arrMulCbx?.forEach((val: Variant) => {
          // Kiểm tra loại variant
          if (val.label === 'size') {
            val.options.forEach((op) => {
              newSizeLabels.push(op.label);
            });
          } else if (val.label === 'color') {
            val.options.forEach((op) => {
              newColorLabels.push(op.label);
              newColorImgs.push(op.imgColor);
            });
          }
        });
        if(setSizeLabels && setColorLabels && setColorImgs){
        setSizeLabels(newSizeLabels);
        setColorLabels(newColorLabels);
        setColorImgs(newColorImgs);
        }
        }, [arrMulCbx]);
        console.log("color: ", colorLabels);
        console.log("size: ", sizeLabels);
        console.log("colorImgs: ", colorImgs);
        
        const arrColor: Variant[] = arrMulCbx 
      ? [{ 
          id: arrMulCbx[0].id, 
          label: arrMulCbx[0].label, 
          type: arrMulCbx[0].type, 
          options: arrMulCbx[0].options || [] // Đảm bảo có thuộc tính options
      }] 
      : [{ 
          id: "temColor", 
          label: "color", 
          type: "single", 
          options: [] // Đảm bảo có thuộc tính options
      }];

      const arrSize: Variant[] = arrMulCbx 
      ? [{ 
          id: arrMulCbx[1].id, 
          label: arrMulCbx[1].label, 
          type: arrMulCbx[1].type, 
          options: arrMulCbx[1].options || [] // Đảm bảo có thuộc tính options
      }] 
      : [{ 
          id: "temSize", 
          label: "size", 
          type: "single", 
          options: [] // Đảm bảo có thuộc tính options
      }];

      console.log("arr color: ", arrColor);
      console.log("arr size: ", arrSize);
      
      
      return <InpWrapper>
        <OptionsAttribute 
        arrval={arrColor}
        sizeLabels={sizeLabels}
        colorLabels={colorLabels}
        setSizeLabels= {setSizeLabels}
        setColorLabels= {setColorLabels}
        colorImgs={colorImgs}
        setColorImgs= {setColorImgs}
        />

      <OptionsAttribute 
        arrval={arrSize}
        sizeLabels={sizeLabels}
        colorLabels={colorLabels}
        setSizeLabels= {setSizeLabels}
        setColorLabels= {setColorLabels}
        colorImgs={colorImgs}
        setColorImgs= {setColorImgs}
        />
      </InpWrapper>
    default:
      if (title.includes("tối đa")) {
        if (selectType === "percent") {
          return (
            <InpWrapper>
              <input
                type="text"
                placeholder="Type here"
                className="input rounded-xl border-black"
                {...register}
                disabled={disable}
                onChange={(e) => e.target.focus}
              />
            </InpWrapper>
          );
        }
      }
      return;
  }

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
};
