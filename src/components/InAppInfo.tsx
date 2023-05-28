import React from "react";
import Button from "./Common/Button";
import { copyToClipboard } from "@/utils/copyToClipboard";

function InAppInfo() {
  return (
    <section className="flex flex-col">
      <span className="mb-4 text-md">
        해당 접근으로 로그인 시 오류가 발생합니다!
      </span>
      <span className="text-sm">
        불편하시겠지만 주소를 복사하여 <br />
        새로운 사파리/크롬에서 붙여넣기 해주세요!
      </span>
      <Button onClick={() => copyToClipboard(window.location.href)}>
        주소 복사하기
      </Button>
    </section>
  );
}

export default InAppInfo;
