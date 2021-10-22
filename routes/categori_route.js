import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_data"

export const categori = express.Router()

categori.post("/categori_create", form_data.none(),async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.categori.create({
            data : {
                cat_nama : data.cat_nama
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
            error :  error.message
        })
    }
})

categori.get("/categori_read_all", async(req,res)=>{
    try {
        const result = await ps.categori.findMany({
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
            error :  error.message
        })
    }
})

categori.put("/category_update/:id", form_data.none(), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.categori.update({
            where : {
                id : parseInt(id)
            },
            data : {
                cat_nama : data.cat_nama

            }
        })

        res.json({
            success : true,
            msg : "berhasil update",
            query : result
        })
    } catch (error) {
        res.json({
            success : false, 
            error :  error.message
        })
    }
})

categori.delete("/category_delete/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        const result = await ps.categori.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil delete",
            query : result
        })
    } catch (error) {
        res.json({
            success : false, 
            error :  error.message
        })
    }
})