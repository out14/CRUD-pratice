import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
});

try{
    const connection = await pool.getConnection();
    console.log('Msql 연결 성공')
    connection.release();
}catch (error){

    console.error("MySQL 연결 실패:", error);
}

export default pool;