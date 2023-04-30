import React, { PropsWithChildren } from "react";

function Overlay({ children }: PropsWithChildren) {
  return (
    <div className="fixed h-screen w-full top-0 left-0 bg-opacity-0 flex justify-center items-center text-center text-lg text-black z-50 overflow-hidden">
      {children}
    </div>
  );
}

export default Overlay;
