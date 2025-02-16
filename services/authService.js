// 處理商業邏輯，這個層級負責 密碼驗證 與 JWT 產生：

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyPassword = async (inputPassword, hashedPassword) => {
    // return await bcrypt.compare(inputPassword, hashedPassword);
    if (inputPassword == hashedPassword){
        return true;
    }
};

const generateToken = (userId) => {
    // payload    JWT 的內容（可為物件、字串或 Buffer）推薦物件
    // secretOrPrivateKey    用來簽署 JWT 的密鑰（通常存放在環境變數中）
    // options (可選)    設定 JWT 的屬性（例如過期時間 expiresIn）
    // callback (可選)    若使用 同步 方式，則不需要此參數；若為非同步，需提供回調函式
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

module.exports = {verifyPassword, generateToken};