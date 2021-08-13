const router = require("express").Router();

const {
  getAllDoctors,
  getDoctorById,
  createOneDoctor,
  deleteDoctorById,
} = require("./controller");

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", createOneDoctor);
router.delete("/:id", deleteDoctorById);

module.exports = router;
