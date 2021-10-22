import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_data"

export const order_item = express.Router()

order_item.post("/order_item_create", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.order_items.create({
            data : {
                order_id : parseInt(data.order_id),
                product_id : parseInt(data.product_id),
                quantity : parseInt(data.quantity),
                user_id : parseInt(data.user_id)
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

order_item.get("/order_item_read_all", async(req,res)=>{
    try {
        const result = await ps.order_items.findMany()
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

order_item.delete("/order_item_delete/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        // const find_order = await ps.order_items.findUnique({
        //     where : {
        //         id : parseInt(id)
        //     }
        // })

        // if(!find_order){
        //     res.json({
        //         success : false,
        //         msg : "order tidak ditemukan"
        //     })
        //     return
        // }


        const result = await ps.order_items.delete({
            where : {
                id : parseInt(id),
                
            },
            
        })

        res.json({
            success : true,
            msg : "berhasil update",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})