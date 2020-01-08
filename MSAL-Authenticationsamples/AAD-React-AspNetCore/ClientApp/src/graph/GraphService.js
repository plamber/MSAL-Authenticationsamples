var graph = require('@microsoft/microsoft-graph-client');

function getGraphClient(accessToken) {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate
        // requests
        authProvider: (done) => {
            done(null, accessToken.accessToken);
        }
    });

    return client;
}

export async function getUserDetails(accessToken) {
    const client = getGraphClient(accessToken);
    return await client.api('/me').get();
}