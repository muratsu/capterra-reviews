Feel free to use this simple script to scrape Capterra reviews.

[![Run on Repl.it](https://repl.it/badge/github/muratsu/capterra-reviews)](https://repl.it/github/muratsu/capterra-reviews)

### Instructions to use
Say you want to scrape the reviews for [boomi](https://www.capterra.com/p/5520/Dell-Boomi/reviews/).

1. Navigate to the `boomi` review page
2. Copy the product id from url (5520 in boomi's case)
3. On index.js assign the product id to the variable `productId` (line 50)
4. Run `node index.js` and once completed `results.csv` will appear