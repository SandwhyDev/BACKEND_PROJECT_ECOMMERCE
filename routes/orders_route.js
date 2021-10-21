import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_data"

export const orders = express.Router()

orders.post("/order_create", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.orders.create({
            data : {
                user_id : parseInt(data.user_id),
                status : data.status
            }
        })

        res.json({
            success : true,
            msg : "berhasil",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})