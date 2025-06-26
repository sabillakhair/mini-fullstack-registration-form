const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Middleware parsing form data
app.use(express.urlencoded({ extended: false }));

// Koneksi ke database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Kosong jika default XAMPP
  database: "db_form",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Terhubung ke database MySQL");
});

const cors = require("cors");
app.use(cors());

// Route POST terima data form dan simpan ke database
app.post("/submit-form", (req, res) => {
  const { name, date } = req.body;

  const sql = "INSERT INTO registration (name, date) VALUES (?, ?)";
  db.query(sql, [name, date], (err, result) => {
    if (err) {
      console.error("Error insert data:", err);
      return res.status(500).send("❌ Gagal menyimpan data.");
    }
    res.send("✅ Data berhasil disimpan ke database!");
  });
});

app.listen(port, () => {
  console.log(`🚀 Server aktif di http://localhost:${port}`);
});
