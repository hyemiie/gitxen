import "./team.css";

export default function ForYourTeam() {
  return (
    <div className="team-wrapper">
      <div className="team-header">
        <h1>What's in it for your team</h1>
        <p>
          Boost your workflow with seamless GitHub integration and AI-powered bug detection.  
          Build, collaborate, and debug faster — all in one place.
        </p>
      </div>

      <div className="team-grid">
        <div className="team-card">
          <div className="icon">💬</div>
          <h2>GitHub Chat App</h2>
          <p>
            Bring your GitHub discussions into a real-time chat.  
            Collaborate on pull requests, commits, and issues without losing  
            context or switching tabs.
          </p>
        </div>

        <div className="team-card">
          <div className="icon">🪲</div>
          <h2>Bug Identifier</h2>
          <p>
            Let AI scan your code for potential bugs and vulnerabilities.  
            Get instant insights and suggestions to fix issues before they  
            make it to production.
          </p>
        </div>
      </div>
    </div>
  );
}
