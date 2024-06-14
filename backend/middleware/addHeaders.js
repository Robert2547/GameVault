import IGDB_auth from "../models/authModel.js";

const addHeaders = async (req, res, next) => {
  const latestAuth = await IGDB_auth.findOne().sort({ createdAt: -1 });
  const accessToken = latestAuth.access_token;

  const headers = {
    "Client-ID": process.env.IGDB_CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  req.headers = headers;
  next();
};

export default addHeaders;
