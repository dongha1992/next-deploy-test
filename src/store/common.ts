import { atom } from "recoil";

const imageZoomState = atom<{ srcs: string[]; startIndex: number } | null>({
  key: "imageZoomState",
  default: {
    srcs: [],
    startIndex: 0,
  }, // default value (aka initial value)
});

export { imageZoomState };
