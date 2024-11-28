require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const brandRoutes = require('./routes/brandRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const Order = require('./models/Order');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err));


app.use('/api/auth', authRoutes);
app.use('/api', brandRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', reviewRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/sales-chart', async (req, res) => {
    console.log("ds");
    try {
        // Aggregate sales grouped by both year and month
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$orderDate" },  // Group by year
                        month: { $month: "$orderDate" }, // Group by month
                    },
                    totalSales: { $sum: "$totalPrice" },
                },
            },
            {
                $project: {
                    year: "$_id.year", // Include year
                    month: "$_id.month", // Include month
                    totalSales: 1,
                    _id: 0, // Exclude the default _id field
                },
            },
        ]);

        // Initialize an array with 12 zeros for 12 months
        const salesByMonth = Array(12).fill(0);

        // Map the aggregated data to the correct indices (1-based to 0-based)
        monthlySales.forEach(({ month, totalSales }) => {
            salesByMonth[month - 1] = totalSales;
        });

        // Send the response with the year, month, and total sales data
        res.status(200).json(monthlySales);
    } catch (error) {
        res.status(500).json({ error: "Error calculating monthly sales", details: error.message });
    }
});
