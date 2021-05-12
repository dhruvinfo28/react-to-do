const express = require('express')
const mongoose = require('mongoose')
const Item = require('../models/items')

const router = express.Router();

// /items 

//Get all items
router.get('/',(req,res)=>{
    Item.find({})
        .then((items)=>{
            if(items.length>0)
                res.status(200).json(items)
            else{
                res.status(404).json({
                    error: 'No items found'
                })
            }
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})

//Get a specific item
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Item.findById(id)
        .then((item)=>{
            if(item){
                res.status(200).json(item);
            }
            else{
                res.status(404).json({
                    error: 'URL not found'
                })
            }
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})

//Add a new item
router.post('/',(req,res)=>{
    const item = req.body.item;
    if(item){
        const new_item = new Item({
            item,
            _id: new mongoose.Types.ObjectId()
        })
    
        new_item.save()
            .then((result)=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(500).json(err);
            })
    }else{
        res.status(400).json({
            error: 'Bad Request'
        })
    }
})


//Delete an item
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Item.deleteOne({_id:id})
        .then(result=>{
            res.status(200).json({
                message:'Item successfully deleted'
            })
        })
        .catch(err=>{
            res.status(500).json(err);
        })
})

module.exports = router;