import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

app.listen(2222, () => {
    console.log("Server is running on port 2222");
})