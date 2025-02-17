import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import NavBar from '../components/NavBar';
import TimeComp from '../components/TimeComp';
import "../css/home.css"
function EarningsPage() {
    const [salesData, setSalesData] = useState([]);
    const chartRef = useRef(null);

    // Dummy data for demonstration
    const dummySalesData = [
        { id: 1, amount: 2000, profit: 2000 },
    ];

    // Function to fetch sales data from an API
    const fetchSalesData = () => {
        // Simulated API call
        setTimeout(() => {
            setSalesData(dummySalesData);
        }, 1000); // Simulate delay
    };

    useEffect(() => {
        // Fetch sales data when component mounts
        fetchSalesData();
    }, []);

    // Function to calculate total sales, profits, and losses
    const calculateTotal = () => {
        let totalSales = 0;
        let totalProfit = 0;
        let totalLoss = 0;

        salesData.forEach(sale => {
            totalSales += sale.amount;
            if (sale.profit > 0) {
                totalProfit += sale.profit;
            } else {
                totalLoss += sale.profit;
            }
        });

        return { totalSales, totalProfit, totalLoss };
    };

    // Calculate total sales, profits, and losses
    const { totalSales, totalProfit, totalLoss } = calculateTotal();

    // Function to create chart
    const createChart = () => {
        if (chartRef.current) {
            // Destroy existing chart if it exists
            if (chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }

            // Create new chart
            const ctx = chartRef.current.getContext('2d');
            chartRef.current.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Total'],
                    datasets: [
                        {
                            label: 'Sales',
                            data: [totalSales],
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            barThickness: 120,
                        },
                        {
                            label: 'Profit',
                            data: [totalProfit],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            barThickness: 120,

                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    };

    useEffect(() => {
        createChart();
    }, [salesData]);

    return (
        <div style={{ display: "flex" }}>
            <NavBar />
            <div className='group-dashboard'>
                <div className='dashboard-nav'><p className='heading'>Dashboard</p>
                    <div className='dashboard-data'>
                        <p>Total Sales: ₹<span style={{color: "rgb(66, 133, 244)"}}>{totalSales} </span></p>
                        <p>Total Profit: ₹<span style={{color: "green"}}>{totalProfit}</span></p>
                        <p>Total Loss: ₹<span  style={{color: "red"}}>{totalLoss}</span></p>
                    </div>
                </div>
                <div style={{ width: "90%", marginLeft: "10px", marginLeft: "20px", marginTop: "0px"}}>

                    <div className='chart'>
                        <p style={{fontWeight: "500"}}>Sales Details:</p>
                        <canvas id="salesChart" ref={chartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EarningsPage;
