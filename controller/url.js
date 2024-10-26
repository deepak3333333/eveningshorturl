const shortid = require("shortid");
const URL = require("../model/url");

async function handleShortUrl(req, res) {
  const body = req.body;

  

  if (!body.url) return res.send("url is required");
  const createdid = shortid(5);

  await URL.create({
    originalurl: body.url,
    shortUrl: createdid,
  });

  return res.render("home",{data:createdid});
}
module.exports = { handleShortUrl };
