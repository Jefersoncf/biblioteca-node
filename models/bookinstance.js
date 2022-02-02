const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema ({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true}, //referencia a associação a book
  imprint: {type: String, required: true},
  status: { type: String, required: true, 
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
  due_back: {type: Date, default: Date.now()},
});

BookInstanceSchema.virtual('url','due_back_formatted').get(() => {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);
