import React, { FC } from "react";

type TestProps = {
    img: string; // Sử dụng string thay vì String
    label?: string; // Sử dụng string thay vì String
  };
  
export const Test: React.FC<TestProps> = ({ img, label }) => {
    
    return (
      <div className="flex flex-col items-start">
        <div
          className="w-8 h-8 rounded-full border border-black"
          // style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover',
          //  backgroundPosition: 'center'}}
          style={{
            backgroundColor: img.startsWith('#') || img.startsWith('rgb') || img.startsWith('rgba') || img.startsWith('(') 
            ? (img.startsWith('(') ? `rgb${img}` : img) 
            : 'transparent',
            backgroundImage: img.startsWith('http') || img.startsWith('/') ? `url(${img})` : 'none',
            backgroundSize: img.startsWith('http') || img.startsWith('/') ? 'cover' : 'initial',
            backgroundPosition: img.startsWith('http') || img.startsWith('/') ? 'center' : 'initial',
          }}
        >
        </div>
        <span className="mt-1" style={{paddingBottom:"10px", marginTop:"-2px"}}>{label}</span>
      </div>
    );
  };
  