import React, { useState } from "react";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function useS3Upload(setImages: any) {
  const [isImageLoading, setImageLoading] = useState<boolean>(false);

  const setImageHandler = async (image: any) => {
    if (!image) return;

    setImageLoading(true);
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: image.name,
      Body: image,
      ACL: "public-read",
    };
    await s3
      .upload(uploadParams)
      .promise()
      .then((res) => {
        setImages && setImages((prev: any) => [...prev, res.Location]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setImageLoading(false);
      });
  };
  return { setImageHandler, isImageLoading };
}

export default useS3Upload;
