module.exports = (req, res, next) => {
  const started = Date.now();

  res.on("finish", () => {
    const user = req.user ? req.user.userId : "anonymous";
    console.log(
      `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} user=${user} ${Date.now() - started}ms`
    );
  });

  next();
};