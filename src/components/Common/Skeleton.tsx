import React, { PropsWithChildren } from "react";

const Skeleton = ({
  height = "20px",
  width = "100%",
  margin = "0",
  borderRadius = "none",
}) => {
  return (
    <div
      className={`h-${height} w-${width} animate-pulse bg-gray-300 rounded-${borderRadius} ${margin}`}
      style={{
        backgroundImage: "linear-gradient(90deg, #f2f2f2, #f7f7f7, #f2f2f2)",
        backgroundSize: "200px 100%",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ItemList = ({ children }: PropsWithChildren) => {
  return (
    <div className="px-4 py-12 max-w-screen-xl mx-auto overflow-hidden">
      {children}
    </div>
  );
};

const ItemBox = ({ children }: PropsWithChildren) => {
  return <div className="float-left mr-4">{children}</div>;
};

export { Skeleton, ItemList, ItemBox };
