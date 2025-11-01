import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Homepage() {
  const { user } = useAuth();

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#e2e8f0'
  };

  const heroStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem',
    textAlign: 'center' as const
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: '1.5rem',
    lineHeight: '1.1'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: '#94a3b8',
    maxWidth: '800px',
    margin: '0 auto 3rem',
    lineHeight: '1.6'
  };

  const buttonStyle = {
    display: 'inline-block',
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontWeight: '600',
    margin: '0 0.5rem',
    transition: 'all 0.2s',
    border: 'none'
  };

  const buttonSecondaryStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#60a5fa',
    border: '2px solid #1e40af'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    margin: '4rem 0',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  const statCardStyle = {
    backgroundColor: '#1e293b',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    textAlign: 'center' as const,
    border: '1px solid #334155'
  };

  const featuresStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    margin: '4rem 0',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  const featureCardStyle = {
    backgroundColor: '#1e293b',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    textAlign: 'center' as const,
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #334155'
  };

  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <h1 style={titleStyle}>
          Community Dashboard &{' '}
          <span style={{ color: '#2563eb' }}>Analytics Portal</span>
        </h1>
        <p style={subtitleStyle}>
          Monitor, analyze, and engage with your community through interactive analytics 
          and real-time data insights. Perfect for apps, clubs, courses, and forums.
        </p>
        
        {user ? (
          <Link to="/dashboard" style={buttonStyle}>
            Go to Dashboard
          </Link>
        ) : (
          <div>
            <Link to="/signup" style={buttonStyle}>
              Get Started
            </Link>
            <Link to="/login" style={buttonSecondaryStyle}>
              Sign In
            </Link>
          </div>
        )}

        {/* Stats */}
        <div style={statsContainerStyle}>
          {[
            { label: "Active Communities", value: "12+", color: "#60a5fa" },
            { label: "Total Members", value: "2.5K+", color: "#34d399" },
            { label: "Daily Interactions", value: "850+", color: "#a78bfa" },
            { label: "Success Rate", value: "98%", color: "#fb7185" }
          ].map((stat, index) => (
            <div key={index} style={statCardStyle}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: stat.color, marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f1f5f9', margin: '4rem 0 3rem' }}>
          Powerful Features for Community Growth
        </h2>
        <div style={featuresStyle}>
          {[
            {
              icon: "📊",
              title: "Real-time Analytics",
              description: "Track engagement trends, member growth, and activity patterns"
            },
            {
              icon: "🏆",
              title: "Community Leaderboards",
              description: "Gamify participation with rankings and recognition"
            },
            {
              icon: "📢",
              title: "Announcements Hub",
              description: "Keep members informed with real-time updates"
            },
            {
              icon: "⚡",
              title: "Live Updates",
              description: "Seamless real-time data without page refreshes"
            }
          ].map((feature, index) => (
            <div key={index} style={featureCardStyle}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#f1f5f9', marginBottom: '1rem' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
