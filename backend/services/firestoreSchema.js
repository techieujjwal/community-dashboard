// FIRESTORE COLLECTION NAMES
export const collections = {
  USERS: "users",
  COMMUNITIES: "communities",
  MEMBERS: "members",
  ROLES: "roles",
  RECOMMENDATIONS: "recommendations",
};

// USER SCHEMA
// EACH USER DOCUMENT REPRESENTS ONE AUTHENTICATED ACCOUNT
export const userSchema = {
  name: "",                      // FULL NAME
  email: "",                     // USER'S EMAIL (FROM GOOGLE AUTH)
  bio: "",                       // SHORT INTRO
  photoURL: "",                  // DISPLAY PICTURE URL
  authProvider: "google",        // GOOGLE / EMAIL / GITHUB
  joinedCommunities: [],         // LIST OF JOINED COMMUNITY IDS
  createdCommunities: [],        // LIST OF CREATED COMMUNITY IDS
  theme: "light",                // LIGHT OR DARK MODE
  socialLinks: {                 // OPTIONAL: FOR PROFILE PAGE
    linkedin: "",
    github: "",
    twitter: "",
  },
  location: "",                  // COLLEGE NAME / WORKPLACE
  createdAt: new Date(),
  updatedAt: new Date(),
};

// COMMUNITY SCHEMA
// REPRESENTS A SINGLE COMMUNITY (PUBLIC OR PRIVATE)
export const communitySchema = {
  name: "",                      // COMMUNITY NAME
  description: "",               // SUMMARY/PURPOSE TEXT
  collegeOrWork: "",             // E.G., BITS PILANI / GOOGLE
  purpose: "",                   // REASON OR THEME OF COMMUNITY
  visibility: "public",          // PUBLIC OR PRIVATE
  createdBy: "",                 // USERID OF CREATOR
  adminId: "",                   // MAIN ADMIN (FOR DASHBOARD ACCESS)
  roles: ["admin", "moderator", "member"], // ALLOWED ROLES
  memberCount: 0,                // AUTO-INCREMENT
  tags: [],                      // KEYWORDS (E.G. ["AI", "DESIGN"])
  purposeTags: [],               // FOR FILTERING AND RECOMMENDATION
  bannerURL: "",                 // OPTIONAL: HEADER IMAGE
  isVerified: false,             // OPTIONAL: VERIFIED STATUS
  createdAt: new Date(),
  updatedAt: new Date(),
};

// MEMBER SCHEMA
// LINKS USERS ↔ COMMUNITIES WITH ROLE AND JOIN STATUS
export const memberSchema = {
  communityId: "",               // REFERENCE TO COMMUNITY
  userId: "",                    // REFERENCE TO USER
  role: "member",                // ADMIN / MODERATOR / MEMBER
  joinedAt: new Date(),
  status: "approved",            // APPROVED / PENDING / REJECTED
  invitedBy: "",                 // OPTIONAL: USERID WHO INVITED
};

// ROLE SCHEMA
// DEFINES PERMISSION SETS FOR CUSTOM ROLES IN A COMMUNITY
export const roleSchema = {
  communityId: "",               // WHICH COMMUNITY THIS APPLIES TO
  roleName: "",                  // E.G., MODERATOR / ADMIN
  permissions: {
    canEditPosts: false,
    canInvite: false,
    canDeleteCommunity: false,
    canManageRoles: false,
    canManageMembers: false,
    canAccessAnalytics: false,   // FOR DASHBOARD INSIGHTS
  },
  createdAt: new Date(),
};

// RECOMMENDATION SCHEMA
// STORES RECOMMENDATION OR DISCOVERY PREFERENCES FOR EACH USER
export const recommendationSchema = {
  userId: "",                    // REFERENCE TO USER
  filters: {                     // E.G. { FIELD: "COLLEGEORWORK", VALUE: "BITS PILANI" }
    field: "",
    value: "",
  },
  suggestedCommunities: [],      // LIST OF COMMUNITY IDS
  lastUpdated: new Date(),
};

// EXPORT DEFAULT
export default {
  collections,
  userSchema,
  communitySchema,
  memberSchema,
  roleSchema,
  recommendationSchema,
};