import Task from "../models/Task.js";

export const getAnalytics =
  async (req, res) => {

    const match = {
      user: req.user._id
    };

    const [
      summary
    ] = await Task.aggregate([

      {
        $match: match
      },

      {
        $group: {

          _id: null,

          total: {
            $sum: 1
          },

          completed: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "DONE"
                  ]
                },
                1,
                0
              ]
            }
          },

          pending: {
            $sum: {
              $cond: [
                {
                  $ne: [
                    "$status",
                    "DONE"
                  ]
                },
                1,
                0
              ]
            }
          },

          todo: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "TODO"
                  ]
                },
                1,
                0
              ]
            }
          },

          inProgress: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "IN_PROGRESS"
                  ]
                },
                1,
                0
              ]
            }
          }

        }
      }

    ]);

    const statusCounts =
      await Task.aggregate([

        {
          $match: match
        },

        {
          $group: {

            _id: "$status",

            count: {
              $sum: 1
            }

          }
        },

        {
          $sort: {
            count: -1
          }
        }

      ]);

    const priorityCounts =
      await Task.aggregate([

        {
          $match: match
        },

        {
          $group: {

            _id: "$priority",

            count: {
              $sum: 1
            }

          }
        },

        {
          $sort: {
            count: -1
          }
        }

      ]);

    const total =
      summary?.total || 0;

    const completed =
      summary?.completed || 0;

    res.json({

      success: true,

      summary: {

        total,

        completed,

        pending:
          summary?.pending ||
          0,

        todo:
          summary?.todo ||
          0,

        inProgress:
          summary?.inProgress ||
          0,

        completionPercentage:
          total
            ? Math.round(
                (completed /
                  total) *
                  100
              )
            : 0

      },

      statusCounts,

      priorityCounts

    });

  };