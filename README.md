# Back Piratica Nuntium

## Overview

Piratica Nuntium is a backend application designed to manage and deliver content for the Piratica Nuntium project.
This project aims to provide a backend solution for scraping the https://news.ycombinator.com/news page and then saving the data obtained in a MongoDB database, so that it can then be consulted from the frontend.

## Features

- RESTful API for data management
- Data storage and retrieval
- Configuration management using `vercel.json`

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Git for version control
- Vercel for deployment

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/JCBalabuch/Back_PiraticaNuntium.git
```

2. Navigate to the project directory:

```bash
cd Back_PiraticaNuntium
```

3. Install the required dependencies:

```bash
npm install
```

4. Set up your environment variables. Create a .env file in the root directory and add your configuration settings.

```bash
DDBB_URL= // Your MongoDB URL
SCRAP_URL=https://news.ycombinator.com/news
```

5. Start the application:

```bash
npm run dev
```

6. Start the scrap and save in DB

```bash
npm run scrap
```

## Usage

Once the application is running, you can access the API at http://localhost:3000 (or the port you configured).
Use tools like Postman or Insomnia to interact with the API.

## Deploy

## API Endpoints

- GET = '/get-all-news'
- GET = '/get-news-by-field'
- GET = '/get-sorted-news'
- POST = '/scrap-news'

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Jeniffer Balabuch // [Github](https://www.github.com/JCBalabuch) - [Linkedin](https://www.linkedin.com/in/jenifferbalabuch/) - [Portfolio](https://portfoliojcbs.netlify.app/)

## Feedback

If you have any feedback, please reach out with me to the Linkedin or Github.
