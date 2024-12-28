import express from "express";
const router = express.Router();
import { checkPermission } from "./middlewares/checkPermission.js";

//dummy router function
router.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// router.post("/:resource/", checkPermission("createAny"));

// router.get("/:resource/", checkPermission("readAny"));

// router.put("/:resource/:id/", checkPermission("updateOwn"));

// router.delete("/:resource/:id/", checkPermission("deleteOwn"));

export default router;
