import Transaction from '../models/TransactionModel.js';
import jwt from 'jsonwebtoken';
import Profile from '../models/UsersModel.js'
import {registerValidation} from '../middlewares/TransactionValidation.js';
// import schema from ''
class TransactionController {
    static send = async (req, res) => {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // if(!token) return res.status(401).send('Access Denied');

        //Let's validate the inputs.
        // const {error} = registerValidation(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified.user;

            // const {error} = schema.validate(req.body);
            // if (error) return res.status(400).send(error.details[0].message);  

            let profile = await Profile.findById(req.user.id)

            const test = {
                SenderId: req.user.id,
                SenderUserName : req.user.username,
                ReceiverId: req.body.Receiver,
                SendingAmount : req.body.SendingAmount,
                ConvertedAmount : req.body.ConvertedAmount,
                SendingCurrency : req.body.SendingCurrency,
                ReceivingCurrency : req.body.ReceivingCurrency,
            }
                
            if((test.SendingCurrency == 'USD') && (parseInt(test.SendingAmount) > parseInt(profile.USD))) return res.status(400).json({message: 'Insufficient Balance'});

            if((test.SendingCurrency == 'EUR') && (parseInt(test.SendingAmount) > parseInt(profile.EUR))) return res.status(400).json({message: 'Insufficient Balance'});

            if((test.SendingCurrency == 'NGN') && (parseInt(test.SendingAmount) > parseInt(profile.NGN))) return res.status(400).json({message: 'Insufficient Balance'});

            const transaction = new Transaction({
                SenderId: req.user.id,
                SenderUserName : req.user.username,
                ReceiverId: req.body.Receiver,
                SendingAmount : req.body.SendingAmount,
                ConvertedAmount : req.body.ConvertedAmount,
                SendingCurrency : req.body.SendingCurrency,
                ReceivingCurrency : req.body.ReceivingCurrency,
            })

            await transaction.save().then(
                function() {
                    if ( test.SendingCurrency == 'USD')  (parseInt(profile.USD) - parseInt(test.SendingAmount));
                    // const balance = parseInt(profile.USD) - parseInt(test.SendingAmount);
                    // if ( test.SendingCurrency == 'USD'){
                    //     Profile.findById(req.user.id).populate('USD', balance).exec();
                    // };
                }
            );
            res.status(200).json({transaction});

        } catch (error) {
            res.status(error.status).json({
                error,
            })
        }

    }

    static GetAllTransactions = async (req, res) => {
        try {
            let transaction = await Transaction.find();
            res.status(200).json({ transaction });
        }
         catch (error) {
            res.status(404).json({message: error});
        }

    }

}

export default TransactionController;