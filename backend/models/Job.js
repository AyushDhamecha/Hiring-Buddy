const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      enum: ["Engineering", "Design", "Product", "Sales", "Marketing", "HR"],
    },
    location: {
      type: String,
      required: true,
      enum: ["Remote", "On-site", "Hybrid"],
    },
    salaryRange: {
      type: String,
      required: true,
    },
    openings: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
    },
    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Draft", "Paused", "Closed"],
      default: "Active",
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    applicants: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Job", jobSchema)
