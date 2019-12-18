const fetch = require('fetch-retry');

// Exponential backoff
const retryDelay = (attempt, error, response) => {
  return Math.pow(2, attempt) * 1000; // 1000, 2000, 4000, 16000, ...
}

const fetchReviews = async (productId) => {
  const baseUrl = `https://www.capterra.com/spotlight/rest/reviews?apiVersion=2&productId=${productId}`;
  let total = 0;

  try {
    const res = await fetch(baseUrl, {
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
      while ((currentPage + 1) * per_page < total) {
        const url = `${baseUrl}&from=${currentPage * per_page}`;
        const res = await fetch(url, {
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