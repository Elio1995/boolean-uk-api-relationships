const { doctor } = require("../../../utils/dbClient");

const getAllDoctors = async (req, res) => {
  const allDoctors = await doctor.findMany();
  res.json({ data: allDoctors });
};

const getDoctorById = async (req, res) => {
  const { id } = req.params;

  const oneDoctorById = await doctor.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ data: oneDoctorById });
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

  const deletedDoctor = await doctor.delete({ where: { id } });
  res.json({ data: deletedDoctor });
};
module.exports = {
  getAllDoctors,
  getDoctorById,
  createOneDoctor,
  deleteDoctorById,
};
