import React from "react";
import "../styles/home.scss";

const Home = () => {
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
                    <button className="generate-btn">★ Generate My Interview Strategy</button>
                </div>
            </div>

            <footer className="page-footer">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>
            </footer>
        </main>
    );
};

export default Home;