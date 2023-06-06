import { ReactElement, useEffect } from "react";

import Layout from "@/components/Layout";
import Navigation from "@/components/Common/Navigation";
import { popupState } from "@/store/common";
import { useRecoilState } from "recoil";
import BookAnimation from "@/components/Animation/book";
import { useGetRecentBooks } from "@/query/book";
import BookRecent from "@/components/Book/BookRecent";
import { UserBook } from "@/utils/api/type";
import Overlay from "@/components/Common/Overlay";
import Lottie from "@/components/Common/Lottie";

export default function Home() {
  const [popup, setPopup] = useRecoilState(popupState);

  const { data, isLoading } = useGetRecentBooks();

  return (
    <section className="relative w-full pt-8 pb-14 mx-auto max-w-7xl px-4 bg-black">
      <article>
        <h2 className="ml-4 mb-2 text-lg">최근 올라온 책들</h2>
        {isLoading && (
          <Overlay>
            <Lottie
              className="w-56"
              src="https://assets8.lottiefiles.com/private_files/lf30_gqirhcr7.json"
              loop={true}
            />
          </Overlay>
        )}
        <div className="flex">
          {data?.map(({ image, author, title, description, id }: UserBook) => {
            return (
              <BookRecent
                key={id}
                author={author}
                image={image}
                title={title}
                description={description}
              />
            );
          })}
        </div>
      </article>
    </section>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <Layout bottom={<Navigation />}>{page}</Layout>;
};
