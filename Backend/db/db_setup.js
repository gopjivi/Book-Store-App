const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hanumika1!",
  multipleStatements: true,
});

function executeSqlScript(filePath, callback) {
  const sqlScript = fs.readFileSync(filePath).toString();
  connection.query(sqlScript, (err, results) => {
    if (err) {
      console.error("Error executing script:", err);
      process.exit(1);
    } else {
      console.log(`${filePath} executed successfully`);
      callback();
    }
  });
}

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  } else {
    console.log("Connected to MySQL");

    // Execute the migrations script first
    executeSqlScript(path.join(__dirname, "migrations.sql"), () => {
      // Execute the seeds script
      executeSqlScript(path.join(__dirname, "seeds.sql"), () => {
        console.log("All scripts executed successfully");
        connection.end(); // Close the connection
        process.exit(0);
      });
    });
  }
});
