# CanIPlayYet

A site to indicate weather you can can friendlies/casual games during the tournament with remaining setups.

Currently hosted on [https://caniplay.netlify.app/](https://caniplay.netlify.app/)

## Setup locally

Make sure you have the latest version of node running on your computer.

Create a .env file with the following content:

```
API: <your-challonge-api-key>
```

`npm install` to install all dependancies

## Running Project

`npm start` will prepare both frontend and backend of the project on localhost

`npm run start:lambda` will prepare the lambda functions on a local server

`npm run build` will create a production ready version for deployment

## Tools Used

The following tools were used for this project

- Next.js for routing and organizing react project.
- Netlify Lambda for lambda functions
- Tailwind.css for styling
- FontAwesome for icons
- Undraw for stock images
- HeroPatterns for background image patterns
- Anime.js for animations/transitions
- Netlify for hosting and deployments
