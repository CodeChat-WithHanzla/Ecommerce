import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  if (!req.params.id) return res.status(400).json({ error: "Id required" });
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(404)
      .json({ error: `Invalid Object of : ${req.params.id}` });
  }
  next();
}
export default checkId;
