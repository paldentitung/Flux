import { searchService } from "./search.service.js";

export const searchController = async (req, res) => {
  const { q } = req.query;
  const result = await searchService(q);

  res.status(200).json({
    success: true,
    data: result,
  });
};
