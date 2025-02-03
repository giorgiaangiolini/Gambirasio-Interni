const axios = require("axios");

const API_KEY = process.env.MAILERLITE_API_KEY;
const BASE_URL = process.env.MAILERLITE_BASE_API_URL;
const GROUP_ID = process.env.MAILERLITE_NEWSLETTER_GROUP_ID;

async function signUp(event, res) {
  if (!event.body) {
    return;
  }

  const { email, name, lastName, city, company, interest } = event.body;


  const url = `${BASE_URL}/subscribers`;

  const data = {
    email: email,
    fields: {
      name: name,
      last_name: lastName,
      city: city,
      company: company,
      interest: interest,
    },
    groups: [`${GROUP_ID}`],
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await axios.post(url, data, options)
    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter.`
      })
    }
    return res.status(201).json({ message: 'success' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }

}

export default signUp ;