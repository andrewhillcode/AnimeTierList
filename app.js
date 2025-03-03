const express = require('express');
const path = require('path');
const hbs = require('hbs');
const tierList = require('./tierList');

const app = express();

const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');

app.get('', async (req, res) => {
    if (!req.query.user) {
        return res.render('index');
    }
    const { user } = req.query;   
    const tiers = await tierList.fetchTierLists(req.query.user);
    const animes = tierList.tallyAnimeScores(tiers);
    res.render('tierList', { animes, user });
});

app.listen(process.env.PORT || 5000, () => {
        console.log('Server is up on port 5000');
});