const axios = require('axios');
require('dotenv').config();

exports.handler = async function (event, context) {

    const params = event.queryStringParameters;
    const slug = params.slug;
    const API_KEY = process.env.API;

    return axios
        .get(`https://api.challonge.com/v1/tournaments/${slug}/matches.json?api_key=${API_KEY}`)
        .then((response) => {
            if (response.error) {
                return {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }, // CORS requirement
                    statusCode: 300,
                    body: response.error
                };
            } else {
                const matches = response.data;
                const total = matches.length;
                if (total === 0) {
                    throw "No Event Data Avaialble";
                }
                const pending = matches
                    .filter(m => m.match.state === "pending")
                    .length;
                const complete = matches
                    .filter(m => m.match.state === "complete")
                    .length;
                const open = matches
                    .filter(m => m.match.state === "open")
                    .length;
                const inProgress = matches
                    .filter(m => m.match.underway_at !== null && m.match.state === "open")
                    .length;
                const body = JSON.stringify({pending, complete, open, total, inProgress})
                return {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }, // CORS requirement
                    statusCode: 200,
                    body: body
                };
            }
        })
        .catch((error) => {
            return {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }, // CORS requirement
                statusCode: 300,
                body: '{"Error":"No Event Data Available"}'
            };
        });

}