const mysql = require('../database/db')

class MainController{

    async logHum(req, res){
        console.log(req.params.humidity)
        console.log(req.params.deviceID)
        if(req.params.deviceID != null && req.params.humidity != null){
            let deviceID = req.params.deviceID
            let humidity = req.params.humidity;
            var sql = `insert into log_hum (log_date, device_id, hum) values (now(), ${deviceID}, ${humidity});`
            mysql.query(sql, (error, data, fields) => {
                if(error){
                    res.status(500)
                    res.send(error.message)
                } else{
                    console.log(data)
                    res.json({
                        status: 200,
                        message: "Log uploaded succesfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else{
            res.send('Por favor llene todos los datos!')
        }
    }

    async getLogsHum(req,res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID != null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_hum where device_id='${deviceID}'`
            mysql.query(sql, (error, data, fields) => {
                if(error){
                    res.status(500)
                    res.send(error, message)
                } else{
                    console.log(data)
                    res.json({
                        data
                    })
                }
            })
        }
    }
}

const humController = new MainController()
module.exports = humController;