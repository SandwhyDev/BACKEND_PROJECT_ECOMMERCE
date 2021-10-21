import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_data"

const user = express.Router()

user.post("/user_register", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.users.create({
            data : {
                email : data.email,
                full_name : data.full_name,
                password : data.password,
                // country : parseInt(data.country),
                country_code : parseInt(data.country_code)
            }
        })

        res.json({
            success : true,
            msg : "berhasil register",
            query :  result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.get("/user_read_all", async(req,res)=>{
    try {
        const result = await ps.users.findMany({
            include : {
                country :  true,
                merchants :  true,
                orders : true
            }
        })

        res.json({
            success : true,
            query :  result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })  
    }
})
export default user