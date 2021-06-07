import { ResponseMessage, OrderBookItem } from '../screens';

interface ISortedOrderList {
  list: Array<Array<number>>;
  cacheList: Array<OrderBookItem>;
  grabSnapshot?: boolean;
  ascend?: boolean;
}

export const sortedOrderList = ({
  list,
  grabSnapshot,
  cacheList = [],
  ascend,
}: ISortedOrderList) => {
  let sortedList;
  if (grabSnapshot) {
    sortedList = list.reduce((formattedBids, curBid) => {
      const [price, size] = curBid;
      return [...formattedBids, { price, size, total: size }];
    }, cacheList);
  } else {
    const bidsWithNewSize = list.reduce((sum, curBid) => {
      const [price, size] = curBid;
      if (size === 0) {
        return sum;
      }
      if (sum.length <= 0) {
        return [{ price, size, total: size }];
      }
      const bidItemIdx = sum.findIndex((bidItem) => bidItem?.price === price);
      if (bidItemIdx >= 0) {
        sum[bidItemIdx].size = size;
        return sum;
      }
      return [{ price, size, total: size }, ...sum];
    }, cacheList);

    const scenseBids = bidsWithNewSize.sort((a, b) =>
      ascend ? a.price - b.price : b.price - a.price
    );
    sortedList = scenseBids.reduce((updatedBids, curBid, idx) => {
      const { price, size } = curBid;
      if (size === 0) {
        return updatedBids;
      }
      const amountOfUpperLevel = idx === 0 ? 0 : updatedBids[idx - 1].total || 0;
      return [...updatedBids, { price, size, total: size + amountOfUpperLevel }];
    }, [] as Array<OrderBookItem>);
  }
  return sortedList;
};
