const User = require('../models/user');
const { sendSuccessResponse, sendFailureResponse } = require('../helpers/responseHelper');
const { generateToken } = require('../helpers/jwtUtils');
const UAParser = require('ua-parser-js');

const expiresIn = '12h';

const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return sendFailureResponse(res, 'Email already exists', 400);
    }
    const user = new User(req.body);
    await user.save();
    return sendSuccessResponse(res, 'User created successfully', user, 201);
  } catch (error) {
    return sendFailureResponse(res, 'Internal server error', 500);
  }
};

const loginUser = async (req, res) => {
  try {

    const deviceName = req.headers['device-name'];
    const userAgent = req.headers['user-agent'];

    const parser = new UAParser();
    const uaResult = parser.setUA(userAgent).getResult();
    const browser = uaResult.browser.name;

    console.log(uaResult, "deviceNamedeviceName")
    console.log(browser, "userAgent")

    const userQuery = {
      ...req.body
    };

    const user = await User.findOne(userQuery).sort({ createdAt: -1 }).exec();

    if (!user) {
      return sendFailureResponse(res, 'Email or Password is Incorrect', 404);
    }

    const payload = {
      'userId': user._id,
    };

    const token = generateToken(payload, process.env.JWT_SECRET_KEY, expiresIn);

    const loginHistoryEntry = {
      deviceName: deviceName,
      browser: userAgent,
      loginTime: new Date(),
      token: token
    };

    user.loginHistory.push(loginHistoryEntry);

    await user.save();

    return sendSuccessResponse(res, 'User Login Successfully', {
      token
    });

  } catch (error) {
    console.error(error);
    return sendFailureResponse(res, 'Internal server error', 500);
  }
};

const getUser = async (req, res) => {
  try {

    const user = await User.find({}).sort({ createdAt: -1 }).exec();

    return sendSuccessResponse(res, 'User List retrieved successfully', user);

  } catch (error) {
    console.error(error);
    return sendFailureResponse(res, 'Internal server error', 500);
  }
};

const getUserByToken = async (req, res) => {
  try {

    const user = req.user;
    const userId = user.userId;

    const userDetails = await User.findOne({ _id: userId }).sort({ createdAt: -1 }).exec();

    return sendSuccessResponse(res, 'User List retrieved successfully', userDetails);

  } catch (error) {
    console.error(error);
    return sendFailureResponse(res, 'Internal server error', 500);
  }
};

const logoutId = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.userId;

    const loginHistoryId = req.params.loginHistoryId; 

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { loginHistory: { _id: loginHistoryId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Login History Id not found' });
    }

    return res.status(200).json({ success: true, message: 'Login history id deleted successfully', data: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = {
  createUser,
  loginUser,
  getUser,
  getUserByToken,
  logoutId
};
