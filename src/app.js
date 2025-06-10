import express from "express";
import userRoute from "./route/user.route.js";
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
app.use("api/auth/", userRoute);

export { app };
