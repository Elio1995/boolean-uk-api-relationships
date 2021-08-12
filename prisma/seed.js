const { PrismaClient } = require("@prisma/client");

const dbClient = new PrismaClient();

const doctors = [
  {
    firstName: "Anas",
    lastName: "Martinez",
    specialty: "Dermatology",
  },
  {
    firstName: "Elio",
    lastName: "Suarez",
    specialty: "Physioteraphy",
  },
  {
    firstName: "Sergio",
    lastName: "Neves",
    specialty: "GP",
  },
];

const appointments = [
  {
    practiceName: "broken leg",
    date: "23 August 2017",
    reason: "football",
  },
  {
    practiceName: "broken hand",
    date: "11 July 2019",
    reason: "basketball",
  },
  {
    practiceName: "head injured",
    date: "11 august 2021",
    reason: "car accident",
  },
];

const getRandomElement = (array) => {
  const number = Math.floor(Math.random() * array.length);
  return array[number];
};

const seed = async () => {
  const doctorArray = doctors.map(async (doctor) => {
    return await dbClient.doctor.create({
      data: doctor,
    });
  });
  const allDoctors = await Promise.all(doctorArray);

  const doctorsIds = allDoctors.map(({ id }) => id);

  const allAppointments = appointments.map(async (appointment) => {
    return await dbClient.appointment.create({
      data: {
        ...appointment,
        date: new Date(appointment.date).toISOString(),
        doctor: { connect: { id: parseInt(getRandomElement(doctorsIds)) } },
      },
    });
  });

  console.log("All the Doctors", allDoctors);
  console.log("All the Appointments", allAppointments);
};

// const seed = async () => {
//   const doctor = await dbClient.doctor.create({
//     data: {
//       firstName: "Anas",
//       lastName: "Martinez",
//       specialty: "Dermatology",
//     },
//   });
//   console.log(doctor);
// };

seed()
  .catch((e) => console.error(e))
  .finally(async () => await dbClient.$disconnect());
