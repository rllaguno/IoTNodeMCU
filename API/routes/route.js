const express = require('express');

//Controllers
const tempController = require('../controllers/tempController')
const devController = require('../controllers/devController')
const humController = require('../controllers/humController')
const movController = require('../controllers/movController')
const disController = require('../controllers/disController')

const router = express.Router();

//Temperatura
router.get('/api/getLogsTemp/:deviceID', tempController.getLogsTemp);
router.post('/api/logTemp/:deviceID/:temperature', tempController.logTemp);

//Devices
router.get('/api/getDevices', devController.getDevices);
router.post('/api/addDevice/:deviceName', devController.addDevice);

//Humedad
router.get('/api/getLogsHum/:deviceID', humController.getLogsHum);
router.post('/api/logHum/:deviceID/:humidity', humController.logHum);

//Movimiento
router.get('/api/getLogsMov/:deviceID', movController.getLogsMov);
router.post('/api/logMov/:deviceID/:movimiento', movController.logMov);

//Distancia
router.get('/api/getLogsDis/:deviceID', disController.getLogsDis);
router.post('/api/logDis/:deviceID/:estatusCapacidad/:alturaDisponible/:porcentaje', disController.logDis);

module.exports = router;