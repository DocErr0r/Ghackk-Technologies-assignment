const express = require('express');
const router = express.Router();
// i am taking mock data for this
// const Webtoon = require('../models/webtoon');

const axios = require('axios');
const cheerio = require('cheerio');

const webtoons = [
  {
    title: "Tower of God",
    image: "https://animemangatoon.com/wp-content/uploads/2024/06/tower-of-god.webp",
    description: "Follow Bam as he climbs the mysterious tower to find his only friend, Rachel."
  },
  {
    title: "Solo Leveling",
    image: "https://animemangatoon.com/wp-content/uploads/2024/06/Screenshot-2024-10-01-090334-750x375.webp",
    description: "Sung Jin-Woo, the weakest of all hunters, becomes the strongest S-rank hunter."
  },
  {
    title: "Second Life Ranker",
    image: "https://animemangatoon.com/wp-content/uploads/2024/06/Second-life-ranker-750x375.webp",
    description: "Second Life Ranker tells the story of Yeon-Woo who is searching for his twin brother."
  },
  {
    title: "Noblesse",
    image: "https://animemangatoon.com/wp-content/uploads/2024/06/noblesse-750x375.webp",
    description: "A powerful vampire noble wakes from an 820-year slumber and tries to blend in with the modern world."
  },
  {
    title: "The God of High School",
    image: "https://animemangatoon.com/wp-content/uploads/2024/06/Screenshot-2024-10-01-000548-750x375.webp",
    description: "Jin Mori enters a martial arts tournament to prove he's the strongest fighter in Korea."
  }
];

let votes = {
  manhwa: 0,
  anime: 0
};


// Get all webtoons
router.get('/webtoons', async (req, res) => {
  // const webtoons = await Webtoon.find();
  res.json(webtoons);
});

// Vote for manhwa or anime
router.post('/vote', async (req, res) => {
  const {  voteType } = req.body;
  if (voteType === 'manhwa') {
    votes.manhwa += 1;
  } else if (voteType === 'anime') {
    votes.anime += 1;
  }

  res.json({ success: true });

});

// Get voting results
router.get('/results', async (req, res) => {
  // const results = await Webtoon.find();
  res.json(votes);
});

// Route to scrape webtoons
router.get('/scrape-webtoons', async (req, res) => {
  try {
    const url = 'https://animemangatoon.com/best-fantasy-manhwa-webtoons/';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Array to store scraped webtoons
    let webtoons = [];

    $('div.elementor-post').slice(0, 5).each((i, element) => {
      const title = $(element).find('h3.elementor-post__title').text();
      const image = $(element).find('img').attr('src');
      const description = $(element).find('.elementor-post__excerpt').text().trim();

      webtoons.push({ title, image, description });
    });
    console.log($);

    res.json({ data: $ });
  } catch (error) {
    console.error('Error scraping webtoons:', error);
    res.status(500).json({ error: 'Failed to scrape webtoons' });
  }
});

module.exports = router;
