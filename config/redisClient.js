const { createClient } = require('redis');

const cache = createClient({
    url: 'redis://localhost:6379' //Habria que pasasrlo al .env no?
})

module.exports = cache