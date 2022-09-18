# amazon-review-sentences
Search Amazon reviews for only the sentences containing the keywords


#### How to Use
1. Install https://nodejs.org/en/
2. Download all of the files into a folder
3. Edit the `1. ASIN.txt`, typing the product's ASIN ID (can be found in the link after 'www.amazon.com/dp/')
4. Edit the `2. Keyword.txt`, typing the keywords you want to search for, separated by newlines (enter)
5. Edit the `3. Number of Pages.txt`, typing the number of pages you want to limit the search to (for products with thousands of reviews)
6. In Command Prompt, navigate to the folder you created using `cd {write the folder filepath here}`
7. Type `npm install node` to install node packages into the folder
8. Type `node index.js` to run the script
9. The output text will be shown in Command Prompt
