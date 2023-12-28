const { PrismaClient } = require("@prisma/client");

const DataTableServices = require("../dataTableServices.js");
const prisma = new PrismaClient();

class DeviceServcies {
  async index(query) {
    const excludeColumns = [];
    const dataTableServices = new DataTableServices(prisma.device, query);
    const rows = await dataTableServices.getResult(excludeColumns);

    return rows;
  }

  async show(id) {
    const device = await prisma.device.findUnique({
      where: {
        id: id,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: device.user_id,
      },
    });

    delete user.password;
    device.user = user;

    return device;
  }

  async store(data) {
    let { name, ssid } = data.body;

    // get auth user id
    const user_id = data.user ? data.user.payload.id : null;

    const device = await prisma.device.create({
      data: {
        user_id: user_id,
        name: name,
        ssid: ssid,
      },
    });

    return device;
  }

  async update(id, data) {
    let { name, ssid } = data.body;

    const device = await prisma.device.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        ssid: ssid,
      },
    });

    return device;
  }

  async destroy(id) {
    const device = await prisma.device.delete({
      where: {
        id: id,
      },
    });

    return device;
  }
}
  
module.exports = new DeviceServcies();
