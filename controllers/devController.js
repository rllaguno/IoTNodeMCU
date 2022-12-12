const mysql = require('../database/db')

class MainController{
    
    async addDevice(req, res){
        console.log("Add Device")
        console.log(req.params.deviceName)
        if(req.params.deviceName != null){
            let deviceName = req.params.deviceName
            var sql = `insert into devices (device_name) values ('${deviceName}');`
            mysql.query(sql, (error, data, fields) => {
                if(error){
                    res.status(500)
                    res.send(error.message)
                } else{
                    console.log(data)
                    res.join({
                        status: 200,
                        message: "Add uploaded successfully",
                        affectedRows: data.affectedRows
                    })
                }
            })
        } else{
            res.send('Por favor llene todos los datos!')
        }
    }

    async getDevices(req,res){
        console.log("Get Devices")
        var sql = `Select * FROM devices;`
        mysql.query(sql, (error, data, fields) => {
            if(error){
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

const devController = new MainController()
module.exports = devController;