import React, { FC } from "react";
import { Box } from "zmp-ui";
import { BoxProps } from "zmp-ui/box";

export const DividerMini: FC<{ size?: number; className?: string } & BoxProps> = ({
  height = 1, width = "90%",
  ...props
}) => {
  return (
    <Box
      style={{
        minHeight: height,
        maxWidth: width,
        backgroundColor: "var(--zmp-background-color)",
        margin: "0 auto" // This centers the divider
    }}
      {...props}
    />
  );
};
