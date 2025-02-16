const AuthService = require("../services/authService");

class AuthController {
  async register(req, res) {
    try {
      const userId = await AuthService.registerUser(req.body);
      res.status(201).json({ message: "User registered successfully", userId });
    } catch (err) {
      res.status(err.statusCode).json({ error: err.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const { newAccessToken, newRefreshToken, expiresAt } = await AuthService.refreshAccessToken(refreshToken, req.ip, req.get('User-Agent'));
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        sameSite: 'strict',
        maxAge: expiresAt, // 7 days in ms
      });
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      console.log("errooor: ", err)
      res.status(err.statusCode).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const loginResponse = await AuthService.loginUser(req.body, req.ip, req.get('User-Agent'));
      res.cookie('refreshToken', loginResponse.refreshToken, {
        httpOnly: true,      // Cannot be accessed by client-side JavaScript
        // secure: true,        // Only sent over HTTPS
        secure: false,
        sameSite: 'strict',  
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Login successful",
        data: {
          user: loginResponse.user,
          accessToken: loginResponse.accessToken,
        },
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
