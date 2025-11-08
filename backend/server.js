// Import dependencies
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI 

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✓ Connected to MongoDB"))
  .catch((err) => console.error("✗ MongoDB connection error:", err))

// Import Models
const Job = require("./models/Job")
const Application = require("./models/Application")

// Routes

// ============ JOB ROUTES ============

// GET all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET a single job by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json(job)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// CREATE a new job
app.post("/api/jobs", async (req, res) => {
  const job = new Job(req.body)
  try {
    const savedJob = await job.save()
    console.log("✓ Job created:", savedJob)
    res.status(201).json(savedJob)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// UPDATE a job
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!job) return res.status(404).json({ message: "Job not found" })
    console.log("✓ Job updated:", job)
    res.json(job)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE a job
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id)
    if (!job) return res.status(404).json({ message: "Job not found" })
    console.log("✓ Job deleted:", job)
    res.json({ message: "Job deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ============ APPLICATION ROUTES ============

// GET all applications
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedDate: -1 }).populate("jobId")
    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET applications by job ID
app.get("/api/applications/job/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId }).sort({ appliedDate: -1 })
    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET a single application by ID
app.get("/api/applications/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate("jobId")
    if (!application) return res.status(404).json({ message: "Application not found" })
    res.json(application)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// CREATE a new application
app.post("/api/applications", async (req, res) => {
  const application = new Application(req.body)
  try {
    const savedApplication = await application.save()
    console.log("✓ Application submitted:", savedApplication)

    // Update job applicant count
    if (req.body.jobId) {
      await Job.findByIdAndUpdate(req.body.jobId, { $inc: { applicants: 1 } })
    }

    res.status(201).json(savedApplication)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// UPDATE application status
app.put("/api/applications/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!application) return res.status(404).json({ message: "Application not found" })
    console.log("✓ Application updated:", application)
    res.json(application)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE an application
app.delete("/api/applications/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id)
    if (!application) return res.status(404).json({ message: "Application not found" })

    // Decrement job applicant count
    if (application.jobId) {
      await Job.findByIdAndUpdate(application.jobId, { $inc: { applicants: -1 } })
    }

    console.log("✓ Application deleted:", application)
    res.json({ message: "Application deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ============ HEALTH CHECK ============

app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 API Endpoints:`)
  console.log(`   GET    /api/jobs`)
  console.log(`   POST   /api/jobs`)
  console.log(`   PUT    /api/jobs/:id`)
  console.log(`   DELETE /api/jobs/:id`)
  console.log(`   GET    /api/applications`)
  console.log(`   POST   /api/applications`)
  console.log(`   PUT    /api/applications/:id`)
  console.log(`   DELETE /api/applications/:id\n`)
})
