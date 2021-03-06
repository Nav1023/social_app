const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  description: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String
      }
    }
  ],
  skills: {
    type: [String]
  },
  social: {
    linkedin: {
      type: String
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    youtube: {
      type: String,
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);
