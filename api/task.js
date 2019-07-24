const moment = require("moment");

module.exports = app => {
  const index = (req, res) => {
    const date = req.body.date
      ? req.body.date
      : moment()
          .endOf("day")
          .toDate();

    app
      .db("tasks")
      .where({ userId: req.user.id })
      .where("estimateAt", "<=", date)
      .orderBy("estimateAt")
      .then(tasks => res.json(tasks))
      .catch(err => res.status(500).json(err));
  };

  const create = (req, res) => {
    if (!req.body.description.trim) {
      return res.status(400).send("Informe a descrição");
    }

    req.body.userId = req.user.id;

    app
      .db("tasks")
      .insert(req.body)
      .then(_ => res.status(204).send())
      .catch(err => res.status(400).json(err));
  };

  const destroy = (req, res) => {
    app
      .db("tasks")
      .where({ id: req.params.id, userId: req.user.id })
      .del()
      .then(rowsDeleted => {
        if (rowsDeleted > 0) {
          return res.status(204).send();
        } else {
          const msg = "Não foi encontrada essa task";
          res.status(400).send(msg);
        }
      })
      .catch(err => res.status(400).json(err));
  };

  const updateDoneAt = (req, res, doneAt) => {
    app
      .db("tasks")
      .where({ id: req.params.id, userId: req.user.id })
      .update({ doneAt })
      .then(_ => res.status(204).send())
      .catch(err => res.status(400).send(err));
  };

  const toggleTask = (req, res) => {
    app
      .db("tasks")
      .where({ id: req.params.id, userId: req.user.id })
      .first()
      .then(task => {
        if (!task) {
          const msg = "Essa task não existe";
          return res.status(400).send(msg);
        }

        const doneAt = task.doneAt ? null : new Date();
        updateDoneAt(req, res, doneAt);
      })
      .catch(err => res.status(400).send(err));
  };

  return {
    index,
    create,
    destroy,
    toggleTask
  };
};
