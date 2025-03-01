const pool = require("../config/database"); // 原先寫 {pool} 這樣會出錯，因為 database.js 的 exports 是 pool 而不是 {pool}

const findUserByAccount = async (account) => {
    // $1 是一個參數佔位符（placeholder），用來防止 SQL 注入，並且與後面 [account] 陣列中的值對應。
    // 這種方式是 PostgreSQL（pg 套件）所提供的參數化查詢（Parameterized Query）機制。
    // $1 代表第一個參數，它的值來自 pool.query() 傳入的第二個參數 [account]。 
    // 這樣的寫法避免直接將變數拼接到 SQL 字串中，防止 SQL 注入攻擊。
    // 如果是 [account, password] 則是 account = $1 and password = $2
    try {
        const query_str = 'SELECT * FROM users WHERE account = $1';
        const result = await pool.query(query_str, [account]);
        return result.rows[0];
    } catch (error) {
        console.error("資料庫查詢錯誤:", error);
        throw error;
    }
    // result 會是 
    // {
        // rowCount: 1,   // 代表查詢回傳了幾筆資料
        // rows: [        // 包含查詢結果的陣列
        //     {
            //     id: 1,
            //     name: jack,
            //     account: "user123",
            //     password: "hashedpassword"
        //     }
        // ]
    // }
};

const findUserById = async (userId) => {
    try {
        const query_str = "SELECT id, name, account FROM users WHERE id = $1";
        const result = await pool.query(query_str, [userId]);
        // console.log(result)
        return result.rows[0];
    } catch (error) {
        console.error("資料庫查詢錯誤:", error);
        throw error;
    }
};

// 用 {} 比較好用解構的方式並且可放入多個東西進去
module.exports = {findUserByAccount, findUserById};