const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Auto Net-Profit Commission Calculator (12% - 15% Slab)
function calculateCommission(orderValue) {
    let slabRate = 0.12; // Base 12%
    if (orderValue >= 1000) slabRate = 0.15; // 15% for higher margin orders
    return (orderValue * slabRate).toFixed(2);
}

// Empirical AI Friend Response & Dynamic Affiliate Route
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    const lowerMsg = (message || '').toLowerCase();
    
    let reply = "Main bilkul samajhta hoon. Aap udaas mat hoiye, main aapka dost hoon aur hamesha aapke sath hoon! BATAO aaj aur kya chal raha hai?";
    let affiliateLink = null;
    let affiliateText = null;

    // Organic Keyword Detectors (Food / Fatigue)
    if (lowerMsg.includes('bhookh') || lowerMsg.includes('khana') || lowerMsg.includes('pizza') || lowerMsg.includes('food')) {
        reply = "Aapne khana khaya? Agar thak gaye hain toh thoda rest kar lijiye aur kuch achha order kar lijiye. Yahan se check kar sakte hain:";
        affiliateLink = "https://www.zomato.com";
        affiliateText = "Order Food On Partner Outlet (Special Discount)";
    } else if (lowerMsg.includes('thak') || lowerMsg.includes('stress') || lowerMsg.includes('tension')) {
        reply = "Aaj lagta hai kaafi thaka dene wala din tha. Ek chota break lijiye, thoda paani pijiye. Main yahin hoon aapke sath baat karne ke liye!";
    }

    res.json({
        reply,
        affiliateLink,
        affiliateText,
        commissionSlabEst: calculateCommission(500) // Example 500 INR order
    });
});

// Auto Data Selling Marketplace API (Anonymized Signals Export)
app.get('/api/data-marketplace/signals', (req, res) => {
    res.json({
        status: "success",
        dataSignalCount: 45200,
        anonymizedSample: [
            { id: "sig_101", region: "IN-RJ", mood: "Anxiety/Stress", topic: "Wellness", timestamp: new Date() },
            { id: "sig_102", region: "IN-DL", mood: "Hunger", topic: "Food/Swiggy", timestamp: new Date() }
        ]
    });
});

// Safe Fallback Route to Index.html
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const publicIndexPath = path.join(__dirname, 'public', 'index.html');

    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else if (fs.existsSync(publicIndexPath)) {
        res.sendFile(publicIndexPath);
    } else {
        res.status(200).send("Pally Engine Backend is Active. Add index.html to root directory.");
    }
});

app.listen(PORT, () => {
    console.log(`Pally Engine Server running on port ${PORT}`);
});
