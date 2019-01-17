exports.handler = async function(event, context) {
    const params = event.queryStringParameters;
    const slug = params.slug;
    const setups = parseInt(params.setups);
    console.log(slug,setups);

    return {
        headers: { 'Access-Control-Allow-Origin': '*' }, // CORS requirement
        statusCode: 200,
        body: `Yes`
    };
}