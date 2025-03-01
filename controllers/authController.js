// Controller 負責處理來自 routes 的請求，並與 Model、Service 互動

const {findUserByAccount, findUserById} = require("../models/userModel");
const {verifyPassword, generateToken, decodeToken} = require("../services/authService");

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

        res.json({token, user});

    } catch (error) {
        console.error("伺服器錯誤！", error);
        res.status(500).json({message: "伺服器錯誤！"});
    }

};

const verifyJWT = async(req, res) => {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "未提供 token！" });

    try {
        const decoded = decodeToken(token);
        const user = await findUserById(decoded.userId);
        if (!user) return res.status(404).json({ message: "用戶不存在！" });
        res.json({ user });
        console.log(user)
    } catch (error) {
        console.error("Token 無效或已過期！", error);
        res.status(401).json({ message: "Token 無效或已過期！" });
    }
};

module.exports = {login, verifyJWT};