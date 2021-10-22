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

orders.get("/orders_read_all", async(req,res)=>{
    try {
        const result = await ps.orders.findMany({
            include : {
                order_item :  true
            }
        })
        res.json({
            success : true,
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

orders.put("/order_update/:id", form_data.none(), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const find_order = await ps.orders.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!find_order){
            res.json({
                success : false,
                msg : "order tidak ditemukan"
            })
            return
        }

        const result = await ps.orders.update({
            where : {
                id : parseInt(id)
            },
            data : {
                status : data.status
            }
        })

        res.json({
            success : true,
            msg : "berhasil update order",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

orders.delete("/order_delete/:id",async(req,res)=>{
    try {
        const {id} = await req.params
        // const data = await req.body
        const find_order = await ps.orders.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!find_order){
            res.json({
                success : false,
                msg : "order tidak ditemukan"
            })
            return
        }

        const result = await ps.orders.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil delete order",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})