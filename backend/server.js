require("dotenv").config();   // loads env variables

const app = require("./src/app");
const userRoutes = require("./src/routes/user.routes");

app.use("/api/users", userRoutes);

const taskRoutes = require("./src/routes/tasks.routes");

app.use("/api/tasks", taskRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
