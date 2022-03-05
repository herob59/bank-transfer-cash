// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const TransactionSchema = mongoose.Schema({
    SenderId : {
        type: 'string',
        required: true,
        min: 6,
        max: 255
    },

    SenderUserName : {
        type: 'string',
        required: true,
        min: 6,
        max: 255
    },

    ReceiverId : {
        type: 'string',
        required: true,
        min: 6,
        max: 255
    },

    SendingAmount : {
        type: 'string',
        required: true,
        max: 1024
    },

    ConvertedAmount : {
        type: 'string',
        default: '1000',
    },

    SendingCurrency : {
        type: 'string',
        default: '0',
    },

    ReceivingCurrency : {
        type: 'string',
    },

    createdDate : {
        type: Date,
        default: Date.now
    },

    updatedDate : {
        type: Date,
        default: Date.now
    },
    
});

export default mongoose.model('Transactions', TransactionSchema);