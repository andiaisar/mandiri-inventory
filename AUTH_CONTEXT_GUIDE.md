# AuthContext Usage Guide

## Overview

The AuthContext provides authentication state management throughout the application using Firebase Authentication and Firestore.

## Features

- ✅ Track user authentication state with Firebase Auth
- ✅ Fetch additional user profile data from Firestore (role, branchCode, etc.)
- ✅ Custom `useAuth` hook for easy access to user data
- ✅ Loading state management
- ✅ Protected routes for authenticated users only

## Files Created

1. `src/context/AuthContext.jsx` - Main context provider
2. `src/components/ProtectedRoute.jsx` - Route protection component
3. Updated `src/main.jsx` - Wrapped app with AuthProvider
4. Updated `src/App.jsx` - Added protected routes
5. Updated `src/pages/Register.jsx` - Saves user profile to Firestore
6. Updated `src/pages/Dashboard.jsx` - Displays user info
7. Updated `src/components/Layout.jsx` - Shows logged-in user details

## Firestore Structure

When a user registers, a document is created in the `users` collection:

```javascript
{
  uid: "user-firebase-uid",
  displayName: "User Full Name",
  email: "user@email.com",
  role: "user", // or "admin", "manager", etc.
  branchCode: null, // Can be assigned by admin
  branchName: null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Using the useAuth Hook

### Basic Usage

```javascript
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userProfile?.displayName}</h1>
      <p>Email: {currentUser?.email}</p>
      <p>Role: {userProfile?.role}</p>
      <p>Branch: {userProfile?.branchCode}</p>
    </div>
  );
}
```

### Available Data

```javascript
const { currentUser, userProfile, loading } = useAuth();

// currentUser - Firebase Auth user object
currentUser.uid; // User's unique ID
currentUser.email; // User's email
currentUser.displayName; // User's display name
currentUser.photoURL; // User's photo URL

// userProfile - Extended profile from Firestore
userProfile.uid; // User's unique ID
userProfile.email; // Email address
userProfile.displayName; // Full name
userProfile.role; // User role (e.g., "user", "admin", "manager")
userProfile.branchCode; // Branch code (e.g., "JKT001")
userProfile.branchName; // Branch name
userProfile.createdAt; // Account creation timestamp
userProfile.updatedAt; // Last update timestamp

// loading - Boolean
loading; // true while checking auth state, false when ready
```

### Conditional Rendering Based on Role

```javascript
import { useAuth } from "../context/AuthContext";

function AdminPanel() {
  const { userProfile } = useAuth();

  // Only show admin features if user is admin
  if (userProfile?.role !== "admin") {
    return <div>Access denied. Admin only.</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Admin-only content */}
    </div>
  );
}
```

### Display User Info in Components

```javascript
import { useAuth } from "../context/AuthContext";

function Header() {
  const { userProfile } = useAuth();

  return (
    <header>
      <div>Welcome, {userProfile?.displayName || "User"}</div>
      {userProfile?.role && <span className="badge">{userProfile.role}</span>}
    </header>
  );
}
```

## Protected Routes

Routes wrapped with `ProtectedRoute` require authentication:

```javascript
import ProtectedRoute from "./components/ProtectedRoute";

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

Users will be redirected to `/login` if not authenticated.

## Updating User Profile

To update user profile in Firestore:

```javascript
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useAuth } from "../context/AuthContext";

async function updateUserRole(newRole) {
  const { currentUser } = useAuth();

  const userRef = doc(db, "users", currentUser.uid);
  await updateDoc(userRef, {
    role: newRole,
    updatedAt: serverTimestamp(),
  });
}
```

## Adding Branch Code to User

Admins can assign branch codes:

```javascript
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

async function assignBranch(userId, branchCode, branchName) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    branchCode: branchCode,
    branchName: branchName,
    updatedAt: serverTimestamp(),
  });
}
```

## Role-Based Access Control Examples

### Check if User is Admin

```javascript
const { userProfile } = useAuth();
const isAdmin = userProfile?.role === "admin";
```

### Check if User Has Branch Access

```javascript
const { userProfile } = useAuth();
const hasBranchAccess = !!userProfile?.branchCode;
```

### Filter Data by User Branch

```javascript
const { userProfile } = useAuth();

// If user has branch code, filter items by their branch
const filteredItems = items.filter(
  (item) =>
    !userProfile?.branchCode || item.branchCode === userProfile.branchCode,
);
```

## Common Patterns

### Show/Hide Features by Role

```javascript
const { userProfile } = useAuth();

return (
  <div>
    {/* Everyone can see this */}
    <Dashboard />

    {/* Only admins can see this */}
    {userProfile?.role === "admin" && <AdminPanel />}

    {/* Only users with branch code can see this */}
    {userProfile?.branchCode && <BranchSpecificContent />}
  </div>
);
```

### Logout Function

```javascript
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

## Summary

The AuthContext system provides:

1. **Authentication State**: Track logged-in users via Firebase Auth
2. **User Profile Data**: Extended profile info from Firestore (role, branch, etc.)
3. **Easy Access**: Simple `useAuth()` hook in any component
4. **Route Protection**: Automatic redirect for unauthenticated users
5. **Role-Based Features**: Conditional rendering based on user role

Use `const { currentUser, userProfile, loading } = useAuth()` in any component to access authentication data!
