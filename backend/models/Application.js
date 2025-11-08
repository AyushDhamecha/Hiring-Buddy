const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    resumePDF: {
      type: String,
      required: true,
    },
    videoMP4: {
      type: String,
      default: null,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    appliedTo: {
      type: String,
      required: true,
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Applied", "Under Review", "Interview Scheduled", "Rejected", "Accepted"],
      default: "Applied",
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Application", applicationSchema)
