const { PrismaClient, Role, Status } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seedSuperAdmin() {
  try {
    const spAdEmail = "pneel2948@gmail.com";
    const spAdPass = "123456";

    const existSpAdmin = await prisma.sUPER_ADMIN.findUnique({
      where: {
        email: spAdEmail,
      },
    });

    if (existSpAdmin) {
      console.log("Adminalready exist", existAdmin.email);
      return;
    }

    const hashPassword = await bcrypt.hash(spAdPass, 10);

    const spAdmin = await prisma.sUPER_ADMIN.create({
      data: {
        name: "SUPER_ADMIN",
        email: spAdEmail,
        password: hashPassword,
        role: Role.SUPER_ADMIN,
      },
    });
    console.log("SuperAdmin created:", spAdmin);
  } catch (error) {
    console.error("error in seeding ", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSuperAdmin();
