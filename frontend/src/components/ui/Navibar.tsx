import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Navibar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const profileDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (profileDoc.exists()) {
            setProfileData(profileDoc.data());
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setProfileData(null);
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#0f172a',
    borderBottom: '1px solid #334155',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const linkStyle = {
    color: '#e2e8f0',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
    fontSize: '1rem',
    fontWeight: '500'
  };

  const buttonStyle = {
    ...linkStyle,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc2626',
    color: 'white'
  };

  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    backgroundColor: '#1e293b',
    border: '1px solid #334155'
  };

  const avatarStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    color: '#60a5fa',
    fontWeight: 'bold'
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ ...linkStyle, fontSize: '1.25rem', fontWeight: 'bold', color: '#60a5fa' }}>
          Community Hub
        </Link>
      </div>
        
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {!user ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/my-communities" style={linkStyle}>My Communities</Link>
            
            <Link to="/profile" style={{ ...linkStyle, ...profileStyle, textDecoration: 'none' }}>
              <div style={avatarStyle}>
                {(profileData?.displayName || user.displayName)?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '👤'}
              </div>
              <span style={{ color: '#e2e8f0', fontSize: '0.875rem' }}>
                {profileData?.displayName || user.displayName || user.email?.split('@')[0] || 'Profile'}
              </span>
            </Link>
            
            <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navibar;
