import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_data"

export const merchants_periods = express.Router()

merchants_periods.post("/merchants_periods_create", form_data.none(), async (req,res)=>{
    try {
        const data = await req.body
        const result = await ps.merchants_periods.create({
            data : {
                merchant_id : parseInt(data.merchant_id),
                kodepos_id : parseInt(data.kodepos_id),
                // start_date : data.start_date,
                end_date : data.end_date
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

merchants_periods.get("/merchants_periods_read_all", async(req,res)=>{
    try {
        const result = await ps.merchants_periods.findMany()
        res.json({
            succes : true,
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

merchants_periods.put("/merchants_periods_update/:id", form_data.none(), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.merchants_periods.update({
            where : {
                id : parseInt(id)
            },
            data : {
                merchant_id : parseInt(data.merchant_id),
                kodepos_id : parseInt(data.kodepos_id),
                // start_date : data.start_date,
                end_date : data.end_date
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