const router = require("express").Router();

const {
  getAllDoctors,
  getDoctorById,
  createOneDoctor,
} = require("./controller");

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", createOneDoctor);

module.exports = router;
