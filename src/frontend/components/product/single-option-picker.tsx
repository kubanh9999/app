import React, { FC } from "react";
import { Variant } from "types/product";
import { Box, Radio, Text } from "zmp-ui";
import {Test} from "./color-option-picker"

export const SingleOptionPicker: FC<{
  variant: Variant;
  value: string;
  onChange: (value: string) => void;
}> = ({ variant, value, onChange }) => {
  console.log("value: ", value);
  
  return (
    <Box my={8} className="space-y-2">
      <Text.Title size="small">{variant.label}</Text.Title>
      <Radio.Group
        className="flex-1 grid grid-cols-3 justify-between"
        name={variant.id}
        value={value}
        defaultValue={"m"}
        onChange={(selectedOption: string) => {
          onChange(selectedOption);
        }}
        
        options={variant.options.map((option) => {
          if(!option.imgColor){
            
            return{value: option.id,
              label: option.label,}
          }
          else{
            return {
              value: option.id,
              label: (<Test img={option.imgColor} label={option.label} />) as any
            }
          }
          
        })}
      />
    </Box>


  );
};
