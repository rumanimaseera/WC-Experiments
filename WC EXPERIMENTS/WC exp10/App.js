import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [project, setProject] = useState({
    title: "",
    members: "",
    guide: "",
    tools: "",
    domain: "",
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const addProject = () => {
    const { title, members, guide, tools, domain, description } = project;
    if (!title || !members || !guide || !tools || !domain || !description) {
      alert("Please fill in all fields!");
      return;
    }

    const newProjects = [
      ...projects,
      { ...project, comments: [], rating: 0, id: Date.now() },
    ];

    setProjects(newProjects);

    setProject({
      title: "",
      members: "",
      guide: "",
      tools: "",
      domain: "",
      description: "",
    });
  };

  const addComment = (id, comment, rating) => {
    if (!comment || rating === 0) {
      alert("Please enter both comment and rating!");
      return;
    }

    setProjects(
      projects.map((proj) =>
        proj.id === id
          ? {
              ...proj,
              comments: [...proj.comments, comment],
              rating: proj.rating === 0 ? rating : (proj.rating + rating) / 2,
            }
          : proj
      )
    );
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  const deleteComment = (projId, index) => {
    setProjects(
      projects.map((proj) =>
        proj.id === projId
          ? {
              ...proj,
              comments: proj.comments.filter((_, idx) => idx !== index),
            }
          : proj
      )
    );
  };

  return (
    <div className="container">
      <h1>Peer Review Mini Projects</h1>

      {/* Project Submission Form */}
      <div className="upload-section">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={project.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="members"
          placeholder="Group Members (comma-separated)"
          value={project.members}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="guide"
          placeholder="Project Guide Name"
          value={project.guide}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tools"
          placeholder="Tools/Technologies Used"
          value={project.tools}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="domain"
          placeholder="Project Domain / Category"
          value={project.domain}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={project.description}
          onChange={handleChange}
          required
        />
        <button onClick={addProject}>Submit Project</button>
      </div>

      {/* Project Cards */}
      <div className="projects-list">
        {projects.map((proj) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            addComment={addComment}
            deleteProject={deleteProject}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, addComment, deleteProject, deleteComment }) {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);

  const submitFeedback = () => {
    addComment(project.id, commentText, parseInt(rating));
    setCommentText("");
    setRating(0);
  };

  return (
    <div
      className="project-card"
      data-toprated={project.rating >= 4.5 ? "true" : "false"}
    >
      <button className="delete-btn" onClick={() => deleteProject(project.id)}>
        Delete Project
      </button>

      <h2>{project.title}</h2>
      <p><strong>Members:</strong> {project.members}</p>
      <p><strong>Guide:</strong> {project.guide}</p>
      <p><strong>Tools:</strong> {project.tools}</p>
      <p><strong>Domain:</strong> {project.domain}</p>
      <p className="project-text">{project.description}</p>
      <h4>Average Rating: {project.rating.toFixed(1)} ⭐</h4>

      <div className="feedback-section">
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          <option value="0">Rate</option>
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="5">5 ⭐</option>
        </select>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button onClick={submitFeedback}>Submit Feedback</button>
      </div>

      <div className="comments-display">
        <ul>
          {project.comments.map((c, idx) => (
            <li key={idx}>
              {c}{" "}
              <button
                className="delete-comment"
                onClick={() => deleteComment(project.id, idx)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
