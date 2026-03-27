import React, { useState } from "react";
import "../styles/interview.scss";

const Interview = () => {
    // Sample data - will be replaced with API call
    const interviewData = {
        matchScore: 88,
        technicalQuestions: [
            {
                question: "Describe your approach to architecting a modular component library. How do you ensure reusability, maintainability, and scalability across multiple products?",
                intention: "To assess the candidate's understanding of scalable frontend architecture, design patterns, and practical experience in building reusable UI systems.",
                answer: "Discuss principles of modular design, such as single responsibility, separation of concerns, and reusability. Explain how you would structure the library (e.g., atomic design principles), use tools like Storybook for documentation and isolated development, implement robust testing (unit, integration), and ensure type safety with TypeScript."
            },
            {
                question: "You mentioned improving load speeds by 1.2s. Can you elaborate on the specific techniques you used to achieve this?",
                intention: "To evaluate the candidate's practical experience and in-depth knowledge of web performance optimization techniques.",
                answer: "Elaborate on specific techniques used, such as code splitting, memoization, image optimization, and virtualized lists."
            }
        ],
        behavioralQuestions: [
            {
                question: "Tell me about your experience mentoring junior developers. What challenges did you face?",
                intention: "To evaluate the candidate's leadership skills, ability to guide and develop team members.",
                answer: "Use the STAR method. Describe specific instances where you mentored junior developers, outlining the situation, tasks involved, actions taken, and positive results."
            },
            {
                question: "Describe a complex technical challenge you faced while building a web application.",
                intention: "To assess the candidate's problem-solving skills and ability to handle technical complexity.",
                answer: "Use the STAR method. Describe a complex technical challenge, detail the situation, the specific problem, and the final outcome."
            }
        ],
        skillGaps: [
            { skill: "Message Queues\n(Kafka/RabbitMQ)", severity: "medium" },
            { skill: "Advanced Docker & CI/CD\nPipelines", severity: "medium" },
            { skill: "Distributed Systems Design", severity: "medium" },
            { skill: "Production-level Redis\nmanagement", severity: "low" }
        ],
        preparationPlan: [
            {
                day: 1,
                focus: "Node.js Internals & Streams",
                tasks: [
                    "Deep dive into the Event Loop phases and process.nextTick vs setImmediate.",
                    "Practice implementing Node.js Streams for handling large data sets."
                ]
            },
            {
                day: 2,
                focus: "Advanced MongoDB & Indexing",
                tasks: [
                    "Study Compound Indexes, TTL Indexes, and Text Indexes.",
                    "Practice writing complex Aggregation pipelines and using the.explain('executionStats') method."
                ]
            },
            {
                day: 3,
                focus: "Caching & Redis Strategies",
                tasks: [
                    "Read about Redis data types beyond strings (Sets, Hashes, Sorted Sets).",
                    "Implement a Redis-based rate limiter or a caching layer for a sample API."
                ]
            },
            {
                day: 4,
                focus: "System Design & Microservices",
                tasks: [
                    "Study Microservices communication patterns (Synchronous vs Asynchronous).",
                    "Learn about the API Gateway pattern and Circuit Breakers."
                ]
            },
            {
                day: 5,
                focus: "Message Queues & DevOps Basics",
                tasks: [
                    "Watch introductory tutorials on RabbitMQ or Kafka.",
                    "Understand containerization basics and Docker fundamentals."
                ]
            },
            {
                day: 6,
                focus: "Advanced Database & Architecture",
                tasks: [
                    "Deep dive into database sharding, replication, and consistency models.",
                    "Study API Gateway patterns and load balancing strategies."
                ]
            },
            {
                day: 7,
                focus: "Mock Interview & Deep Dive",
                tasks: [
                    "Conduct a comprehensive system design mock interview.",
                    "Review all key concepts and ensure mastery of technical topics."
                ]
            }
        ]
    };

    const [activeSection, setActiveSection] = useState("roadmap");
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    return (
        <div className="interview-container">
            {/* Header with Match Score */}
            <div className="interview-header">
                <h1>Interview Preparation Plan</h1>
                <div className="match-score">
                    <span className="score-label">Match Score</span>
                    <span className="score-value">{interviewData.matchScore}%</span>
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
                                {interviewData.technicalQuestions.map((q, index) => (
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
                                {interviewData.behavioralQuestions.map((q, index) => (
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
                                    {interviewData.preparationPlan.map((plan, index) => (
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-marker">
                                                <div className="timeline-circle">
                                                    <span>Day {plan.day}</span>
                                                </div>
                                                {index !== interviewData.preparationPlan.length - 1 && (
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
                            <span className="score-value">{interviewData.matchScore}</span>
                        </div>
                        <p className="match-score-text">Strong match for this role</p>
                    </div>

                    <div className="skill-gaps-section">
                        <h3 className="sidebar-title">Skill Gaps</h3>
                        <div className="skill-badges">
                            {interviewData.skillGaps.map((gap, index) => (
                                <button key={index} className="skill-badge">
                                    {gap.skill}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="event-loop-section">
                        <button className="event-loop-btn">Event loop</button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Interview;
