const router = require("express").Router();

const {
  getAllDoctors,
  getDoctorById,
  createOneDoctor,
  deleteDoctorById,
  doctorAppointments,
  doctorSpeciality,
} = require("./controller");

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.get("/:id/appointment", doctorAppointments);
router.post("/", createOneDoctor);
router.delete("/:id", deleteDoctorById);
router.get("/speciality/:speciality", doctorSpeciality);

module.exports = router;
