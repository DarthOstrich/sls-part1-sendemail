const nodemailer = require('nodemailer');
// grab the variables from the process
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

// create the transport
const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

module.exports.sendEmail = async event => {
  // grab the joke from the API
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  //  grab the JSON
  const joke = await response.json();
  // create HTML template
  const html = `
	<h1>Joke of the Day</h1>
	<p>${joke.value}</p>
	`;

  // send mail with our transport object
  let info = await transport.sendMail({
    from: '"Chuck Norris" <noreply@chuck.com>', // sender address
    to: 'name@email.com', // list of receivers
    subject: 'Daily Joke', // Subject line
    html, // html body
  });

  return {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: joke.value,
      },
      null,
      2,
    ),
  };
};
