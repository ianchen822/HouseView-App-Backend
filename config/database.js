// model 負責直接與資料庫互動

// dotenv.config() 會讀取 .env 檔案中的變數
require('dotenv').config();
const { Pool } = require('pg');

// 設定 PostgreSQL 連線
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;