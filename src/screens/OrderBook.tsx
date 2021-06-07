import React, { useState, useEffect, useMemo } from 'react';
import { useWebSocket } from 'ahooks';
import { Button, Table, Typography } from 'antd';
import { SwapOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { sortedOrderList } from '../utils/sortedOrderList';
import { Layout, FlexBox } from '../components';

const { Text, Title } = Typography;

const OrderListHeader = styled.div`
  background: #1d1d1d;
  padding: 1rem 3rem;
`;

const OrderListTable = styled(Table)`
  width: 50%;
`;

const OrderTableButton = styled(Button)`
  margin: 0 1rem;
  width: 150px;
  height: 36px;
`;

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

enum TradePair {
  ETHUSD = 'ETHUSD',
  XBTUSD = 'XBTUSD',
}

const genTableColumns = (tableType: 'bids' | 'asks') => [
  {
    title: 'Price',
    dataIndex: 'price',
    key: `price_${tableType}`,
    render: (text: string) => (
      <Text type={tableType === 'bids' ? 'success' : 'danger'}>{text}</Text>
    ),
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: `size_${tableType}`,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: `total_${tableType}`,
  },
];

export const OrderBook: React.VFC = () => {
  const [tradePair, setTradePair] = useState<TradePair>(TradePair.XBTUSD);
  const [switchTradePair, setSwitchTradePair] = useState<boolean>(false);
  const [bidList, setBidList] = useState<Array<OrderBookItem>>([]);
  const [asksList, setAskList] = useState<Array<OrderBookItem | any | null>>([]);

  const subTitle = `${tradePair === TradePair.XBTUSD ? 'BTC' : 'ETH'}/USD`;
  const message = `{"event":"subscribe", "feed":"book_ui_1","product_ids":["PI_${tradePair}"] }`;

  const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
    'wss://www.cryptofacilities.com/ws/v1'
  );

  useEffect(() => {
    if (readyState === 1) {
      switchTradePair && setSwitchTradePair(false);
      sendMessage && sendMessage(message);
    }
  }, [readyState]);

  useEffect(() => {
    if (switchTradePair) {
      disconnect && disconnect();
      setBidList([]);
      setAskList([]);
      connect && connect();
      setTradePair(tradePair === TradePair.XBTUSD ? TradePair.ETHUSD : TradePair.XBTUSD);
    }
  }, [switchTradePair]);

  useMemo(() => {
    if (readyState === 1 && latestMessage?.data) {
      const result = JSON.parse(latestMessage.data) as ResponseMessage;
      const { product_id } = result;

      if (result.bids?.length > 0 && product_id === `PI_${tradePair}`) {
        const sortedBids = sortedOrderList({
          list: result.bids,
          grabSnapshot: !!result?.numLevels,
          cacheList: bidList,
        });
        setBidList(sortedBids);
      }
      if (result.asks?.length > 0 && product_id === `PI_${tradePair}`) {
        const sortedAsks = sortedOrderList({
          list: result.asks,
          cacheList: asksList,
          grabSnapshot: !!result?.numLevels,
          ascend: true,
        });

        setAskList(sortedAsks);
      }
    }
  }, [readyState, latestMessage]);

  return (
    <Layout>
      <OrderListHeader>
        <Title level={4}>{subTitle}</Title>
      </OrderListHeader>
      <FlexBox>
        <OrderListTable
          dataSource={bidList}
          columns={genTableColumns('bids').reverse()}
          scroll={{ y: 600 }}
          pagination={false}
          loading={bidList.length <= 0}
        />
        <OrderListTable
          dataSource={asksList}
          columns={genTableColumns('asks')}
          scroll={{ y: 600 }}
          pagination={false}
          loading={asksList.length <= 0}
        />
      </FlexBox>
      {(bidList.length > 0 || asksList.length > 0) && (
        <FlexBox horizontalGap>
          <OrderTableButton
            type="primary"
            icon={<SwapOutlined />}
            onClick={() => setSwitchTradePair(!switchTradePair)}
          >
            Toggle Feed
          </OrderTableButton>
          <OrderTableButton
            type="primary"
            icon={<ExclamationCircleOutlined />}
            onClick={() => console.log('kill feed')}
            danger
          >
            Kill Feed
          </OrderTableButton>
          <OrderTableButton
            disabled={!(readyState === 1 || readyState === 3)}
            type="dashed"
            ghost
            onClick={() => {
              if (readyState === 1) {
                disconnect && disconnect();
              } else {
                connect && connect();
              }
            }}
          >
            {readyState === 1 ? 'Disconnect' : 'Connect'}
          </OrderTableButton>
        </FlexBox>
      )}
    </Layout>
  );
};
