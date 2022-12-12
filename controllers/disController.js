const mysql = require('../database/db')

class MainController{
    
    async logDis(req, res){
        console.log(req.params.deviceID)
        console.log(req.params.estatusCapacidad)
        console.log(req.params.alturaDisponible)
        console.log(req.params.porcentaje)
        if(req.params.deviceID != null && req.params.estatusCapacidad != null && req.params.alturaDisponible != null && req.params.porcentaje != null){
            let deviceID = req.params.deviceID
            let estatusCapacidad = req.params.estatusCapacidad
            let alturaDisponible = req.params.alturaDisponible
            let porcentaje = req.params.porcentaje;
            var sql = `insert into log_dis (log_date, device_id, estatusCapacidad, alturaDisponible, porcentaje) values(now(), ${deviceID}, ${estatusCapacidad}, ${alturaDisponible}, ${porcentaje});`
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

    async getLogsDis(req, res){
        console.log("Get Logs")
        console.log(req.params.deviceID)
        if(req.params.deviceID != null){
            let deviceID = req.params.deviceID;
            var sql = `SELECT * FROM log_dis where device_id='${deviceID}'`
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

const disController = new MainController()
module.exports = disController;