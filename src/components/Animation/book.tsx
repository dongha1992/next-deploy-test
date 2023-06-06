import React from "react";

function BookAnimation() {
  return (
    <section className="app" id="app" data-current-media="book">
      <article className="media-container">
        <div className="book-wrapper">
          <div className="book">
            <div className="book__front">
              <img
                // src="https://images-na.ssl-images-amazon.com/images/I/91-j2UzZW4L.jpg"
                src="/img/scope-logo.jpeg"
                alt="cover"
                style={{ objectFit: "cover" }}
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
