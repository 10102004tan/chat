'use strict';
const { OAuth2Client } = require('google-auth-library');

async function verifyTokenGoogle({
    idToken
}) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
}

async function verifyCodeGithub({
    code
}) {
    const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
        }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
        return null;
    }

    const accessToken = tokenData.access_token;

    // Get user data
    const userResponse = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
    });

    const userData = await userResponse.json();

    // get user email
    const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
    });

    const emails = await emailResponse.json();

    return {
        ...userData,
        emails,
    };
}

module.exports = {
    verifyTokenGoogle,
    verifyCodeGithub
};