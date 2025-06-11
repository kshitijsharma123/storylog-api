import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./route/user.route.js";
import entryRoute from "./route/entry.route.js";
import logWrites from "./middleware/logWrite.middleware.js";
const app = express();

//For checking req
let urlHits = new Object();
app.use((req, res, next) => {
  const { url, ip } = req;
  const identifier = `${url}-${ip}`;
  urlHits[identifier] = (urlHits[identifier] || 0) + 1;
  console.log({
    url,
    ip,
    urlHitCount: urlHits[identifier],
  });

  next();
});

app.use(logWrites)
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/auth", userRoute);
app.use("/api/entries", entryRoute);

export { app };
