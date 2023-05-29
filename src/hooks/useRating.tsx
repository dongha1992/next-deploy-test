import { StarEmptyIcon, StarFullIcon, StarHalfIcon } from "@/utils/svg";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const INITIAL_COUNT = 5;

interface Props {
  userRating?: number;
  isReadOnly?: boolean;
}

function useRating({ userRating = 5, isReadOnly = true }: Props = {}) {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(5);

  const onRenderIcon = useCallback((key: string, style?: any) => {
    const iconMap: { [key: string]: JSX.Element } = {
      StarHalfIcon: <StarHalfIcon props={style} />,
      StarFullIcon: <StarFullIcon props={style} />,
      StarEmptyIcon: <StarEmptyIcon props={style} />,
    };
    return iconMap[key];
  }, []);

  const onRating = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
      if (isReadOnly) return;
      const xPos =
        (e.pageX - e.currentTarget.getBoundingClientRect().left) /
        e.currentTarget.offsetWidth;

      setHoverRating(idx);

      if (xPos <= 0.5) {
        idx -= 0.5;
      }

      setRating(idx);
    },
    [setRating, isReadOnly]
  );

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

  const ratingGenerator = useCallback(
    (style?: any) => {
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
            <div className="pr-1">{onRenderIcon(getSvgName(idx), style)}</div>
          </div>
        ));
      return (
        <div className="flex cursor-pointer select-none">
          <div className="pr-2 flex">{stars}</div>
        </div>
      );
    },
    [getSvgName, onRating, onRenderIcon]
  );

  useEffect(() => {
    setRating(userRating);
  }, [userRating]);

  return {
    ratingGenerator,
    onRating,
    rating,
  };
}

export default useRating;
