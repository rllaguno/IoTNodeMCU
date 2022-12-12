const mysql = require('../database/db')

class MainController{

    // Temperatura
    async logTemp(req , res){
        console.log(req.params.temperature)
        console.log(req.params.deviceID)
        if(req.params.deviceID != null && req.params.temperature != null) {
            let deviceID = req.params.deviceID
            let temperature = req.params.temperature;
            var sql = `insert into log_temp (log_date, device_id, temp) values (now(), ${deviceID}, ${temperature});`
            mysql.query(sql, (error,data,fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Log uploaded successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else {
            res.send('Por favor llene todos los datos!')
        }
    }

    async getLogsTemp(req,res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID!=null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_temp where device_id='${deviceID}'`
            mysql.query(sql, (error, data, fields) => {
                if(error) {
                    res.status(500)
                    res.send(error, message)
                } else {
                    console.log(data)
                    res.json({
                        data
                    })
                }
            })
        }
    }


    //New asyncronus function
    async insertLogsHum(req,res){
        //console.log("Get Logs")
        //console.log(req.params.deviceID)
        //console.log(req.params.tipoQ)
        console.log(req.params.dedviceID)
        console.log(req.params.humedad)
        
        if(req.params.deviceID != null && req.params.humedad != null) {
            let deviceID = req.params.deviceID
            let humedad = req.params.humedad;
            var sql = `insert into log_temp (log_date, device_id, humedad) values (now(), ${deviceID}, ${humedad});`
            mysql.query(sql, (error,data,fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Log uploaded successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else {
            res.send('Por favor llene todos los datos!')
        }

    }
    //Fin de Temperatura

    // Humedad
    async logHum(req , res){
        console.log(req.params.humedad)
        console.log(req.params.deviceID)
        if(req.params.deviceID != null && req.params.humedad != null) {
            let deviceID = req.params.deviceID
            let humedad = req.params.humedad;
            var sql = `insert into log_temp (log_date, device_id, humedad) values (now(), ${deviceID}, ${humedad});`
            mysql.query(sql, (error,data,fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Log uploaded successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else {
            res.send('Por favor llene todos los datos!')
        }
    }

    async getHum(req,res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID!=null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_temp where device_id='${deviceID}'`
            mysql.query(sql, (error, data, fields) => {
                if(error) {
                    res.status(500)
                    res.send(error, message)
                } else {
                    console.log(data)
                    res.json({
                        data
                    })
                }
            })
        }
    }


    //New asyncronus function
    async insertLogsHum(req,res){
        //console.log("Get Logs")
        //console.log(req.params.deviceID)
        //console.log(req.params.tipoQ)
        console.log(req.params.deviceID)
        console.log(req.params.temperature)
        
        if(req.params.deviceID != null && req.params.humedad != null) {
            let deviceID = req.params.deviceID
            let humedad = req.params.humedad;
            var sql = `insert into log_temp (log_date, device_id, humedad) values (now(), ${deviceID}, ${humedad});`
            mysql.query(sql, (error,data,fields) => {
                if(error) {
                    res.status(500)
                    res.send(error.message)
                } else {
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Log uploaded successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else {
            res.send('Por favor llene todos los datos!')
        }

    }
    //Fin de Humedad

}

const tempController = new MainController()
module.exports = tempController;