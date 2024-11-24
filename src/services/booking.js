const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Create new booking
exports.createBooking = async ({ numberOfPeople, placeId, date, hour }, {id}) => {
  try {
    return await prisma.reservation.create({
      data: {
        numberOfPeople,
        placeId,
        userId: id,
        date,
        hour
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear la reserva');
  }
};

// Obtener todas las reservas
exports.getBookings = async ({id}) => {
  try {
    return await prisma.reservation.findMany({
      where: {userId: parseInt(id)},
      include: {
        user: {
          select: {
            name: true,
          },
        },
        place: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error getting bookings');
  }
};

// Obtener una reserva por ID
exports.getBookingById = async (id) => {
  try {
    return await prisma.reserva.findUnique({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener la reserva');
  }
};


exports.deleteBooking = async (id) => {
  try {
    return await prisma.reservation.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener la reserva');
  }
};

exports.getMyBookingsCount = async ({id}) => {
  try {
    const count = await prisma.reservation.count({
      where: {
        userId: id
      }
    });

    return count
  } catch (error) {
    console.error(error);
    throw new Error('Error creating place');
  }
}

exports.getUsersCount = async () => {
  try {
    const count = await prisma.user.count();

    return count
  } catch (error) {
    console.error(error);
    throw new Error('Error creating place');
  }
}