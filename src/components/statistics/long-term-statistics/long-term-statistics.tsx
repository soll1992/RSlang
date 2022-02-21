/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ResponsiveLine } from '@nivo/line';
import React from 'react';

export const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    colors={'#55f07c'}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 0,
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    curve="catmullRom"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      /* legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle', */
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 1,
      /* legend: 'count',
      legendOffset: -43,
      legendPosition: 'middle', */
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    isInteractive={false}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);
