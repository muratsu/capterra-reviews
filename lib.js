const originalFetch = require('node-fetch');
const fetch = require('fetch-retry')(originalFetch);
const ChromeAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36';

// Exponential backoff
const retryDelay = (attempt, error, response) => {
  return Math.pow(2, attempt) * 1000; // 1000, 2000, 4000, 16000, ...
}

const fetchReviews = async (productId) => {
  const baseUrl = `https://www.capterra.com/spotlight/rest/reviews?apiVersion=2&productId=${productId}`;
  let total = 0;

  try {
    const res = await fetch(baseUrl, {
      headers: { 'User-Agent': ChromeAgent },
      retries: 5,
      retryDelay
    }).then(res => res.json());
    total = res.totalHits;
  } catch (err) {
    console.log(err);
    return [];
  }

  const per_page = 50;
  const reviews = [];
  let currentPage = 0;

  const fetchPage = async () => {
    try {
      while (currentPage * per_page < total) {
        const url = `${baseUrl}&from=${currentPage * per_page}`;
        const res = await fetch(url, {
          headers: { 'User-Agent': ChromeAgent },
          retries: 5,
          retryDelay
        }).then(res => res.json());
        reviews.push(...res.hits);
        currentPage++;
      }
    } catch (err) {
      console.log(err.message);
      await fetchPage();
    }
  }

  await fetchPage();

  return reviews;
}

module.exports = fetchReviews