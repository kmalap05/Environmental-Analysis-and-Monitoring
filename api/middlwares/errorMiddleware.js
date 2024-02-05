const handleServerError = (res, error) => {
  console.error("Internal Server Error:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const errorMiddleware = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = errorMiddleware;
