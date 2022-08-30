const axios = require("axios");

const BASE_URL = process.env.TWALA_API_URL;
const APP_UUID = process.env.TWALA_API_APP_UUID;
const APP_SECRET = process.env.TWALA_API_APP_SECRET;
const TEMPLATE_UUID = process.env.TEMPLATE_UUID;

const requestAPI = (action, url, payload) => {
  const URL = `${BASE_URL}${url}`;

  const config = {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Twala-Application-Uuid': APP_UUID,
      'Twala-Application-Secret': APP_SECRET,
    },
  };
  console.log({
    url: URL,
    data: payload,
    method: action.toLowerCase(),
    ...config,
  });

  return axios({
    url: URL,
    data: payload,
    method: action.toLowerCase(),
    ...config,
  });
};

const send = async args => {
  const { firstName, lastName, email, corporation, position, address } = args;
  const payload = {
    template_uuid: TEMPLATE_UUID,
    document_invitations: JSON.stringify([{full_name: `${firstName} ${lastName}`, email, role_uuid: 'fcbe68b0-2882-11ed-aaaf-0fc40a3b2667'}]),
    audit_trail: JSON.stringify({ email: true, uuid: true, author: false, mobile: false, id: false, is_enabled: true }),
    custom_field_values: JSON.stringify([
      {
        annotation_id: "3bd846cc-b038-3569-8fa6-574a8b4682cc",
        value: firstName,
      },
      {
        annotation_id: "06ffd2b0-ce67-b3c6-275e-5913a1ef5747",
        value: corporation,
      },
      {
        annotation_id: "092b9097-bb9f-de76-5183-887d878bc5a9",
        value: address,
      },
      {
        annotation_id: "801b36db-9477-49b3-29d1-1d521403cde6",
        value: position,
      },
    ]),
  };
  return requestAPI('POST', '/send', payload);
};

module.exports = {
  send
};
