const express = require('express');
const router = express.Router();

//item Model
const Item = require('../../models/Item');

// @route   GET api/items
// desc     Get all items
// @access  Public
router.get('/',(req,res)=>{
    var query = {};
    Item.find(query)
    .sort({date:-1})
    .then(items=> {
        res.json(items)
    })
});


// @route   POST api/items
// desc     Add item
// @access  Public
router.post('/',(req,res)=>{
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item=>res.json(item))
});

// @route   DELETE api/items:id
// desc     Delete item
// @access  Public
router.delete('/:id',(req,res)=>{
    Item.deleteOne({_id:req.params.id})
    .then(() => res.json({success:true}))
    .catch(err => res.status(404).json({success:false,error:err.message}))
});

// @route   UPDATE api/items:id
// desc     Update item
// @access  Public
router.put('/:id/:name',(req,res)=>{
    var myquery = { _id: req.params.id };
  var newvalues = { $set: { name: req.params.name } };
    Item.updateOne(myquery,newvalues)
    .then(() => Item.find().then(item=>res.json(item)).catch(err=>err.status(500)))
    .catch(err => res.json(err))
});

module.exports = router;