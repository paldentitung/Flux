import { followUserService } from "../services/user.service.js";

export const followUserController = async (req, res, next) => {
  const currentUserId = req.user.id;
  const targetUserId = req.params.id;

  const result = await followUserService(currentUserId, targetUserId);
  res.status(200).json({
    success: true,
    message: "User followed successfully",
    data: result,
  });
};
