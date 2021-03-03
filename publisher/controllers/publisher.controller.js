const Publisher = require('../models/publisher.model.js');
const _ = require('lodash')
const axios = require('axios')


exports.subscribeToTopic = async (req, res) => {
    const subSave = await Publisher.subscribeToTopic(req.params.topic, req.body.url);
    if (subSave.success){
        res.json({
            url: subSave.data.url,
            topic: subSave.data.topic
        })
    }else{
        res.json({
            message: subSave.message
        })
    }
}

exports.publishToTopic = async (req, res) => {
    try{
        const topic = await Publisher.findOne({topic: req.params.topic});
        const obj = req.body
        if (topic){
            if (obj instanceof Object || _.isEmpty(obj)) {
                const all = await Publisher.find({});
                for (let i = 0; i < all.length; i++) {
                    const item = all[i]
                  await publish(item.url, {topic: req.params.topic, data: obj })
                }
                res.json({success: true})
            }
        }else{
            res.status(404).json({
                message: "Topic not found"
            })
        }
    }catch(error) {
        res.status(400).json(error)
    }
}



function publish(url, data) {
    try {
        const request = axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url,
            data
        });

        return request.then(async response => {
            console.log(response.data)
        })
    }catch(e){
       throw e
    }
}







