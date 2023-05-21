import { StarEmptyIcon, StarFullIcon, StarHalfIcon } from "@/utils/svg";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const IconMap: { [key: string]: JSX.Element } = {
  StarHalfIcon: <StarHalfIcon />,
  StarFullIcon: <StarFullIcon />,
  StarEmptyIcon: <StarEmptyIcon />,
};

const INITIAL_COUNT = 5;

function useRating(userRating: number) {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(5);

  const onRating = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    setHoverRating(idx);

    if (xPos <= 0.5) {
      idx -= 0.5;
    }

    setRating(idx);
  };

  const getSvgName = useCallback(
    (index: number): string => {
      if (Math.ceil(rating) === index && rating % 1 !== 0) {
        return "StarHalfIcon";
      } else if (hoverRating && hoverRating >= index) {
        return "StarFullIcon";
      } else if (!hoverRating && rating >= index) {
        return "StarFullIcon";
      } else {
        return "StarEmptyIcon";
      }
    },
    [rating, hoverRating]
  );

  const ratingGenerator = useMemo(() => {
    const stars = Array(INITIAL_COUNT)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <div
          key={idx}
          // onMouseOver={(e) => onRating && onRating(e, idx)}
          onClick={(e) => onRating && onRating(e, idx)}
          // onMouseLeave={(e) => onRating && onRating(e, idx)}
        >
          <div>{IconMap[getSvgName(idx)]}</div>
        </div>
      ));
    return (
      <div className="flex cursor-pointer select-none">
        <div className="pr-2">{stars}</div>
      </div>
    );
  }, [getSvgName]);

  useEffect(() => {
    setRating(userRating);
  }, [userRating]);

  return {
    ratingGenerator,
    onRating,
  };
}

export default useRating;
