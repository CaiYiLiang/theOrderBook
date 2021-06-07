export type OrderBookItem = {
  price: number;
  size: number;
  total?: number;
};

export type ResponseMessage = {
  numLevels: number;
  product_id: string;
  feed: string | undefined;
  bids: Array<Array<number>>;
  asks: Array<Array<number>>;
};

export enum TradePair {
  ETHUSD = 'ETHUSD',
  XBTUSD = 'XBTUSD',
}
