const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;


const ACCOUNTS_FILE = path.join(__dirname, 'accounts.json');
const ORDERS_FILE = path.join(__dirname, 'orders.json');

app.use(express.json());
app.use(cors());


const loadData = (file) => {
    if (!fs.existsSync(file)) return {};
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
        console.error(`Error reading ${file}:`, error);
        return {};
    }
};


const saveData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
};


const generateOrderNumber = () => {
    let orders = loadData(ORDERS_FILE);
    let orderNumbers = Object.values(orders).flat().map(order => order.orderNumber || 0);
    return (Math.max(0, ...orderNumbers) + 1); 
};


app.post('/create-account', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    let accounts = loadData(ACCOUNTS_FILE);
    if (accounts[username]) return res.status(400).json({ error: 'Username already exists' });

    accounts[username] = { points: 0 };
    saveData(ACCOUNTS_FILE, accounts);

    res.json({ message: 'Account created successfully', account: accounts[username] });
});


app.get('/get-account', (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    let accounts = loadData(ACCOUNTS_FILE);
    if (!accounts[username]) return res.status(404).json({ error: 'Account not found' });

    res.json({ account: accounts[username] });
});

app.get('/orders', (req, res) => {
    let orders = loadData(ORDERS_FILE);
    res.json({ orders });
});


app.post('/add-points', (req, res) => {
    const { username, points } = req.body;
    if (!username || typeof points !== 'number') return res.status(400).json({ error: 'Invalid input' });

    let accounts = loadData(ACCOUNTS_FILE);
    if (!accounts[username]) return res.status(404).json({ error: 'Account not found' });

    accounts[username].points += points;
    saveData(ACCOUNTS_FILE, accounts);

    res.json({ message: 'Points added successfully', account: accounts[username] });
});


app.post('/place-order', (req, res) => {
    const { username, meal, quantity, totalPoints } = req.body;

    if (!username || !meal || !quantity || !totalPoints) {
        return res.status(400).json({ success: false, error: "Invalid order details" });
    }

    let accounts = loadData(ACCOUNTS_FILE);
    let orders = loadData(ORDERS_FILE);

    if (!accounts[username]) {
        return res.status(404).json({ success: false, error: "User not found" });
    }

    if (accounts[username].points < totalPoints) {
        return res.status(400).json({ success: false, error: "Not enough points to place the order" });
    }

    accounts[username].points -= totalPoints;
    saveData(ACCOUNTS_FILE, accounts);

    let orderNumber = generateOrderNumber(); 

    const newOrder = {
        orderNumber,
        meal,
        quantity,
        totalPoints,
        timestamp: new Date().toISOString(),
    };

    if (!orders[username]) {
        orders[username] = [];
    }
    orders[username].push(newOrder);
    saveData(ORDERS_FILE, orders);

    res.json({
        success: true,
        message: "Order placed successfully",
        orderNumber,
        remainingPoints: accounts[username].points
    });
});


app.get('/orders', (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    let orders = loadData(ORDERS_FILE);
    if (!orders[username]) return res.status(404).json({ error: 'No orders found for this user' });

    res.json({ success: true, orders: orders[username] });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
