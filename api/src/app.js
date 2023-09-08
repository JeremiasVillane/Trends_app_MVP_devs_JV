const { JWT_KEY, CL_URL } = require("../config");
const express = require("express");

//<--------------------Middlewares libraries------------------->//
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("./auth/passport-config");

//<---------------------Custom Middlewares--------------------->//
const {
  authenticateAdmin,
  authenticateUser,
} = require("./middlewares");

//<---------------------------Routes-------------------------->//
const authRoutes = require("./routes/auth.routes");
const searchRoutes = require("./routes/search.routes");
const userRoutes = require("./routes/user.routes");
const jobRoutes = require("./routes/job.routes");
const imageRoutes = require("./routes/image.routes");
const adminRoutes = require("./routes/admin.routes");
const chatroomRoutes = require("./routes/chatroom.routes");
// const userTestRoutes = require("./routes/userTest.routes");  <--- Desactivada en producción

//<---------------------------Config-------------------------->//
const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: CL_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: JWT_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", authenticateAdmin, adminRoutes);
app.use("/api/v1/user", authenticateUser, userRoutes);
app.use("/api/v1/job", authenticateUser, jobRoutes);
app.use("/api/v1/search", authenticateUser, searchRoutes);
app.use("/api/v1/images", authenticateUser, imageRoutes);
app.use("/api/v1/chatroom", authenticateUser, chatroomRoutes);

// --- solo para pruebas --- //
// app.use("/userTest", userTestRoutes);   <--- Desactivada en producción

//<-------------------Servidor Socket.io---------------------->//
const { createServer } = require("http");
appSocket = createServer(app);
const serverSocket = require("./socket/serverSocket");
serverSocket(appSocket);

module.exports = appSocket;
