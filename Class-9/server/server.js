import express from "express";
import connectDb from "./database/mongodb.js";
import userRoute from "./routes/routes.js";

const app = express();
const PORT = 4000;


app.use(express.json());

connectDb();

app.use(userRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});