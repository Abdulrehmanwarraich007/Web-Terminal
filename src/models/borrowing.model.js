const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Book is required'],
    },
    borrower: {
        type: String,
        required: [true, 'Borrower is required'],
    },
    borrowDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date,
        required: [true, 'Return Date is required'],
    },
}, { timestamps: true });

const Borrowing = mongoose.model('Borrowing', borrowingSchema);

module.exports = Borrowing;
