const axios = require('axios');
require('dotenv').config();

exports.handler = async function(event, context) {

    const params = event.queryStringParameters;
    const slug = params.slug;
    const API_KEY = process.env.API;

    try {
        const response = await axios.get(`https://api.challonge.com/v1/tournaments/${slug}/matches.json?api_key=${API_KEY}`);
        const matches = response.data;
        const total = matches.length;
        const pending = matches.filter(m=>m.match.state === "pending").length;
        const complete = matches.filter(m=>m.match.state === "complete").length;
        const open = matches.filter(m=>m.match.state === "open").length;
        const inProgress = matches.filter(m=>m.match.underway_at !== null && m.match.state === "open").length;
        const body = JSON.stringify({pending,complete,open,total,inProgress})
        return {
            headers: { 'Access-Control-Allow-Origin': '*' }, // CORS requirement
            statusCode: 200,
            body: body
        };
    } 
    catch (error) {
        console.error(error);
    }
    
}