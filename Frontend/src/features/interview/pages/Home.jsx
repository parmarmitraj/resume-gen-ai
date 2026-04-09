import React, {useState, useRef} from "react";
import "../styles/home.scss";
import { useInteview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {

    const {loading, generateReport, reports} = useInteview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        try {
            const data = await generateReport({jobDescription, selfDescription, resumeFile})
            if(data && data._id) {
                navigate(`/interview/${data._id}`)
            }
        } catch (error) {
            console.error("Error generating report:", error)
        }
    }

    if(loading){
        return (
            <main className="loading-screen">
                <h1>Generating Your Interview Strategy...</h1>
            </main>
        )
    }

    return (
        <main className="home">
            <div className="interview-card">
                <div className="interview-card__header">
                    <h1>Create Your Custom <span>Interview Plan</span></h1>
                    <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </div>

                <div className="interview-card__content">
                    <div className="job-section">
                        <div className="section-header">
                            <h2>Target Job Description</h2>
                            <span className="badge badge--required">REQUIRED</span>
                        </div>
                        <textarea
                            onChange={(e)=>{setJobDescription(e.target.value)}}
                            id="jobDescription"
                            name="jobDescription"
                            className="textarea"
                            placeholder="Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                        />
                        <div className="char-count">0 / 5000 chars</div>
                    </div>

                    <div className="profile-section">
                        <div className="profile-card">
                            <div className="profile-card__header">
                                <h2>Your Profile</h2>
                            </div>

                            <div className="upload-box">
                                <div className="upload-box__label">
                                    <strong>Upload Resume</strong>
                                    <span className="badge badge--results">BEST RESULTS</span>
                                </div>
                                <label htmlFor="resume" className="upload-area">
                                    <div className="upload-icon">📎</div>
                                    <p>Click to upload or drag & drop</p>
                                    <small>PDF or DOCX (Max 5MB)</small>
                                </label>
                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf,.docx"
                                />
                            </div>

                            <div className="divider">OR</div>

                            <div className="self-description-box">
                                <label htmlFor="selfDescription">Quick Self Description</label>
                                <textarea
                                    onChange={(e)=>{setSelfDescription(e.target.value)}}
                                    id="selfDescription"
                                    name="selfDescription"
                                    className="textarea"
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />
                            </div>

                            <div className="info-box">
                                <span className="info-icon">ℹ️</span>
                                <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="interview-card__footer">
                    <div className="footer-info">AI-Powered Strategy Generation • Approx 30s</div>
                    <button onClick={handleGenerateReport} className="generate-btn">Generate My Interview Strategy</button>
                </div>
            </div>

            {reports.length > 0 && (
                <div className="interview-reports">
                    <h2>Previous Interview Reports</h2>
                    <div className="reports-list">
                        {reports.map((report) => (
                            <div key={report._id} className="report-card" onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title}</h3>
                                <p className="job-description">{report.jobDescription?.substring(0, 100)}...</p>
                                <p className="match-score-report">Match Score: {report.matchScore}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            <footer className="page-footer">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>
            </footer>
        </main>
    );
};

export default Home;