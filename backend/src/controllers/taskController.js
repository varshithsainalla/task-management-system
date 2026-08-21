import Task from "../models/Task.js";

const isAdmin = (req) =>
  req.user.role === "admin";

const buildOwnerQuery = (
  req
) => {

  return isAdmin(req)
    ? {}
    : {
        user: req.user._id
      };

};

export const createTask =
  async (req, res) => {

    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    const task =
      await Task.create({

        user: req.user._id,

        title,

        description,

        status,

        priority,

        dueDate:
          dueDate || null

      });

    res.status(201).json({
      success: true,
      task
    });

  };

export const getTasks =
  async (req, res) => {

    const {
      status,
      priority,
      search,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 6
    } = req.query;

    const safePage =
      Math.max(
        parseInt(page, 10) || 1,
        1
      );

    const safeLimit =
      Math.min(
        Math.max(
          parseInt(limit, 10) || 6,
          1
        ),
        50
      );

    const filter =
      buildOwnerQuery(req);

    if (
      status &&
      [
        "TODO",
        "IN_PROGRESS",
        "DONE"
      ].includes(status)
    ) {

      filter.status = status;

    }

    if (
      priority &&
      [
        "LOW",
        "MEDIUM",
        "HIGH"
      ].includes(priority)
    ) {

      filter.priority = priority;

    }

    if (search?.trim()) {

      filter.title = {
        $regex:
          search.trim(),

        $options: "i"
      };

    }

    const allowedSorts = [
      "createdAt",
      "dueDate",
      "priority",
      "title",
      "status"
    ];

    const selectedSort =
      allowedSorts.includes(
        sortBy
      )
        ? sortBy
        : "createdAt";

    const direction =
      order === "asc"
        ? 1
        : -1;

    const [
      tasks,
      total
    ] = await Promise.all([

      Task.find(filter)
        .populate(
          "user",
          "name email"
        )
        .sort({
          [selectedSort]:
            direction
        })
        .skip(
          (safePage - 1) *
            safeLimit
        )
        .limit(safeLimit)
        .lean(),

      Task.countDocuments(
        filter
      )

    ]);

    res.json({

      success: true,

      tasks,

      pagination: {

        page: safePage,

        limit: safeLimit,

        total,

        pages:
          Math.ceil(
            total /
              safeLimit
          )

      }

    });

  };

export const getTask =
  async (req, res) => {

    const filter = {
      _id: req.params.id,

      ...buildOwnerQuery(req)
    };

    const task =
      await Task.findOne(
        filter
      ).populate(
        "user",
        "name email"
      );

    if (!task) {

      return res.status(404).json({
        success: false,

        message:
          "Task not found"
      });

    }

    res.json({
      success: true,
      task
    });

  };

export const updateTask =
  async (req, res) => {

    const allowed = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate"
    ];

    const update = {};

    for (
      const key of allowed
    ) {

      if (
        req.body[key] !==
        undefined
      ) {

        update[key] =
          req.body[key];

      }

    }

    if (
      update.dueDate === ""
    ) {

      update.dueDate = null;

    }

    const task =
      await Task.findOneAndUpdate(

        {
          _id: req.params.id,

          ...buildOwnerQuery(req)
        },

        update,

        {
          new: true,

          runValidators: true
        }

      ).populate(
        "user",
        "name email"
      );

    if (!task) {

      return res.status(404).json({
        success: false,

        message:
          "Task not found"
      });

    }

    res.json({
      success: true,
      task
    });

  };

export const completeTask =
  async (req, res) => {

    const task =
      await Task.findOneAndUpdate(

        {
          _id: req.params.id,

          ...buildOwnerQuery(req)
        },

        {
          status: "DONE"
        },

        {
          new: true,

          runValidators: true
        }

      );

    if (!task) {

      return res.status(404).json({
        success: false,

        message:
          "Task not found"
      });

    }

    res.json({
      success: true,
      task
    });

  };

export const deleteTask =
  async (req, res) => {

    const task =
      await Task.findOneAndDelete({

        _id: req.params.id,

        ...buildOwnerQuery(req)

      });

    if (!task) {

      return res.status(404).json({
        success: false,

        message:
          "Task not found"
      });

    }

    res.json({

      success: true,

      message:
        "Task deleted successfully"

    });

  };