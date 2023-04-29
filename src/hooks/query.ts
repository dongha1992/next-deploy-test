// const useOnLike = () => {
//   return prev?.map((preItem: any) => {
//     if (preItem.id === id) {
//       if (preItem.isLiked) {
//         newLiked = false;
//         if (prev.totalLikes > 0) {
//           newLikeCount = prev.totalLikes - 1;
//         } else {
//           newLikeCount = 0;
//         }
//       } else {
//         newLiked = true;
//         newLikeCount = preItem.totalLikes + 1;
//       }
//       return {
//         ...preItem,
//         liked: newLiked,
//         likeCount: newLikeCount,
//       };
//     } else {
//       return preItem;
//     }
//   });
// };

// const useSyncMutation = (mutationFn: any, options: any) => {
//   const mutationResults = useMutation(mutationFn, options);

//   return {
//     ...mutationResults,
//     mutate: (...params: any) => {
//       if (!mutationResults.isLoading) {
//         mutationResults.mutate(...params);
//       }
//     },
//   };
// };
