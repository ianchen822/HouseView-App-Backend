const express = require('express');
// dotenv.config() 會讀取 .env 檔案中的變數
require('dotenv').config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 5001;

// 讓 Express 解析 JSON 格式的請求主體（request body）
app.use(express.json());
app.use(cors());
// 使用 authRoutes 處理以 /api/auth 開頭的請求
// 當你訪問 http://localhost:3000/api/auth/login，請求會由 authRoutes.js 中的 POST /login 處理。
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
