import puppeteer from "puppeteer";
import fs from 'fs';

const totalPages = 3;
const url = `https://ibbi.gov.in/en/tender`;

//its logical to to make it async cause in scrapping we have to wait for things to execute before we execute another
(async()=>{
//first step is to open up the browser 
const browser  = await puppeteer.launch({headless:true}); //there is 2 types which is head and headless in head its basically open the browser and do it in headless it will not open browser physically
const page = await browser.newPage() //open new page


let details = []; // create an empty array to store the details from all pages

// iterate over the pages
for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
  // navigate to the page
  await page.goto(`${url}?page=${pageNumber}`);

  // scrape the details from the page
  const pageDetails = await page.evaluate(() => {
    const tagAddress = document.querySelectorAll(".cols-4 td")
    let detailArr = []

    tagAddress.forEach((tag) => {
      detailArr.push(tag.innerText)
    })

    let newDetails = []
    for (let i = 0; i < detailArr.length; i++) {
      // divide the array into groups of 3 elements
      if (i % 3 === 0) {
        newDetails.push({
          Date: detailArr[i].trim(),
          Subject: detailArr[i + 1].trim(),
          contractAwardedTo: detailArr[i + 2].trim(),
        })
      }
    }

    return newDetails;
  });

  // add the details from the current page to the details array
  details = [...details, ...pageDetails];
}

console.log(details);

// close the browser
await browser.close();

// convert the details to JSON string and 2 will make the data cleaner 
const jsonString = JSON.stringify(details, null, 2)

// save the details to a file
fs.writeFile('details.json',jsonString,(err)=>{
  if (err) throw err;
  console.log("file saved");
})
})()
