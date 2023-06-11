import React, { useEffect, useRef } from "react";
import Image from "next/image";

function BookAnimation({ src }: { src: string }) {
  // const [errorImg, setErrorImg] = useState("");

  const sheetRef = useRef<HTMLDivElement>(null);

  // const handleMouseMove = (event: any) => {
  //   const { clientX, clientY } = event;
  //   if (!sheetRef.current) return;

  //   const { left, top, width, height } =
  //     sheetRef.current.getBoundingClientRect();

  //   // 마우스의 상대 위치 계산
  //   const mouseX = clientX - left;
  //   const mouseY = clientY - top;

  //   // 요소의 가로, 세로 중심점 계산
  //   const centerX = width / 2;
  //   const centerY = height / 2;

  //   // 요소의 가로, 세로 기울기 범위 설정
  //   const maxRotationX = 5;
  //   const maxRotationY = 50;

  //   // 마우스의 상대 위치에 따라 기울기 계산
  //   const rotationX = ((mouseY - centerY) / centerY) * maxRotationX;
  //   const rotationY = ((mouseX - centerX) / centerX) * maxRotationY;

  //   // 기울기 값을 적용하여 요소 회전
  //   sheetRef.current.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  // };

  // const handleMoveEnd = () => {
  //   if (!sheetRef.current) return;
  //   sheetRef.current.style.transform = `rotateX(0deg) rotateY(-30deg)`;
  // };

  // useEffect(() => {
  //   if (sheetRef.current) {
  //     sheetRef.current.addEventListener("touchstart", handleMouseMove);
  //     sheetRef.current.removeEventListener("touchend", handleMoveEnd);
  //   }

  //   return () => {
  //     if (sheetRef.current) {
  //       sheetRef.current.removeEventListener("touchstart", handleMouseMove);
  //       sheetRef.current.removeEventListener("touchend", handleMoveEnd);
  //     }
  //   };
  // }, []);

  const customSrc = src ?? "/img/scope-logo.jpeg";

  return (
    <section className="app" id="app" data-current-media="book" ref={sheetRef}>
      <article className="media-container">
        <div
          className="book-wrapper"
          // onMouseMove={handleMouseMove}
          // onMouseLeave={handleMoveEnd}
        >
          <div className="book">
            <div className="book__front">
              <Image
                src={customSrc}
                alt="book cover"
                fill
                style={{ objectFit: "cover" }}
                // onError={() => setImageSrc(IMAGE_ERROR)}
              />
            </div>
            <div className="book__paper" />
            <div className="book__back" />
            <div className="book__bottom" />
          </div>
        </div>
      </article>
    </section>
  );
}

export default BookAnimation;
