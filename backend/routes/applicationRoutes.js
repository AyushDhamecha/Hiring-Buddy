const express = require("express")
const router = express.Router()
const Application = require("../models/Application")
const Job = require("../models/Job")

// GET all applications
router.get("/", async (req, res) => {
  try {
    console.log("[backend] GET /api/applications - Fetching all applications")
    const applications = await Application.find().sort({ appliedDate: -1 }).populate("jobId")
    console.log(`[backend] Found ${applications.length} applications`)
    res.json(applications)
  } catch (error) {
    console.error("[backend] GET /api/applications - Error:", error.message)
    res.status(500).json({ message: error.message })
  }
})

// GET applications by job ID
router.get("/job/:jobId", async (req, res) => {
  try {
    console.log("[backend] GET /api/applications/job/:jobId - Job ID:", req.params.jobId)
    const applications = await Application.find({ jobId: req.params.jobId }).sort({ appliedDate: -1 })
    res.json(applications)
  } catch (error) {
    console.error("[backend] GET /api/applications/job/:jobId - Error:", error.message)
    res.status(500).json({ message: error.message })
  }
})

// GET a single application by ID
router.get("/:id", async (req, res) => {
  try {
    console.log("[backend] GET /api/applications/:id - ID:", req.params.id)
    const application = await Application.findById(req.params.id).populate("jobId")
    if (!application) return res.status(404).json({ message: "Application not found" })
    res.json(application)
  } catch (error) {
    console.error("[backend] GET /api/applications/:id - Error:", error.message)
    res.status(500).json({ message: error.message })
  }
})

// CREATE a new application
router.post("/", async (req, res) => {
  try {
    console.log("[backend] POST /api/applications - Received data:", JSON.stringify(req.body, null, 2))

    const application = new Application({
      name: req.body.name,
      number: req.body.number,
      email: req.body.email,
      address: req.body.address,
      dob: new Date(req.body.dob),
      skills: req.body.skills,
      resumePDF: req.body.resumePDF,
      videoMP4: req.body.videoMP4 || null,
      jobId: req.body.jobId,
      appliedTo: req.body.appliedTo,
      appliedDate: new Date(),
      status: "Applied",
    })

    const savedApplication = await application.save()
    console.log("[backend] ✓ Application created successfully!")
    console.log("[backend] Application ID:", savedApplication._id)
    console.log("[backend] Applicant Name:", savedApplication.name)
    console.log("[backend] Applied to Job ID:", savedApplication.jobId)
    console.log("[backend] Saved to collection: applications")
    console.log("[backend] Full saved application:", JSON.stringify(savedApplication, null, 2))

    // Update job applicant count
    if (req.body.jobId) {
      const updatedJob = await Job.findByIdAndUpdate(req.body.jobId, { $inc: { applicants: 1 } }, { new: true })
      console.log("[backend] Updated applicant count for job:", req.body.jobId)
      console.log("[backend] New applicant count:", updatedJob.applicants)
    }

    res.status(201).json(savedApplication)
  } catch (error) {
    console.error("[backend] POST /api/applications - Error:", error.message)
    res.status(400).json({ message: error.message })
  }
})

// UPDATE application status
router.put("/:id", async (req, res) => {
  try {
    console.log("[backend] PUT /api/applications/:id - ID:", req.params.id)
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!application) return res.status(404).json({ message: "Application not found" })
    console.log("[backend] ✓ Application updated:", application._id)
    res.json(application)
  } catch (error) {
    console.error("[backend] PUT /api/applications/:id - Error:", error.message)
    res.status(400).json({ message: error.message })
  }
})

// DELETE an application
router.delete("/:id", async (req, res) => {
  try {
    console.log("[backend] DELETE /api/applications/:id - ID:", req.params.id)
    const application = await Application.findByIdAndDelete(req.params.id)
    if (!application) return res.status(404).json({ message: "Application not found" })

    // Decrement job applicant count
    if (application.jobId) {
      await Job.findByIdAndUpdate(application.jobId, { $inc: { applicants: -1 } })
      console.log("[backend] Updated applicant count for job:", application.jobId)
    }

    console.log("[backend] ✓ Application deleted:", application._id)
    res.json({ message: "Application deleted successfully" })
  } catch (error) {
    console.error("[backend] DELETE /api/applications/:id - Error:", error.message)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
