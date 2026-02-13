# ProtectedRoute Component Documentation

## Overview

The `ProtectedRoute` component is used to protect routes that require authentication and optionally restrict access based on user roles.

## Features

- ✅ Authentication check - redirects to `/login` if not authenticated
- ✅ Role-based access control with `adminOnly` prop
- ✅ Loading state during authentication check
- ✅ User-friendly access denied message for unauthorized users
- ✅ Automatic redirect for non-admin users

## Props

| Prop        | Type      | Default  | Description                                                     |
| ----------- | --------- | -------- | --------------------------------------------------------------- |
| `children`  | ReactNode | required | Components to render if user is authenticated and authorized    |
| `adminOnly` | boolean   | `false`  | If `true`, only users with `role: 'admin'` can access the route |

## Basic Usage

### Protecting a Route (Any Authenticated User)

```javascript
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

### Protecting an Admin-Only Route

```javascript
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";

<Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>;
```

## Complete Example in App.jsx

```javascript
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes - any authenticated user */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes - requires admin role */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
```

## How It Works

### 1. Loading State

While checking authentication status:

```
┌─────────────────────┐
│   Loading spinner   │
│    "Loading..."     │
└─────────────────────┘
```

### 2. Not Authenticated

If `currentUser` is `null`, redirect to `/login`:

```javascript
if (!currentUser) {
  return <Navigate to="/login" replace />;
}
```

### 3. Admin Check (if adminOnly=true)

If user is authenticated but doesn't have admin role:

```
┌─────────────────────────────────┐
│      ⚠️ Access Denied           │
│                                 │
│  You don't have permission to   │
│  access this page. This area    │
│  is restricted to               │
│  administrators only.           │
│                                 │
│  Your role: user                │
│  Required role: admin           │
│                                 │
│  Redirecting to dashboard...    │
└─────────────────────────────────┘
```

### 4. Authorized

If all checks pass, render the children components.

## User Roles in Firestore

The user's role is stored in the Firestore `users` collection:

```javascript
// Document: users/{userId}
{
  uid: "abc123",
  displayName: "John Doe",
  email: "john@example.com",
  role: "admin", // or "user", "manager", etc.
  branchCode: "JKT001",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Setting User Roles

### During Registration (Default Role)

In `Register.jsx`, new users are assigned the default `"user"` role:

```javascript
await setDoc(doc(db, "users", userCredential.user.uid), {
  uid: userCredential.user.uid,
  displayName: formData.fullName,
  email: formData.email,
  role: "user", // Default role
  branchCode: null,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
});
```

### Updating User Role (Admin Action)

Create an admin function to update user roles:

```javascript
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

async function updateUserRole(userId, newRole) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    role: newRole,
    updatedAt: serverTimestamp(),
  });
}

// Usage:
await updateUserRole("user-uid-here", "admin");
```

## Role-Based Menu Items in Layout

The `Layout` component filters menu items based on user role:

```javascript
const menuItems = [
  {
    id: "dashboard",
    path: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
    roles: ["user", "admin"],
  },
  {
    id: "inventory",
    path: "#",
    icon: Package,
    label: "Inventory List",
    roles: ["user", "admin"],
  },
  {
    id: "add-item",
    path: "/add-item",
    icon: Plus,
    label: "Add Item",
    roles: ["user", "admin"],
  },
  {
    id: "admin",
    path: "/admin",
    icon: Shield,
    label: "Admin Panel",
    roles: ["admin"],
  },
];

// Filter based on current user's role
const visibleMenuItems = menuItems.filter(
  (item) => !item.roles || item.roles.includes(userProfile?.role || "user"),
);
```

**Result:**

- Regular users see: Dashboard, Inventory List, Add Item
- Admin users see: Dashboard, Inventory List, Add Item, **Admin Panel**

## Creating Multiple Role Types

You can extend this system to support multiple roles:

```javascript
// In ProtectedRoute.jsx
const ProtectedRoute = ({
  children,
  adminOnly = false,
  managerOnly = false,
  allowedRoles = [],
}) => {
  const { currentUser, userProfile, loading } = useAuth();

  // Check specific role requirements
  if (adminOnly && userProfile?.role !== "admin") {
    return <AccessDenied />;
  }

  if (managerOnly && !["admin", "manager"].includes(userProfile?.role)) {
    return <AccessDenied />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userProfile?.role)) {
    return <AccessDenied />;
  }

  return children;
};

// Usage:
<ProtectedRoute allowedRoles={["admin", "manager"]}>
  <ManagerPanel />
</ProtectedRoute>;
```

## Testing the Admin Route

### Test as Regular User:

1. Register a new account (automatically gets `role: 'user'`)
2. Try to access `/admin`
3. Should see "Access Denied" message

### Test as Admin:

1. Manually update your user document in Firestore:
   ```
   users/{yourUserId}
   { role: 'admin' }
   ```
2. Refresh the page (AuthContext will reload user data)
3. Access `/admin` - should see Admin Panel
4. Sidebar should now show "Admin Panel" menu item

## Example: Conditional Rendering Based on Role

```javascript
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { userProfile } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Show to everyone */}
      <UserStats />

      {/* Show only to admins */}
      {userProfile?.role === "admin" && <AdminActions />}

      {/* Show to admins and managers */}
      {["admin", "manager"].includes(userProfile?.role) && <ManagementTools />}
    </div>
  );
}
```

## Security Notes

⚠️ **Important:**

- Client-side route protection is for **UX only**
- Always implement **server-side authorization** in Firebase Security Rules
- Users can manipulate client-side code
- Protect Firestore data with proper security rules

### Example Firebase Security Rules:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Users collection - admins can read/write, users can read their own
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if isAdmin() || request.auth.uid == userId;
    }

    // Admin-only collection
    match /admin/{document=**} {
      allow read, write: if isAdmin();
    }
  }
}
```

## Summary

The `ProtectedRoute` component provides:

1. ✅ **Authentication check** - redirects unauthenticated users to login
2. ✅ **Role-based access** - restricts routes to specific user roles
3. ✅ **Loading state** - shows spinner during auth check
4. ✅ **User-friendly errors** - clear messages for unauthorized access
5. ✅ **Flexible usage** - simple prop API (`adminOnly={true}`)

Use it to protect any route that requires authentication or specific user roles!
