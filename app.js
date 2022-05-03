const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const hpp = require("hpp");

dotenv.config();

const boardRouter = require("./routes/board");
const itemRouter = require("./routes/item");
const pageRouter = require("./routes/page");
const userRouter = require("./routes/user");

const { sequelize } = require("./models");
// const passportConfig = require("./passport");
const logger = require("./logger");

const app = express();

app.set("port", process.env.PORT || 8001);
// passportConfig(); // 패스포트 설정

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser(process.env.COOKIE_SECRET));
// const sessionOption = {
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//   },
//   store: new RedisStore({ client: redisClient }),
// };

// if (process.env.NODE_ENV === "production") {
//   sessionOption.proxy = true;
//   // sessionOption.cookie.secure = true;
// }
// app.use(session(sessionOption));
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/", pageRouter);
app.use("/boards", boardRouter);
app.use("/items", itemRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  logger.info("hello");
  logger.error(error.message);
  next(error);
});

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
