import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, selectedCategoryIdState } from "state";
import { useNavigate } from "react-router";

export const Categories: FC = () => {
  const categories = useRecoilValue(categoriesState);

  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    navigate("/category");
  };

  const sortedCategories = [...categories].sort((a, b) => {
    if (a.name === "Wangcha") return -1;
    if (b.name === "Wangcha") return 1;
    return 0;
  })
  return (
    <Box className="bg-white w-screen overflow-auto">
      <div className="flex justify-between w-[50rem] gap-x-2 text-center ps-5 py-5 ">
      {sortedCategories?.map((category, i) => (
        <div
          key={i}
          onClick={() => gotoCategory(category.id)}
          className="flex flex-col space-y-2 items-center"
        >
          <img className="w-12 h-12" src={category.icon} />
          <Text size="xxSmall" className="text-gray">
            {category.name}
          </Text>
        </div>
      ))}
      </div>
    </Box>
  );
};
