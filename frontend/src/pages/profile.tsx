import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  displayName: string;
  bio: string;
  location: string;
  website: string;
  joinedAt: string;
}

export default function Profile() {
  const { user, authReady } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    displayName: "",
    bio: "",
    location: "",
    website: "",
    joinedAt: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authReady) return;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const profileDoc = await getDoc(doc(db, "users", user.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data() as UserProfile);
        } else {
          // Create default profile
          const defaultProfile = {
            displayName: user.displayName || user.email?.split("@")[0] || "",
            bio: "",
            location: "",
            website: "",
            joinedAt: new Date().toISOString()
          };
          setProfile(defaultProfile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, authReady, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to save your profile.");
      return;
    }

    setSaving(true);
    try {
      console.log("Saving profile for user:", user.uid);
      console.log("Profile data:", profile);
      
      const profileData = {
        displayName: profile.displayName || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
        joinedAt: profile.joinedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.uid,
        email: user.email
      };
      
      await setDoc(doc(db, "users", user.uid), profileData);
      console.log("Profile saved successfully");
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Detailed error saving profile:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      alert(`Failed to save profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#1e293b',
    padding: '3rem',
    borderRadius: '1rem',
    border: '1px solid #334155',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    margin: '0.5rem 0 1rem',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '0.5rem',
    color: '#e2e8f0',
    fontSize: '1rem'
  };

  const buttonStyle = {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  };

  if (loading) return (
    <div style={containerStyle}>
      <p style={{ color: '#e2e8f0', fontSize: '1.125rem', textAlign: 'center' }}>Loading profile...</p>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f1f5f9', marginBottom: '2rem', textAlign: 'center' }}>
          My Profile
        </h1>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            backgroundColor: '#334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '2rem',
            color: '#60a5fa'
          }}>
            {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '👤'}
          </div>
          <p style={{ color: '#94a3b8' }}>{user?.email}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '500', marginBottom: '0.5rem' }}>
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              value={profile.displayName}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Your display name"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '500', marginBottom: '0.5rem' }}>
              Bio
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '500', marginBottom: '0.5rem' }}>
              Location
            </label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Your location"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '500', marginBottom: '0.5rem' }}>
              Website
            </label>
            <input
              type="url"
              name="website"
              value={profile.website}
              onChange={handleChange}
              style={inputStyle}
              placeholder="https://your-website.com"
            />
          </div>

          <button 
            type="submit" 
            disabled={saving}
            style={{ 
              ...buttonStyle, 
              opacity: saving ? 0.7 : 1,
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}