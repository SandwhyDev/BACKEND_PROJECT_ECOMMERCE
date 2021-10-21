import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_data"

export const products = express.Router()

products.post("/products_create", form_data.none(), async (req,res)=>{
    try {
        const data = await req.body
        const result = await ps.products.create({
            data : {
                nama : data.nama,
                merchants_id : parseInt(data.merchants_id),
                harga : parseInt(data.harga),
                status : data.status,
                categori_id : parseInt(data.categori_id)
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

products.get("/products_read_all", async(req,res)=>{
    try {
        const result = await ps.products.findMany({
            include : {
                order_item : true
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