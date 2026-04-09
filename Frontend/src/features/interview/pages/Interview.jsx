import React, { useState } from "react";
import "../styles/interview.scss";
import { useInteview } from "../hooks/useInterview";
import { useParams } from 'react-router'

const Interview = () => {
    const {report, loading} = useInteview();
    const {interviewId} = useParams()

    const [activeSection, setActiveSection] = useState("roadmap");
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    if(loading || !report) {
        return <div className="loading">Loading interview report...</div>;
    }

    return (
        <div className="interview-container">
            {/* Header with Match Score */}
            <div className="interview-header">
                <h1>Interview Preparation Plan</h1>
                <div className="match-score">
                    <span className="score-label">Match Score</span>
                    <span className="score-value">{report?.matchScore}%</span>
                </div>
            </div>

            <div className="interview-layout">
                {/* Left Sidebar */}
                <aside className="interview-sidebar sidebar-left">
                    <div className="sidebar-header">SECTIONS</div>
                    <nav className="sidebar-nav">
                        <button
                            className={`nav-item ${activeSection === "technical" ? "active" : ""}`}
                            onClick={() => setActiveSection("technical")}
                        >
                            <span className="nav-icon">◇</span> Technical Questions
                        </button>
                        <button
                            className={`nav-item ${activeSection === "behavioral" ? "active" : ""}`}
                            onClick={() => setActiveSection("behavioral")}
                        >
                            <span className="nav-icon">□</span> Behavioral Questions
                        </button>
                        <button
                            className={`nav-item ${activeSection === "roadmap" ? "active" : ""}`}
                            onClick={() => setActiveSection("roadmap")}
                        >
                            <span className="nav-icon">▶</span> Road Map
                        </button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="interview-main">
                    {/* Technical Questions Section */}
                    {activeSection === "technical" && (
                        <div className="content-section">
                            <h2 className="section-title">Technical Questions</h2>
                            <div className="questions-list">
                                {report?.technicalQuestions?.map((q, index) => (
                                    <div
                                        key={index}
                                        className="question-card"
                                        onClick={() =>
                                            setExpandedQuestion(
                                                expandedQuestion === `tech-${index}` ? null : `tech-${index}`
                                            )
                                        }
                                    >
                                        <div className="question-header">
                                            <span className="question-number">{index + 1}</span>
                                            <p className="question-text">{q.question}</p>
                                            <span className={`expand-icon ${expandedQuestion === `tech-${index}` ? "expanded" : ""}`}>
                                                ▼
                                            </span>
                                        </div>
                                        {expandedQuestion === `tech-${index}` && (
                                            <div className="question-details">
                                                <div className="detail-item">
                                                    <h4>Intention</h4>
                                                    <p>{q.intention}</p>
                                                </div>
                                                <div className="detail-item">
                                                    <h4>Suggested Answer</h4>
                                                    <p>{q.answer}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Behavioral Questions Section */}
                    {activeSection === "behavioral" && (
                        <div className="content-section">
                            <h2 className="section-title">Behavioral Questions</h2>
                            <div className="questions-list">
                                {report?.behavioralQuestions?.map((q, index) => (
                                    <div
                                        key={index}
                                        className="question-card"
                                        onClick={() =>
                                            setExpandedQuestion(
                                                expandedQuestion === `behavioral-${index}` ? null : `behavioral-${index}`
                                            )
                                        }
                                    >
                                        <div className="question-header">
                                            <span className="question-number">{index + 1}</span>
                                            <p className="question-text">{q.question}</p>
                                            <span className={`expand-icon ${expandedQuestion === `behavioral-${index}` ? "expanded" : ""}`}>
                                                ▼
                                            </span>
                                        </div>
                                        {expandedQuestion === `behavioral-${index}` && (
                                            <div className="question-details">
                                                <div className="detail-item">
                                                    <h4>Intention</h4>
                                                    <p>{q.intention}</p>
                                                </div>
                                                <div className="detail-item">
                                                    <h4>Suggested Answer</h4>
                                                    <p>{q.answer}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Road Map Section */}
                    {activeSection === "roadmap" && (
                        <div className="content-section">
                            <div className="roadmap-header">
                                <h2 className="section-title">Preparation Road Map</h2>
                                <span className="roadmap-duration">7-day plan</span>
                            </div>
                            <div className="timeline-wrapper">
                                <div className="timeline">
                                    {report?.preparationPlan?.map((plan, index) => (
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-marker">
                                                <div className="timeline-circle">
                                                    <span>Day {plan.day}</span>
                                                </div>
                                                {index !== (report?.preparationPlan?.length ?? 0) - 1 && (
                                                    <div className="timeline-line"></div>
                                                )}
                                            </div>
                                            <div className="timeline-content">
                                                <h3>{plan.focus}</h3>
                                                <ul>
                                                    {plan.tasks.map((task, taskIndex) => (
                                                        <li key={taskIndex}>{task}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Right Sidebar */}
                <aside className="interview-sidebar sidebar-right">
                    <div className="match-score-section">
                        <div className="sidebar-header">MATCH SCORE</div>
                        <div className="match-score">
                            <span className="score-label">Match</span>
                            <span className="score-value">{report?.matchScore}</span>
                        </div>
                        <p className="match-score-text">Strong match for this role</p>
                    </div>

                    <div className="skill-gaps-section">
                        <h3 className="sidebar-title">Skill Gaps</h3>
                        <div className="skill-badges">
                            {report?.skillGaps?.map((gap, index) => (
                                <button key={index} className="skill-badge">
                                    {gap.skill}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Interview;
