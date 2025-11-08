const express = require("express")
const router = express.Router()
const Job = require("../models/Job")

// GET all jobs
router.get("/", async (req, res) => {
  try {
    console.log("[backend] GET /api/jobs - Fetching all jobs")
    const jobs = await Job.find().sort({ postedDate: -1 })
    console.log(`[backend] Found ${jobs.length} jobs`)
    res.json(jobs)
  } catch (error) {
    console.error("[backend] GET /api/jobs - Error:", error.message)
    res.status(500).json({ message: error.message })
  }
})

// GET a single job by ID
router.get("/:id", async (req, res) => {
  try {
    console.log("[backend] GET /api/jobs/:id - ID:", req.params.id)
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json(job)
  } catch (error) {
    console.error("[backend] GET /api/jobs/:id - Error:", error.message)
    res.status(500).json({ message: error.message })
  }
})

// CREATE a new job
router.post("/", async (req, res) => {
  try {
    console.log("[backend] POST /api/jobs - Received data:", JSON.stringify(req.body, null, 2))

    const job = new Job({
      title: req.body.title,
      department: req.body.department,
      location: req.body.location,
      salaryRange: req.body.salaryRange,
      openings: req.body.openings,
      description: req.body.description,
      responsibilities: req.body.responsibilities || [],
      requirements: req.body.requirements || [],
      skills: req.body.skills,
      status: req.body.status || "Active",
      postedDate: new Date(),
      applicants: 0,
    })

    const savedJob = await job.save()
    console.log("[backend] ✓ Job created successfully!")
    console.log("[backend] Job ID:", savedJob._id)
    console.log("[backend] Job Title:", savedJob.title)
    console.log("[backend] Saved to collection: djobs")
    console.log("[backend] Full saved job:", JSON.stringify(savedJob, null, 2))
    res.status(201).json(savedJob)
  } catch (error) {
    console.error("[backend] POST /api/jobs - Error:", error.message)
    res.status(400).json({ message: error.message })
  }
})

// UPDATE a job
router.put("/:id", async (req, res) => {
  try {
    console.log("[backend] PUT /api/jobs/:id - ID:", req.params.id)
    console.log("[backend] Update data:", JSON.stringify(req.body, null, 2))

    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!job) return res.status(404).json({ message: "Job not found" })
    console.log("[backend] ✓ Job updated successfully:", job._id)
    res.json(job)
  } catch (error) {
    console.error("[backend] PUT /api/jobs/:id - Error:", error.message)
    res.status(400).json({ message: error.message })
  }
})

// DELETE a job
router.delete("/:id", async (req, res) => {
  try {
    console.log("[backend] DELETE /api/jobs/:id - ID:", req.params.id)
    const job = await Job.findByIdAndDelete(req.params.id)
    if (!job) return res.status(404).json({ message: "Job not found" })
    console.log("[backend] ✓ Job deleted successfully:", job._id)
    res.json({ message: "Job deleted successfully" })
  } catch (error) {
    console.error("[backend] DELETE /api/jobs/:id - Error:", error.message)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
