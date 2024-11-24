const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function register({name, address}){
      try {
        const user = await prisma.place.create({
            data: {
                name,
                address
            },
        });

        return user
      } catch (error) {
        console.error(error);
        throw new Error('Error creating place');
      }
  
}

async function getPlaceById(id){
  try {
    const place = await prisma.place.findUnique({
      where: { id: parseInt(id) },
    });

    return place
  } catch (error) {
    console.error(error);
    throw new Error('Error creating place');
  }
}

async function getPlaces({id}){
  try {
    const places = await prisma.place.findMany({
      where: {
        reservations: {
          none: {
            userId: id, // Filtrar lugares sin reservas del usuario actual
          },
        },
      },
    });

    return places
  } catch (error) {
    console.error(error);
    throw new Error('Error creating place');
  }

}

async function getPlacesCount() {
  try {
    const count = await prisma.place.count();

    return count
  } catch (error) {
    console.error(error);
    throw new Error('Error creating place');
  }

} 

module.exports = { register, getPlaceById, getPlaces, getPlacesCount };
