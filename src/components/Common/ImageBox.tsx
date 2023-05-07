import { useRef, useEffect, ChangeEvent } from "react";

const DEFAULT_LIMIT_SIZE = 1024 * 1024 * 20;

interface IProps {
  setImageValue: any;
}
const ImageBox = ({ setImageValue }: IProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    try {
      const imageFile = (e.target.files || [])[0];
      if (!imageFile) return;
      if (imageFile.size > DEFAULT_LIMIT_SIZE || imageFile.name.length > 255) {
        return alert(
          "사진은 1장 당 20MB 이하 (jpg, png), 파일명은 255자 이하만 등록 가능해요."
        );
      }
      const formData = new FormData();
      setImageValue();
    } catch (error) {
    } finally {
      e.target.value = "";
    }
  };

  const onOpenFile = () => {
    if (!fileRef.current) return;
    fileRef.current.click();
  };

  return (
    <article className="pt-4">
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenFile}
        className={
          "bg-gray-500 w-20 h-20 flex justify-center align-center flex-col rounded-md"
        }
      >
        <span className="text-2xl text-center">+</span>
      </div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .heif, .heic"
        ref={fileRef}
        name="imageInput"
        className="hidden"
        onChange={onChange}
      />
    </article>
  );
};

export default ImageBox;
