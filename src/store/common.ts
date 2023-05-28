import { ReactNode } from "react";
import { atom } from "recoil";
import { v1 } from "uuid";

const imageZoomState = atom<{ srcs: string[]; startIndex: number } | null>({
  key: `imageZoomState/${v1()}`,
  default: {
    srcs: [],
    startIndex: 0,
  }, // default value (aka initial value)
});

const popupState = atom<{
  message?: string | ReactNode;
  callback?: any;
  setIsOpen?: any;
  isOpen: boolean;
} | null>({
  key: `popupState/${v1()}`,
  default: {
    message: "",
    callback: null,
    setIsOpen: null,
    isOpen: false,
  },
});

export { imageZoomState, popupState };
