import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ labels, scores }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: '평량 평균',
                data: scores,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.4)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 4.5,
            },
        },
    };

    return (
        <div style={{ width: '600px', margin: '0 auto' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;