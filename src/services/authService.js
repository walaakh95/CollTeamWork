const {
  validateUserRgisteration, // Note: this is spelled as in your original code
  validateUserLogin,
} = require("../validators/authValidator");
const {
  createUser,
  getUserByEmail,
} = require("../repositories/userRepository");
const JsonedResponseError = require("../errors/JsonedResponseError");
const {
  accessTokenGenerator,
  refreshTokenGenerator,
  verifyRefreshToken,
} = require("../utils/tokenManager");
const RefreshTokenRepository = require("../repositories/refreshTokenRepistory");

class AuthService {
  async registerUser(userData) {
    validateUserRgisteration(userData);
    // Check if user already exists
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      throw new JsonedResponseError("User already exists", 409);
    }
    const createdUser = await createUser(userData);
    // Create the user
    return createdUser._id;
  }

  /**
   * Login a user.
   * @param {Object} userLoginData - { email, password }
   * @returns {Object} - { token, user: { id, username, email } }
   */
  async loginUser(userLoginData, ip, userAgent) {
    // Validate input
    validateUserLogin(userLoginData);

    const { email, password } = userLoginData;

    const user = await getUserByEmail(email);
    if (!user || !(await user.validatePassword(password))) {
      throw new Error("Invalid email or password");
    }
    const jsonedUser = user.toJSON({ roleAsName: true });
    const accessToken = accessTokenGenerator(jsonedUser);
    const refreshToken = refreshTokenGenerator(jsonedUser);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshTokenRepository.createRefreshToken(
      refreshToken,
      user._id,
      expiresAt,
      { ip, userAgent }
    );
    return {
      user: jsonedUser,
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken, ip, userAgent) {
    if (!refreshToken) 
      throw new JsonedResponseError("No refresh token provided", 401);
    const storedToken = await RefreshTokenRepository.findRefreshToken(refreshToken);
    if (!storedToken) {
      throw new JsonedResponseError('Refresh token not recognized', 403)
    }
    await RefreshTokenRepository.deleteRefreshToken(refreshToken);
    const payload = await verifyRefreshToken(refreshToken);
    const newAccessToken = accessTokenGenerator(payload)
    const newRefreshToken = refreshTokenGenerator(payload)

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await RefreshTokenRepository.createRefreshToken(newRefreshToken, payload.id, expiresAt, {
      ip,
      userAgent
    });
    return { newAccessToken, newRefreshToken, expiresAt }
  }
}

// Export an instance of the class for direct use
module.exports = new AuthService();
