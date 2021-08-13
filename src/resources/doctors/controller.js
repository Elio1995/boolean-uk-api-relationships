const { doctor, appointment } = require("../../../utils/dbClient");

const getAllDoctors = async (req, res) => {
  try {
    const allDoctors = await doctor.findMany();
    res.json({ data: allDoctors });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const oneDoctorById = await doctor.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ data: oneDoctorById });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const doctorAppointments = async (req, res) => {
  const { id } = req.params;
  try {
    const someDoctorAppointments = await appointment.findMany({
      where: {
        doctorId: parseInt(id),
      },
      include: {
        doctor: true,
      },
    });
    res.json({ doctorAppointments: someDoctorAppointments });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const doctorSpeciality = async (req, res) => {
  const speciality = req.params.speciality;
  try {
    const DoctorBySpeciality = await doctor.findMany({
      where: {
        specialty: speciality,
      },
    });
    res.json({ DoctorBySpeciality: DoctorBySpeciality });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createOneDoctor = async (req, res) => {
  const newDoctor = req.body;
  try {
    const brandNewDoctor = await doctor.create({ data: newDoctor });
    res.json({ data: brandNewDoctor });
  } catch (error) {
    res.json({ error });
  }
};

const deleteDoctorById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedDoctor = await doctor.delete({ where: { id } });
    res.json({ data: deletedDoctor });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const updatedDoctor = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedInfo = req.body;

  try {
    const doctorExist = await doctor.findUnique({ where: { id } });

    if (doctorExist) {
      const doctorUpdate = await doctor.update({
        where: { id },
        data: { ...doctorExist, ...updatedInfo },
      });
      res.json({ data: doctorUpdate });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createOneDoctor,
  deleteDoctorById,
  doctorAppointments,
  doctorSpeciality,
  updatedDoctor,
};
