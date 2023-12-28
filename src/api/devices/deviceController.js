const { PrismaClient } = require('@prisma/client');

const DeviceServcies = require('../devices/deviceServices.js');
const ResponseServices = require('../responseServices.js');
const prisma = new PrismaClient();

const getDevices = async (req, res, next) => {
    try {
        const totalData = await prisma.device.count();
        const device = await DeviceServcies.index(req.query);
        const responseServices = req ? new ResponseServices(device, totalData, req, next) : new ResponseServices(device);
        const response = responseServices.successResponse('success', device);
        res.status(response.code).json(response);
    } catch (error) {
        const responseServices = req ? new ResponseServices(error, null, req, next) : new ResponseServices(error);
        const response = responseServices.errorResponse(error.message, null);
        res.status(response.code).json(response);
    }
};

const getDevice = async (req, res, next) => {
    try {
        const device = await DeviceServcies.show(req.params.id);
        const responseServices = req ? new ResponseServices(device, null, req, next) : new ResponseServices(device);
        const response = responseServices.successResponse('success', device);
        res.status(response.code).json(response);
    } catch (error) {
        const responseServices = req ? new ResponseServices(error, null, req, next) : new ResponseServices(error);
        const response = responseServices.errorResponse(error, null);
        res.status(response.code).json(response);
    }
};

const createDevice = async (req, res, next) => {
    try {
        const device = await DeviceServcies.store(req);
        const responseServices = req ? new ResponseServices(device, null, req, next) : new ResponseServices(device);
        const response = responseServices.successResponse('success', device);
        res.status(response.code).json(response);
    } catch (error) {
        const responseServices = req ? new ResponseServices(error, null, req, next) : new ResponseServices(error);
        const response = responseServices.errorResponse(error.message, null);
        res.status(response.code).json(response);
    }
};

const updateDevice = async (req, res, next) => {
    try {
        const device = await DeviceServcies.update(req.params.id, req);
        const responseServices = req ? new ResponseServices(device, null, req, next) : new ResponseServices(device);
        const response = responseServices.successResponse('success', device);
        res.status(response.code).json(response);
    } catch (error) {
        const responseServices = req ? new ResponseServices(error, null, req, next) : new ResponseServices(error);
        const response = responseServices.errorResponse(error.message, null);
        res.status(response.code).json(response);
    }
};

const deleteDevice = async (req, res, next) => {
    try {
        const device = await DeviceServcies.destroy(req.params.id);
        const responseServices = req ? new ResponseServices(device, null, req, next) : new ResponseServices(device);
        const response = responseServices.successResponse('success', device);
        res.status(response.code).json(response);
    } catch (error) {
        const responseServices = req ? new ResponseServices(error, null, req, next) : new ResponseServices(error);
        const response = responseServices.errorResponse(error.message, null);
        res.status(response.code).json(response);
    }
};

module.exports = {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice
};