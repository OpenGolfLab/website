const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/data/driver-lineups.json');

// Map fictional 2026 clubs to real 2024 equivalents for the scraper proof-of-concept
const realWorldMap = {
  "TaylorMade": {
    "Qi4D Max": "Qi10 Max Driver",
    "Qi4D": "Qi10 Driver",
    "Qi4D LS": "Qi10 LS Driver"
  },
  "Callaway": {
    "Quantum Max D": "Paradym Ai Smoke Max D Driver",
    "Quantum Max": "Paradym Ai Smoke Max Driver",
    "Quantum TD Max": "Paradym Ai Smoke Triple Diamond Max Driver",
    "Quantum TD": "Paradym Ai Smoke Triple Diamond Driver"
  },
  "PING": {
    "G440 SFT": "G430 SFT Driver",
    "G440 Max": "G430 Max Driver",
    "G440": "G430 Driver",
    "G440 LST": "G430 LST Driver"
  }
};

async function scrapePrice(page, searchQuery) {
  // Let's use Carl's Golfland as the primary target for this prototype
  const url = `https://www.carlsgolfland.com/searchanise/result?q=${encodeURIComponent(searchQuery)}`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  
  try {
    // Wait for the product grid to load
    await page.waitForSelector('.snize-product', { timeout: 8000 });
    
    // Get the price of the first relevant result
    const priceText = await page.locator('.snize-price').first().innerText();
    // Price usually looks like "$599.99" or "From $599.99"
    const parsedPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    return Math.floor(parsedPrice);
  } catch (error) {
    console.error(`Could not find price for ${searchQuery}.`);
    return null;
  }
}

async function main() {
  console.log("Launching headless browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const fileData = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(fileData);

  let updatedCount = 0;

  for (let lineup of data.lineups) {
    if (realWorldMap[lineup.brand]) {
      for (let model of lineup.models) {
        const realQuery = realWorldMap[lineup.brand][model.name];
        if (realQuery) {
          console.log(`Scraping price for ${model.name} (Searching: ${realQuery})...`);
          const livePrice = await scrapePrice(page, realQuery);
          
          if (livePrice && !isNaN(livePrice)) {
            console.log(`=> Found Price: $${livePrice}`);
            // Overwrite the price
            model.price = livePrice;
            updatedCount++;
          }
        }
      }
    }
  }

  await browser.close();

  if (updatedCount > 0) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log(`\nSuccessfully updated ${updatedCount} prices in driver-lineups.json!`);
  } else {
    console.log("\nNo prices were updated.");
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
