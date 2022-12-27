# Web Scraper for ibbi.gov.in
===========================

> This repository contains a web scraper that retrieves information from the Indian Bankruptcy Board of India (IBBI) website (<https://ibbi.gov.in/en/tender>). The scraper retrieves details of tenders, including the date, subject, and contract awarded to, from multiple pages of the website and saves them to a JSON file.

> Dependencies
------------

This project requires the following dependencies:

-   Puppeteer: a Node.js library for controlling a headless Chrome browser
-   fs: a Node.js core module for working with the file system

Usage
-----

> To use this scraper, you will need to have Node.js installed on your machine. Once you have cloned this repository, navigate to the project directory and run the following command to install the dependencies:

Copy code

`npm install`

> You can then run the scraper using the following command:

Copy code

`node scraper.js`

> This will scrape the specified number of pages on the IBBI website and save the details to a file named `details.json`. You can adjust the number of pages to be scraped by modifying the `totalPages` variable at the top of the script.
