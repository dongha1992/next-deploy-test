import { Skeleton } from "../Common/Skeleton";

const PostSkeleton = () => {
  return (
    <div>
      <Skeleton width="78px" height="18px" />
      <Skeleton width="67px" height="27px" margin="0 0 24px" />
      <div className="flex mx-24">
        {[0, 1, 2, 3, 4, 5].map((id) => (
          <div key={id}>
            <Skeleton width="100%" height="42.9688vw" />
            <Skeleton width="100%" height="22px" margin="0 0 2px" />
            <Skeleton width="75px" height="22px" margin="0 0 8px" />
            <Skeleton width="100%" height="18px" margin="0 0 2px" />
            <Skeleton width="100%" height="18px" margin="0 0 8px" />
            <Skeleton width="75px" height="19px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostSkeleton;
