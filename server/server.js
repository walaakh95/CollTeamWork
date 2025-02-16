const { PORT } = require("./src/config/env")
const connectDB = require("./src/config/db");
const app = require("./src/app");

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
