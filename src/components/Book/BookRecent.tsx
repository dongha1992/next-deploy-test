import React from "react";
import BookAnimation from "../Animation/book";

interface Props {
  image: string;
  title: string;
  publisher: string;
  pubDate: string;
  desciption: string;
}

function BookRecent({ image, title, publisher, pubDate, desciption }: Props) {
  return (
    <div>
      <BookAnimation src={image} />
    </div>
  );
}

export default BookRecent;
