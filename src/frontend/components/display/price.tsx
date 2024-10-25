import React, { FC } from "react";
import { getConfig } from "utils/config";

export const DisplayPrice: FC<{ finalPrice: number; originalPrice: number }> = ({ finalPrice, originalPrice }) => {
  const symbol = getConfig((config) => config.template.currencySymbol);
  if (getConfig((config) => config.template.prefixCurrencySymbol)) {
    if(finalPrice === originalPrice){
      return (
        // <>
        //   {finalPrice?.toLocaleString()}
        //   {symbol}
        // </>
        <span style={{ color: '#e63946', fontWeight: 'bold', fontSize: '1.2em' }}>
          {finalPrice?.toLocaleString()}
          {symbol}
        </span>
      );
    }
    return (
      <>
        {/* {finalPrice?.toLocaleString()}
        {symbol}
        (originalPrice && ) */}

        <span style={{ color: '#e63946', fontWeight: 'bold', fontSize: '1.2em', marginRight: '8px' }}>
          {finalPrice?.toLocaleString()}
          {symbol}
        </span>
        <span style={{ textDecoration: 'line-through', color: '#b0b0b0', fontSize: '0.95em' }}>
          {originalPrice?.toLocaleString()}
          {symbol}
        </span>
      </>
    );
  } else {
    return (
      <>
        {finalPrice?.toLocaleString()}
        {symbol}
      </>
    );
  }
};
