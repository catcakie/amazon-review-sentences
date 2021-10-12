const puppeteer = require("puppeteer");

async function getReviewSentences(page) {
    await page.waitForSelector ('body');
  
    //manipulate the page's content
    let grabPosts = await page.evaluate (() => {
    // find the very first element's classes. scroll to the right to try to find an english word
    let allPosts = document.body.querySelectorAll ('.review');
      
    //store the post items in an array then select to get the descriptions from each
    scrapeItems = [];
    // I want to be able to just use the end of the link to find the keywords later, much more efficient: link.split("=")[5]
    const searchWord = document.body.querySelector("#filterByKeywordTextBox").value;
    allPosts.forEach (item => {

      let review = item.querySelector ('.review-text').innerText;
      let sentenceArray = review.replace(/([.?!])\s*(?=[A-z])/g, "$1|").split("|");
      const boldSearchWord = "**"+searchWord+"**"
      let sentenceResult = sentenceArray.filter(sentence => sentence.toLowerCase().includes(searchWord.toLowerCase())).toString();
      sentenceResult = sentenceResult.replace(searchWord, boldSearchWord);

        if (sentenceResult != "") {
            scrapeItems.push (sentenceResult);
        }
      });

      return scrapeItems;
    });
    //outputting the scraped data
    if (grabPosts.length != 0) {
      console.log (grabPosts);
    }
    
    //closing the browser
    await browser.close ();
}

let ASIN = ""
let fileKeywords = []
let qty = 

fs = require('fs')
fs.readFile('1. ASIN.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  ASIN = data;
});
fs.readFile('2. Keyword.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  fileKeywords = data.split(/\r?\n/);
});
fs.readFile('3. Number of Pages.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  qty = parseInt(data);
});

(async () => {
  const browser = await puppeteer.launch();

  for (let i=0; i<fileKeywords.length; ++i) {
    const baseURL = "https://www.amazon.com/product-reviews/"+ASIN+"/ref=cm_cr_arp_d_viewopt_kywd?ie=UTF8&filterByStar=all_stars&reviewerType=all_reviews&pageNumber=";
    let keyword = fileKeywords[i].replace(" ","+");
    
    const reviews = (await Promise.allSettled(
      [...Array(qty)].map(async (_, i) => {
        const page = await browser.newPage();
        let pageNum = 1+i;
        await page.goto(baseURL+pageNum+"&filterByKeyword="+keyword);
        return getReviewSentences(page);
      })))
      .filter(e => e.status === "fulfilled")
  }

  await browser.close();
})();