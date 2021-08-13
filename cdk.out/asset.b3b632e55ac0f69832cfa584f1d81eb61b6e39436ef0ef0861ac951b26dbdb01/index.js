// services/node-lambda/hello.ts
async function handler(event, context) {
  return {
    statusCode: 200,
    body: "more lambda greetings, this time with TS"
  };
}
module.exports = { handler };
