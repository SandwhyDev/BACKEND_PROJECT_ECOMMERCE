import express from "express"
import ps from "../prisma/connection"

import form_data from "../services/form_data"

export const merchants = express.Router()

merchants.post("/merchants_create", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.merchants.create({
            data : {
                admin_id : parseInt(data.admin_id),
                merchant_name : data.merchant_name,
                kodepos : parseInt(data.kodepos)
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

merchants.get("/merchants_read_all", async (req,res)=>{
    try {
        const result = await ps.merchants.findMany({
            include : {
                products : true
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

merchants.put("/merchants_update/:id", form_data.none(), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.merchants.update({
            where : {
                id : parseInt(id)
            },
            data : {
                admin_id : parseInt(data.admin_id),
                merchant_name : data.merchant_name,
                kodepos : parseInt(data.kodepos)
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

merchants.delete("/merchants_delete/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        const result = await ps.merchants.delete({
            where : {
                id : parseInt(id)
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