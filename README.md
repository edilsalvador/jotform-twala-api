## Jotform and Twala API Integration

A basic integration of Jotform's form response and Twala API.

### Pre-requisites
1. Jotform Form
   1. Enabled **Encrypt Form Data** ``(FORM SETTINGS -> Show More Options -> Encrypt Form Data)``
2. Jotform private key file ``(jotform.key)`` after setting up form data encryption 
3. Twala Template w/ custom field if needed
4. Twala API application uuid
5. Twala API application secret
6. Twala API template uuid

### Setup
1. Create `.env` file from `.env.example` and put the right values
2. Place `jotform.key` file to the project root folder
3. Update `send` method in `api.js` based on your template details
4. Run `npm install` & `npm start`

### To Test
1. Deploy the server
2. Go to your form settings and set the URL of **Thank You Page** to your server

> Alternatively, you can use a reverse proxy like [ngrok](https://ngrok.com/) to tunnel your localhost and set the domain generated to your jotform settings to test locally.
