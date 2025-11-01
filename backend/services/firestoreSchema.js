// ===============================
// FIRESTORE COLLECTION NAMES
// ===============================
export const collections = {
  USERS: "users",
  COMMUNITIES: "communities",
  MEMBERS: "members",
  ROLES: "roles",
  RECOMMENDATIONS: "recommendations",
  EVENTS: "events",
  POSTS: "posts",
  CHATS: "chats",
  ANALYTICS: "analytics",
};

// ===============================
// USER SCHEMA
// ===============================
// Represents a single authenticated user.
export const userSchema = {
  name: "",                      // Full name
  email: "",                     // User's email (from Google Auth)
  bio: "",                       // Short intro
  photoURL: "",                  // Profile picture
  authProvider: "google",        // google | email | github
  joinedCommunities: [],         // List of joined community IDs
  createdCommunities: [],        // List of created community IDs
  theme: "light",                // light | dark
  socialLinks: {                 // For profile section
    linkedin: "",
    github: "",
    twitter: "",
  },
  location: "",                  // College or workplace
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ===============================
// COMMUNITY SCHEMA
// ===============================
// Represents one community (public/private)
export const communitySchema = {
  name: "",                      // Community name
  description: "",               // Summary/purpose
  collegeOrWork: "",             // e.g. BITS Pilani / Google
  purpose: "",                   // Theme or main goal
  visibility: "public",          // public | private
  createdBy: "",                 // User ID of creator
  adminId: "",                   // Main admin (dashboard access)
  roles: ["admin", "moderator", "member"], // Default roles
  memberCount: 0,                // Auto-tracked
  tags: [],                      // e.g. ["AI", "Design"]
  purposeTags: [],               // Used for recommendations
  bannerURL: "",                 // Optional banner image
  isVerified: false,             // Optional verified status
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ===============================
// MEMBER SCHEMA
// ===============================
// Links USERS ↔ COMMUNITIES with role & join status
export const memberSchema = {
  communityId: "",               // Reference to community
  userId: "",                    // Reference to user
  role: "member",                // admin | moderator | member
  joinedAt: new Date(),
  status: "approved",            // approved | pending | rejected
  invitedBy: "",                 // Optional: inviter's userId
};

// ===============================
// ROLE SCHEMA
// ===============================
// Defines permission sets per role (custom roles allowed)
export const roleSchema = {
  communityId: "",               // Which community this applies to
  roleName: "",                  // e.g. Moderator / Event Manager
  permissions: {
    canEditPosts: false,
    canInvite: false,
    canDeleteCommunity: false,
    canManageRoles: false,
    canManageMembers: false,
    canAccessAnalytics: false,   // For dashboard insights
    canManageEvents: false,      // NEW: event permissions
    canChat: true,               // NEW: allows chat
  },
  createdAt: new Date(),
};

// ===============================
// RECOMMENDATION SCHEMA
// ===============================
// Stores discovery or community suggestion preferences
export const recommendationSchema = {
  userId: "",                    // Reference to user
  filters: {                     // e.g. { field: "collegeOrWork", value: "BITS Pilani" }
    field: "",
    value: "",
  },
  suggestedCommunities: [],      // List of community IDs
  lastUpdated: new Date(),
};

// ===============================
// EVENT SCHEMA
// ===============================
// Stored in subcollection: /communities/{communityId}/events
export const eventSchema = {
  title: "",                     // Event/workshop title
  description: "",               // Details
  date: new Date(),              // Scheduled time
  createdBy: "",                 // Admin/moderator userId
  assignedRoles: {               // Roles for specific tasks
    organizer: "",
    speaker: "",
    participant: "",
  },
  attendees: [],                 // List of userIds
  visibility: "public",          // public | private
  status: "upcoming",            // upcoming | ongoing | completed
  createdAt: new Date(),
};

// ===============================
// POST SCHEMA
// ===============================
// Stored in subcollection: /communities/{communityId}/posts
export const postSchema = {
  authorId: "",                  // userId of author
  content: "",                   // Text or caption
  mediaURL: "",                  // Meme/image/video URL
  likes: 0,
  likedBy: [],                   // userIds
  createdAt: new Date(),
};

// ===============================
// CHAT SCHEMA
// ===============================
// Stored in subcollection: /communities/{communityId}/chats
export const chatSchema = {
  senderId: "",                  // userId of sender
  message: "",                   // Message content
  timestamp: new Date(),
};

// ===============================
// ANALYTICS SCHEMA
// ===============================
// Stored in subcollection: /communities/{communityId}/analytics
export const analyticsSchema = {
  date: new Date(),              // Date of log
  totalInteractions: 0,          // Overall activity
  postCount: 0,                  // No. of posts created
  eventCount: 0,                 // No. of events
  memberActivity: {},            // { userId: interactionCount }
  peakHours: [],                 // Optional: busiest times
};

// ===============================
// EXPORT DEFAULT
// ===============================
export default {
  collections,
  userSchema,
  communitySchema,
  memberSchema,
  roleSchema,
  recommendationSchema,
  eventSchema,
  postSchema,
  chatSchema,
  analyticsSchema,
};

/*
users/
 └── {userId}

communities/
 └── {communityId}
      ├── events/
      │     └── {eventId}
      ├── posts/
      │     └── {postId}
      ├── chats/
      │     └── {messageId}
      └── analytics/
            └── {dateDocId}

members/
 └── {memberDocId}

roles/
 └── {roleDocId}

recommendations/
 └── {recommendationDocId}
*/