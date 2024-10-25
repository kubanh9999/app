import React, { PropsWithChildren } from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { BoxProps } from "zmp-ui/box";

export interface SectionProps extends BoxProps {
  title: string;
  padding?: "all" | "none" | "title-only";
  statusText?: string;
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  children,
  title,
  padding = "all",
  statusText,
  ...props
}) => {
  return (
  <>
    <Box
      className={`bg-background ${padding === "all" ? "p-4 space-y-4" : ""} ${
        padding === "title-only" ? "py-4 space-y-4" : ""
      }`}
      {...props}
    >
      {/* <div className={`flex items-center gap-2 ${padding === "title-only" ? "px-4" : ""}`}>
        <Text.Title>{title}</Text.Title>
        {statusText && (
          <Text className="text-sm text-gray-500 lowercase">
            {statusText}
          </Text>
        )}
      </div> */}
      <div className={`flex items-center gap-2 ${padding === "title-only" ? "px-4" : ""} font-sans`}>
        <Text.Title className="font-semi text-xl tracking-tight">{title}</Text.Title>
        {statusText && (
          <Text className="text-sm text-gray-500 lowercase font-medium">
            {statusText}
          </Text>
        )}
      </div>

      {children}
    </Box>
  </>
  );
};
