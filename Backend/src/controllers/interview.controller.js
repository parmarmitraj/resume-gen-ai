const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const InterviewReportModel = require("../models/interviewReport.model")

/**
 * @description generate new interview report on the basis user self description, resume pdf and job description
 */
async function generateInterviewReportController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    // Extract job title from job description if AI didn't provide it
    const jobTitle = interviewReportByAi?.title || jobDescription.split('\n')[0] || "Job Position"

    const interviewReport = await InterviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        title: jobTitle,
        ...interviewReportByAi
    })

    res.status(201).json({
        message : "Interview report generated successfully",
        interviewReport
    })
}   


/**
 * @description get interview report by interview id
 */
async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params

    const interviewReport = await InterviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })
}

/**
 * @description get all interview reports of the logged-in user
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await InterviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController }