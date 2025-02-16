// Controller 負責處理來自 routes 的請求，並與 Model、Service 互動

const {findUserByAccount} = require("../models/userModel");
const {verifyPassword, generateToken} = require("../services/authService");

// login 需要等待並且有 req, res
const login = async (req, res) => {

    const {account, password} = req.body;

    if (!account || !password) {
        return res.status(400).json({message: "請輸入帳號和密碼！"});
    }

    try {
        
        const user = await findUserByAccount(account);
        if (!user) {
            return res.status(401).json({message: "帳號尚未註冊！"});
        }

        const isMatched = verifyPassword(password, user.password);
        if (!isMatched) {
            return res.status(401).json({message: "密碼輸入錯誤！"});
        }

        const token = generateToken(user.id);

        res.json({token});

    } catch (error) {
        console.error("伺服器錯誤！", error);
        res.status(500).json({message: "伺服器錯誤！"});
    }

};

module.exports = {login};