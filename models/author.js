const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: {type: String, required: true, max: 100},
  family_name: {type: String, required: true, max: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
});

AuthorSchema.virtual('name').get(function(){
  let fullname = '';
  if(this.first_name && this.family_name){
    fullname = this.family_name +', ' +this.first_name;
  }
  if(!this.first_name || !this.family_name){
    fullname = '';
  }
  return fullname;
});

AuthorSchema.virtual('lifespan').get(function() {
  let lifetime_string = '';
  if(this.date_of_birth){
    lifetime_string = this.date_of_birth.getYear().toString();
  }
  lifetime_string += ' - ';
  if(this.date_of_death){
    lifetime_string += this.date_of_death.getYear();
  }
  return lifetime_string;
  // return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual('url').get(function() {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('due_back_formatted').get(() => {
  return DateTime.now().setLocale('br').toLocaleString();
  // return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

// export 
module.exports = mongoose.model('Author', AuthorSchema);