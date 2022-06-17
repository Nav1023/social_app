const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      reactionType: {
        type: String,
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now
      },
      name: {
        type: String,
        required: true,
      },
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('post', PostSchema);
