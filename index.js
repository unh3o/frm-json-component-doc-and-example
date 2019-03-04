const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const PORT = process.env.PORT || 5000;
const TOKEN = 'random_token_you_set_on_the_frm';

const app = express();

app.set('port', PORT);

app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noCache());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(bodyParser.json());

// This route will be set up on the URL input field of the JSON Component element on FRM,
// for example "https://your.own.domain/webhook".
app.post('/webhook', async (req, res) => {
  const {
    token,
    firstName,
    lastName,
    profileImage,
    locale,
    timezone,
    gender,
    pageID,
    psID,
    triggerMessageType,
    triggerMessageBody,
  } = req.body;

  if (token !== TOKEN) {
    return res.status(403)
      .json({
        error: 'Wrong validation token.',
      })
      .send();
  }

  const messages = [
    { text: `Hi ${firstName}!` },
    { text: 'Welcome to use FRM feature "JSON Component"!' },
    { text: `Your last name is ${lastName}` },
    { text: `Your locale setting on facebook is ${locale}` },
    { text: `Your timezone setting on facebook is ${timezone}` },
    { text: `Your gender setting on facebook is ${gender}` },
    { text: `The id of the page you are using is ${pageID}` },
    { text: `Your page scoped id on this page is ${psID}` },
    { text: `The type of message that triggered this JSON Component message reply is ${triggerMessageType}` },
    { text: `The body of message that triggered this JSON Component message reply is ${triggerMessageBody}` },
    {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          image_aspect_ratio: 'square',
          elements: [{
            title: 'Finally make a card for you, and hope you have a nice day.',
            image_url: profileImage,
            buttons: [{ type: 'web_url', title: 'Download your own profile image', url: profileImage }],
          }],
        },
      },
    },
  ];

  return res.status(200)
    .json(messages)
    .send();
});

app.listen(
  app.get('port'), () => {
    console.log('running on port', app.get('port'));
  },
);
