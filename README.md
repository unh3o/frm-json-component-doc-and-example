# JSON Component Document

## Overall:

The JSON Component Message enables your bot to generate dynamic content according to different user inputs throughPOST HTTP Requests. Our server will send messages to users according to your server's HTTP Response.

After you set up the JSON Component Message, your server will receive a HTTP Request containing user information and corresponding message content he/she has sent when triggering this message reply configuration via text input or button clicks.

## Specification

### Request Specification:

#### Method: `POST`

#### Content-Type: `application/json`

#### Body Sample:

```json
{
  "token": "for_your_own_security",
  "firstName": "Bob",
  "lastName": "Wang",
  "profileImage": "https://dashboard.frm.ai/assets/FRM-logo-endorsed-reverse-gradient.png",
  "locale": "en_US",
  "timezone": 8,
  "gender": "male",
  "pageID": "123456789",
  "psID": "987654321",
  "triggerMessageType": "plain-text",
  "triggerMessageBody": "Hello"
}
```

#### Request Body JSON Specification:

| Field              | Type   | Description                                                                                                                                                                                                                                                                                                   |
| :----------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token              | string | Tokens allow you to authenticate requests; secure requests will display the correct token.<br>You may enter the token when setting up the JSON Component. Tokens should not be shared with outside parties for security purposes. Only requests displaying the correct token are valid and from FRM's server. |
| firstName          | string | The first name of the user who triggers the JSON Component Message.                                                                                                                                                                                                                                           |
| lastName           | string | The last name of the user who triggers the JSON Component Message.                                                                                                                                                                                                                                            |
| profileImage       | string | The URL of the user's profile picture that triggers the JSON Component Message.                                                                                                                                                                                                                               |
| locale             | string | The locale of the user who triggers the JSON Component Message. It must be a LCID string.<br> (Reference: https://www.science.co.il/language/Locale-codes.php)                                                                                                                                                |
| timezone           | number | The timezone of the user who triggers the JSON Component Message. It must be between 0~23.                                                                                                                                                                                                                    |
| gender             | string | The gender of the user who triggers the JSON Component Message. It must be "male", "female", or null.                                                                                                                                                                                                         |
| pageID             | string | The page ID associated with the bot.                                                                                                                                                                                                                                                                          |
| psID               | string | The page-scoped user ID of the user who triggers the JSON Component Message.                                                                                                                                                                                                                                  |
| triggerMessageType | string | How the JSON Component Message was triggered. Possible values include "plain-text", "button", "image", "video" and "audio".                                                                                                                                                                                   |
| triggerMessageBody | string | The content of the trigger for the JSON Component Message.                                                                                                                                                                                                                                                    |

### Response Specification:

#### Description:

Our server will be expecting your server to respond with messages that you wish to send to users in the JSON format indicated in the following example and the Facebook document (https://developers.facebook.com/docs/messenger-platform/reference/send-api#message).

#### Response Example:

```json
{
  "messages": [
    { "text": "Welcome to the FRM" },
    {
      "attachment": {
        "type": "image",
        "payload": {
          "url": "https://dashboard.frm.ai/assets/FRM-logo-endorsed-reverse-gradient.png"
        }
      }
    },
    {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Hello World!",
          "buttons": [
            {
              "type": "postback",
              "title": "I am payload",
              "payload": "some payload here"
            },
            {
              "type": "web_url",
              "title": "Go to Facebook",
              "url": "https://facebook.com"
            }
          ]
        }
      }
    }
    // Other message formats from facebook document.
  ]
}
```

#### Limitations:

1. Currently, the Personas API (https://developers.facebook.com/docs/messenger-platform/send-messages/personas/) is not available.
2. Currently, Sender Actions are not supported (https://developers.facebook.com/docs/messenger-platform/send-messages/sender-actions/).
3. We have a 10 seconds timeout for the HTTP Request.

## Example Code

### Environment

- Npm
- Node.js v8.9.0 or higher is required.

### Execution

```bash
npm install
node index.js
```

### Test on Real Environment

1. Modify the random token on the example code.
2. Deploy the code on the machine, and make it available by http/https url.
3. Set the url on url input and the random token on the token input on the `JSON Component` type message reply.
