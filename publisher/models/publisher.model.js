'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subscriptionSchema = new Schema(
  {
    url: {
      type: String
    },
    topic: {
      type: String
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' }
  }
);

subscriptionSchema.methods.toJSON = function () {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  }


  subscriptionSchema.statics = {
  async subscribeToTopic(topic, url) {
    const urlExist = await this.findOne({url})
    let subSaved
    if (!urlExist){
       subSaved = await this.create({ url: url, topic: topic })
    }else{
      return {
        success: false,
        message: `url already exists`
      };
    }


    if (subSaved) {
      return {
        success: true,
        message: 'Subscription created successfully',
        data: subSaved
      };
    } else {
      return {
        success: true,
        message: `Error creating todo`
      };
    }
  }
  
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
