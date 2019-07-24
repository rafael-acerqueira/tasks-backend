module.exports = app => {
  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app
    .route("/tasks")
    .all(app.config.passport.authenticate())
    .get(app.api.task.index)
    .post(app.api.task.create);

  app
    .route("/tasks/:id")
    .all(app.config.passport.authenticate())
    .delete(app.api.task.destroy);

  app
    .route("/tasks/:id/toggle-done-at")
    .all(app.config.passport.authenticate())
    .put(app.api.task.toggleTask);
};
