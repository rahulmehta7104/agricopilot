/**
 * Controller for handling health check requests.
 * By keeping this separate from the router, we adhere to Clean Architecture,
 * allowing routes to just route, and controllers to handle request/response logic.
 */
exports.getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "AgriCopilot Backend Running"
  });
};
