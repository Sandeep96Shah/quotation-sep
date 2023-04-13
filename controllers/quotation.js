// import the Quotation Model
const Quotation = require('../model/quotation');
const User = require('../model/user');

// controller action to create the Quotation
module.exports.createQuotation = async (req, res) => {
    try{
        // 1-> get the content and userId from the req.body object
        const { content } = req.body;
        const { _id: user } = req.user;

        // 2-> add the content details in the Quotation Model
        const quotation = await Quotation.create({
            content: content,
            user: user
        })

        const userDetails = await User.findById(user);
        userDetails.quotations.push(quotation._id);
        userDetails.save();

        // 3-> send the response 
        return res.status(200).json({
            message: "Quotation created successfully",
            data: {
                quotation: quotation,
            }
        })
    }catch(error){
        return res.status(500).json({
            message: "Opps something went wrong",
            data: {
                error: error,
            }
        })
    }
}

// controller action to get all the quotations
module.exports.allQuotations = async (req, res) => {
    try{
        // 1-> get all quotations from the Quotation model
        // 2-> populate the user property to get only the name
        const quotations = await Quotation.find({}).populate({
            path: "user",
            select: "name"
        });

        // 3-> send the quotations as response
        return res.status(200).json({
            message: "Successfuly fethced the quotations!",
            data: {
                quotations: quotations,
            }
        });
    }catch(error){
        return res.status(500).json({
            message: "Opps something went wrong!",
            data: {
                error: error,
            }
        })
    }
}