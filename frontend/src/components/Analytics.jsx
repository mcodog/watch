import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Register required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (startDate && endDate) {
            fetchChartData();
        }
    }, [startDate, endDate]);
    const fetchChartData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `http://localhost:5000/sales-chart`,
                {
                    params: {
                        startDate: new Date(startDate).toISOString().split('T')[0],
                        endDate: new Date(endDate).toISOString().split('T')[0],
                    },
                }
            );
    
            console.log(res)
            const dates = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
            const totalSales = res.data.map(item => item);
    
            const data = {
                labels: dates, // X-axis labels
                datasets: [
                    {
                        label: 'Sales',
                        data: totalSales, // Y-axis data
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        tension: 0.4,
                    },
                ],
            };
    
            setChartData(data);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        console.log(chartData)
    }, [chartData])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Chart',
            },
        },
    };

    return (
        <>
            <div className="chart-container">
                {loading && <div>Loading...</div>}
                {!loading && chartData && <Line data={chartData} options={options} />}
            </div>
            <div className="analytics-control">
                <input
                    type="date"
                    label="Start Date"
                    value={startDate ? startDate : ""}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    label="End Date"
                    value={endDate ? endDate : ""}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </>
    );
};

export default Analytics;
