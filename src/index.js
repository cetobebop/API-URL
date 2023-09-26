import app from "./app.js";
import { connectDB } from "./database/db.js";

connectDB()
const PORT = process.env.PORT || 5000
app.listen(PORT)

console.log("server running in port " + PORT )