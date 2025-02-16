const { promisify } = require("util");
const { sign, verify } = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/env");
const JsonedResponseError = require("../errors/JsonedResponseError");

const jwtVerify = promisify(verify);

const accessTokenGenerator = (payload, expirationTime = null) => {
  const token = sign(
    { id: payload.id, role: payload.role },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: expirationTime ? expirationTime : ACCESS_TOKEN_EXPIRES_IN,
    }
  );
  return token;
};

const refreshTokenGenerator = (payload, expirationTime = null) => {
  const token = sign(
    { id: payload.id, role: payload.role },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: expirationTime ? expirationTime : REFRESH_TOKEN_EXPIRES_IN,
    }
  );
  return token;
};

const verifyAccessToken = async (accessToken) => {
  try {
    const payload = await jwtVerify(accessToken, ACCESS_TOKEN_SECRET);
    return payload;
  } catch (err) {
    throw new JsonedResponseError("Invalid accssToken", 403);
  }
};

const verifyRefreshToken = async (refreshToken) => {
  try {
    const payload = await jwtVerify(refreshToken, REFRESH_TOKEN_SECRET);
    return payload;
  } catch (err) {
    throw new JsonedResponseError("Invalid refreshToken", 403);
  }
};



module.exports = {
  accessTokenGenerator,
  refreshTokenGenerator,
  verifyAccessToken,
  verifyRefreshToken,
};
