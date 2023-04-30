import React, { PropsWithChildren } from "react";

function Overlay({ children }: PropsWithChildren) {
  return (
    <div className="fixed h-screen w-full h-full top-0 left-0 flex justify-center items-center text-center text-lg text-black overflow-hidden">
      {children}
    </div>
  );
}

export default Overlay;
