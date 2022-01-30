const mongoose = require('mongoose');

const mongoose = require('mongoose');

const BookSchema = new Schema(
  {
    title: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: { type: String, required: true},
    isbn: { type: String, required: true},
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre'}]
  }
);

BookSchema.virtual('url').get(() => {
  return '/catalog/book/'+ this._id;
});

module.exports = mongoose.model('Book', BookSchema);