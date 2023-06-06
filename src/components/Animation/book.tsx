import React, { useState } from "react";

function BookAnimation({ src }: { src: string }) {
  // const [errorImg, setErrorImg] = useState("");
  return (
    <section className="app" id="app" data-current-media="book">
      <article className="media-container">
        <div className="book-wrapper">
          <div className="book">
            <div className="book__front">
              <img
                src={src}
                alt="cover"
                style={{ objectFit: "cover" }}
                // onError={() => setImageSrc(IMAGE_ERROR)}
              />
            </div>
            <div className="book__paper"></div>
            <div className="book__back"></div>
          </div>
          <div className="book-shadow"></div>
        </div>
      </article>
    </section>
  );
}

export default BookAnimation;
