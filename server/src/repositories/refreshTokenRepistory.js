const RefreshTokenModel = require('../models/refreshToken');

class RefreshTokenRepository {
  /**
   * Create and store a refresh token.
   * @param {String} token - The token string.
   * @param {mongoose.Types.ObjectId} userId - The associated user ID.
   * @param {Date} expiresAt - When the token expires.
   * @param {Object} metadata - Optional metadata (ip, userAgent, etc.).
   * @returns {Promise<Object>} The created refresh token document.
   */
  static async createRefreshToken(token, userId, expiresAt, metadata = {}) {
    return await RefreshTokenModel.create({
      token,
      user: userId,
      expiresAt,
      ...metadata,
    });
  }

  /**
   * Find a refresh token in the database.
   * @param {String} token - The refresh token string.
   * @returns {Promise<Object|null>} The found refresh token document or null.
   */
  static async findRefreshToken(token) {
    return await RefreshTokenModel.findOne({ token });
  }

  /**
   * Delete a refresh token from the database.
   * @param {String} token - The refresh token string.
   * @returns {Promise<Object>} The deletion result.
   */
  static async deleteRefreshToken(token) {
    return await RefreshTokenModel.deleteOne({ token });
  }

  /**
   * Delete all refresh tokens for a given user.
   * @param {mongoose.Types.ObjectId} userId - The user's ID.
   * @returns {Promise<Object>} The deletion result.
   */
  static async deleteAllRefreshTokensForUser(userId) {
    return await RefreshTokenModel.deleteMany({ user: userId });
  }
}

module.exports = RefreshTokenRepository;
