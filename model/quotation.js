const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
});

const Quotation = mongoose.model("quotations", quotationSchema);

module.exports = Quotation;