import { ReactNode } from "react";
import { atom } from "recoil";

const imageZoomState = atom<{ srcs: string[]; startIndex: number } | null>({
  key: "imageZoomState",
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
  key: "popupState",
  default: {
    message: "",
    callback: null,
    setIsOpen: null,
    isOpen: false,
  },
});

export { imageZoomState, popupState };
