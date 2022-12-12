const mysql = require('../database/db')

class MainController{

    async logMov(req, res){
        console.log(req.params.deviceID)
        console.log(req.params.movimiento)
        if(req.params.deviceID != null && req.params.movimiento != null){
            let deviceID = req.params.deviceID
            let movimiento = req.params.movimiento;
            var sql = `insert into log_mov (log_date, device_id, mov) values(now(), ${deviceID}, ${movimiento});`
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

    async getLogsMov(req, res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID != null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_mov where device_id='${deviceID}'`
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

const movController = new MainController()
module.exports = movController;