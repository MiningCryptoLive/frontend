import React from 'react';
import { Button } from 'src/components/Button';
import { Content } from 'src/components/layout/Content';
import DynamicList from 'src/components/layout/List/List';
import { Mono, Ws } from 'src/components/Typo/Typo';
import { useAsyncState } from 'src/hooks/useAsyncState';
import { useReduxState } from 'src/rdx/useReduxState';
import { ApiPoolCoinFull } from 'src/types/PoolCoin.types';
import { useCounterValue } from 'src/utils/currencyValue';
import { fetchApi } from 'src/utils/fetchApi';
import { formatSi } from 'src/utils/si.utils';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  padding-top: 5rem;
  padding-bottom: 5rem;

  h2 {
    font-size: 2rem;
  }
`;

export const CoinsWeMineSection = () => {
  const dataState = useAsyncState<ApiPoolCoinFull[]>('coinsFull');
  React.useEffect(() => {
    dataState.start(fetchApi('/pool/coinsFull'));
  }, []);

  return (
    <Wrapper>
      <Content contentCenter>
        <h2>Coins we mine</h2>
        <p>
          Flexpool is a Multi-Coin mining pool, which means that you can mine
          your multiple favorite coins on Flexpool.
        </p>
        <br />
        <DynamicList
          isLoading={dataState.isLoading}
          loadingRowsCount={1}
          data={dataState.data || []}
          columns={[
            {
              title: 'Name',
              skeletonWidth: 110,
              Component: ({ data }) => {
                return <>{data.name}</>;
              },
            },
            {
              title: 'Price',
              alignRight: true,
              skeletonWidth: 80,
              Component: ({ data }) => {
                const v = useCounterValue(data.marketData.prices);
                return <>{v}</>;
              },
            },
            {
              title: 'Market Cap',
              alignRight: true,
              skeletonWidth: 140,
              Component: ({ data }) => {
                const v = useCounterValue(data.marketData.marketCaps);
                return <>{v}</>;
              },
            },
            {
              title: 'Algorithm',
              alignRight: true,
              skeletonWidth: 75,
              Component: ({ data }) => {
                return <>{data.algorithm}</>;
              },
            },
            {
              title: 'Hashrate',
              skeletonWidth: 80,
              alignRight: true,
              Component: ({ data }) => {
                return (
                  <Ws>
                    <Mono>{formatSi(data.hashrate, 'H/s')}</Mono>
                  </Ws>
                );
              },
            },
            {
              title: 'Miners',
              alignRight: true,
              skeletonWidth: 50,
              Component: ({ data }) => {
                return <>{data.minerCount}</>;
              },
            },
            {
              title: '',
              alignRight: true,
              skeletonWidth: 80,
              Component: ({ data }) => {
                return (
                  <Button size="xs" variant="primary">
                    Mine
                  </Button>
                );
              },
            },
          ]}
        />
      </Content>
    </Wrapper>
  );
};
