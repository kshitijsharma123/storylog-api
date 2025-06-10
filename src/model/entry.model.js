import mongoose from "mongoose";
const entrySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true
    },
    moodTags: {
      type: [String],
      required: true
    },
    moodScore: {
      type: Number,
      required: true,
      min: -5,
      max: 5
    },
    wordCount: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    archive: [
      {
        title: String,
        body: String,
        moodTags: [String],
        moodScore: Number,
        wordCount: Number,
        updatedAt: Date
      }
    ]
  },
  { timestamps: true }
);

// Auto-calculate word count before saving
entrySchema.pre('save', function (next) {
  this.wordCount = this.body.trim().split(/\s+/).length;
  next();
});

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;