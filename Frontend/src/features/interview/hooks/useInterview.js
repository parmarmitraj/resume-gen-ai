import {getAllInterviewReports, generateInterviewReport, getInterviewReportById} from "../services/interview.api"
import { use, useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"

export const useInteview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescripition, resumeFile}) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({jobDescription, selfDescripition, resumeFile})
            setReport(response.interviewReport)
        } catch (error) {
            // Silent error handling - no console output
        }finally{
            setLoading(false)
        }

        return response?.interviewReport
    }

    const getReportById = async (id) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(id)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
            setReport(null)
        }finally{
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null

        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        return response?.interviewReports
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        } else {
            getReports();
        }
    }, [interviewId]);


    return {loading, report, reports, generateReport, getReportById, getReports}

}