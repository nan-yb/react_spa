import express from "express";
// const cookieParser = require("cookie-parser");
import morgan from "morgan";
// const morgan = require("morgan");
import path from "path";
import helmet from "helmet";
import hpp from "hpp";
import routes from "./routes/index";
import { sequelize } from "./models";
import logger from "./logger";

require("dotenv").config();

const app = express();

app.set("secretCode", process.env.SECRET_CODE);
app.set("port", process.env.PORT || 8001);

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

// 라우트 설정
app.use("/", routes);

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
