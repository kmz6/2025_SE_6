import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const HorizontalBarChart = ({ labels, scores }) => {
    const data = {
        labels,
        datasets: [
            {
                label: '학점별 비율(%)',
                data: scores,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: (value) => `${value}%`,
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: context => `${context.parsed.x.toFixed(1)}%`,
                },
            },
        },
    };

    return (
        <div style={{ width: '600px', margin: '0 auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default HorizontalBarChart;