const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = 'upper-eat-sq';

async function login(email, password) {
    console.log({
        email,
        password
    })
    const user = await prisma.user.findUnique({
        where: { email },
    });
    console.log({user})
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({code: 'BAD_PASSWORD', message: 'Password incorrect' });
    }
    // Si la contraseña es correcta, generar un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

    return {
        token,
        email,
        name: user.name
    };
}

async function register({email, name, password}){
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword, 
            },
        });

        return user
      } catch (error) {
        console.error(error);
        throw new Error('Error creating user');
      }
  
}

module.exports = { login, register };
