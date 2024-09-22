import React from "react";
import { Line, Pie } from '@ant-design/charts';

const Charts = ({ sortedTransactions }) => {
  // Prepare data for the line chart
  const data = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  // Prepare data for the pie chart
  const spendingData = sortedTransactions
    .filter(transaction => transaction.type === "expense")
    .reduce((acc, transaction) => {
      const tag = transaction.tag;
      const amount = transaction.amount;

      // Sum amounts by tag
      const existing = acc.find(item => item.tag === tag);
      if (existing) {
        existing.amount += amount;
      } else {
        acc.push({ tag, amount });
      }
      return acc;
    }, []);

  const config = {
    data,
    xField: "date",
    yField: "amount",
    width: 500,
    autoFit: true,
    height: 250,
    xAxis: {
      title: {
        text: 'Date',
        style: { fill: '#000', fontWeight: 'bold' },
      },
      label: {
        formatter: (text) => moment(text).format('MMM DD'), // Format date as 'Month Day'
      },
      tickInterval: 1, // Set interval between ticks (1 month or any other unit)
      grid: {
        line: { style: { stroke: '#e0e0e0', lineDash: [2, 2] } }, // Customize grid lines
      },
    },
    yAxis: {
      title: {
        text: 'Amount',
        style: { fill: '#000', fontWeight: 'bold' },
      },
    },
  };

  const spendingConfig = {
    data: spendingData,
    width: 500,
    angleField: "amount",
    colorField: "tag",
    pieStyle: {
      fill: 'url(#gradient)', // Use gradient
    },
    height: 250,
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-auto p-4 mt-8 mx-4 sm:mx-8 md:mx-16 space-y-4 md:space-y-0 md:space-x-4">
      <div className="md:w-1/2 shadow-custom rounded-lg p-4 bg-white">
        <h1 className="text-xl font-semibold mb-2">Your Analytics</h1>
        <Line {...config} />
      </div>
      <div className="md:w-1/2 shadow-custom rounded-lg p-4 bg-white">
        <h1 className="text-xl font-semibold mb-2">Your Spending</h1>
        <div className="relative">
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
          <Pie {...spendingConfig} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
