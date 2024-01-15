const express = require("express");

const cors = require("cors");
const db = require("./models");
const dbConfig = require("./config/db.config.js");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



db.mongoose
  .connect(`mongodb+srv://bthnaydn:123Batuhan@lojiper.hdfpqhb.mongodb.net`)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
