import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners'; // Import BeatLoader
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Doughnut, Line, PolarArea } from 'react-chartjs-2';
import revenueData from '../data/revenueData.json';
import sourceData from '../data/sourceData.json';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Dashboard = () => {
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setLoading(false); 
        };

        fetchData();
    }, []);

    // Check if data is still loading
    if (loading) {
        return (
            <div className="loader-container w-[100%] h-screen flex justify-center items-center">
                <BeatLoader color="#3498db" loading={loading} size={15} /> {/* BeatLoader */}
            </div>
        );
    }

    const revenueLabels = revenueData.map((data) => data.label);
    const labels = sourceData.map((data) => data.label);
    const revenueValues = revenueData.map((data) => data.revenue);
    const revenueCosts = revenueData.map((data) => data.cost);
    const dataValues = sourceData.map((data) => data.value);

    const layout = [
        { i: 'lineChart', x: 0, y: 0, w: 6, h: 4 },
        { i: 'barChart', x: 0, y: 4, w: 6, h: 4 },
        { i: 'doughnutChart', x: 6, y: 4, w: 6, h: 4 },
        { i: 'polararea', x: 6, y: 8, w: 6, h: 4 },
    ];

    const mobileLayout = [
        { i: 'lineChart', x: 0, y: 0, w: 12, h: 4 },
        { i: 'barChart', x: 0, y: 4, w: 12, h: 4 },
        { i: 'doughnutChart', x: 0, y: 8, w: 12, h: 4 },
        { i: 'polararea', x: 0, y: 12, w: 12, h: 4 },
    ];

    const isMobile = window.innerWidth <= 768;

    return (
        <GridLayout
            className="layout max-h-[800px] bg-gray-100 overflow-y-scroll"
            layout={isMobile ? mobileLayout : layout}
            cols={isMobile ? 14 : 12}
            rowHeight={75}
            width={isMobile ? window.innerWidth : 1200}
            draggableHandle=".drag-handle"
        >
            <div key="lineChart" className="bg-white rounded-md p-4 pb-16">
                <div className="drag-handle" style={{ cursor: 'move', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    Drag to move this chart
                </div>
                <Line
                    data={{
                        labels: revenueLabels,
                        datasets: [
                            {
                                label: 'Revenue',
                                data: revenueValues,
                                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Cost',
                                data: revenueCosts,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        elements: { line: { tension: 0.5 } },
                        plugins: {
                            legend: { position: 'top', labels: { font: { family: 'Poppins' } } },
                            title: { display: true, text: 'Revenue vs Cost' },
                        },
                    }}
                />
            </div>

            <div key="barChart" className="bg-white rounded-md p-4 pb-16">
                <div className="drag-handle" style={{ cursor: 'move', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    Drag to move this chart
                </div>
                <Bar
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Count',
                                data: dataValues,
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(255, 99, 132, 0.5)',
                                    'rgba(255, 206, 86, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(153, 102, 255, 0.5)',
                                ],
                                borderWidth: 1,
                                borderRadius: 5,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top', labels: { font: { family: 'Poppins' } } },
                            title: { display: true, text: 'Bar Chart' },
                        },
                    }}
                />
            </div>

            <div key="doughnutChart" className="bg-white rounded-md p-4 pb-16">
                <div className="drag-handle" style={{ cursor: 'move', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    Drag to move this chart
                </div>
                <Doughnut
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Count',
                                data: dataValues,
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(255, 99, 132, 0.5)',
                                    'rgba(255, 206, 86, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(153, 102, 255, 0.5)',
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(153, 102, 255, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top', labels: { font: { family: 'Poppins' } } },
                            title: { display: true, text: 'Doughnut Chart' },
                        },
                    }}
                />
            </div>

            <div key="polararea" className="bg-white rounded-md p-4 pb-16">
                <div className="drag-handle" style={{ cursor: 'move', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    Drag to move this chart
                </div>
                <PolarArea
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Count',
                                data: dataValues,
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(255, 99, 132, 0.5)',
                                    'rgba(255, 206, 86, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(153, 102, 255, 0.5)',
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(153, 102, 255, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top', labels: { font: { family: 'Poppins' } } },
                            title: { display: true, text: 'Polar Area Chart' },
                        },
                    }}
                />
            </div>
        </GridLayout>
    );
};

export default Dashboard;
