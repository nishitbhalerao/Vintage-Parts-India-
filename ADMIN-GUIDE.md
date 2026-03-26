# 🛡️ VintageParts India - Admin Module Guide

## 🔐 Admin Access

### Admin Credentials
- **Email**: `bhaleraonishit@gmail.com`
- **Password**: `Nishit@1098`

### How to Access Admin Panel
1. Go to the login page: http://localhost:3000/login
2. Enter the admin credentials above
3. After login, you'll see "🛡️ Admin" link in the navbar
4. Click to access the admin dashboard

## 🎯 Admin Features

### 1. Admin Dashboard (`/admin`)
**Overview of the entire platform:**
- **Statistics Cards**:
  - Total Users
  - Total Parts
  - Featured Parts
  - Pending Verification Parts

- **Quick Actions**:
  - Manage Users
  - Manage Parts
  - Verification Queue
  - Analytics

- **Recent Activity**:
  - Latest registered users
  - Recently added parts

### 2. User Management (`/admin/users`)
**Complete user control:**

**Features:**
- ✅ View all registered users
- ✅ Search users by name, email, or phone
- ✅ Filter by user role (buyer, seller, both, admin)
- ✅ Sort by name, registration date
- ✅ View user statistics (parts count, active parts)
- ✅ Delete users (and all their parts)
- ✅ Pagination support

**User Information Displayed:**
- Profile picture (initials)
- Name and email
- Phone number
- User role and admin status
- Parts statistics
- Registration date
- Quick actions (View, Delete)

**Safety Features:**
- Admin cannot delete their own account
- Confirmation dialog before deletion
- Cascade deletion (removes all user's parts)

### 3. Parts Management (`/admin/parts`)
**Complete parts moderation:**

**Features:**
- ✅ View all parts listings
- ✅ Search parts by title, make, model
- ✅ Filter by category (bike/car), status, verification
- ✅ Sort by date, price, views
- ✅ **Star/Feature parts** (⭐ Featured badge)
- ✅ **Verify parts** (approve/reject with notes)
- ✅ Delete parts
- ✅ View seller information
- ✅ Pagination support

**Part Actions:**
- **Feature/Unfeature**: Toggle featured status (shows ⭐ badge)
- **Approve**: Mark part as verified (green badge)
- **Reject**: Mark part as rejected with optional notes (red badge)
- **Delete**: Permanently remove part
- **View Details**: See full part information

**Verification System:**
- **Pending**: New parts awaiting review (yellow badge)
- **Verified**: Admin-approved genuine parts (green badge)
- **Rejected**: Parts rejected by admin (red badge)
- **Admin Notes**: Optional rejection/approval reasons

### 4. Featured Parts System
**Highlight genuine/quality parts:**
- Admin can star any part to make it "Featured"
- Featured parts show ⭐ badge on listings
- Featured parts get priority in search results
- Helps users identify quality/genuine parts

## 🔧 Admin API Endpoints

### Authentication
```
POST /api/auth/login
- Special handling for admin credentials
- Auto-creates admin user if doesn't exist
- Returns admin token with elevated privileges
```

### Dashboard
```
GET /api/admin/dashboard
- Platform statistics
- Recent users and parts
- User/part distribution charts
```

### User Management
```
GET /api/admin/users
- List all users with pagination
- Search and filter capabilities
- User statistics included

GET /api/admin/users/:userId
- Detailed user information
- All user's parts
- User activity statistics

DELETE /api/admin/users/:userId
- Delete user and cascade delete all parts
- Cannot delete own account
```

### Parts Management
```
GET /api/admin/parts
- List all parts with admin metadata
- Advanced filtering and search
- Seller information included

DELETE /api/admin/parts/:partId
- Permanently delete any part

PATCH /api/admin/parts/:partId/featured
- Toggle featured status
- Returns updated part info

PATCH /api/admin/parts/:partId/verification
- Update verification status (pending/verified/rejected)
- Add admin notes
- Body: { verificationStatus, adminNotes }
```

## 🛡️ Security Features

### Admin Middleware
- Validates JWT token
- Checks `isAdmin` flag on user
- Blocks non-admin access to admin routes
- Returns 403 Forbidden for unauthorized access

### Admin User Creation
- Hardcoded admin credentials in auth controller
- Auto-creates admin user on first login
- Sets `isAdmin: true` and `role: 'admin'`
- Updates existing user to admin if needed

### Route Protection
- All admin routes require authentication
- Admin middleware applied to all `/api/admin/*` routes
- Frontend admin pages check `user.isAdmin`
- Redirects non-admins to home page

## 🎨 Admin UI Features

### Visual Indicators
- **Admin Badge**: Red "Admin" badge in navbar
- **Warning Colors**: Orange/red colors for admin actions
- **Status Badges**: Color-coded verification status
- **Featured Stars**: ⭐ for featured parts
- **Role Badges**: Different colors for user roles

### User Experience
- **Confirmation Dialogs**: Before destructive actions
- **Loading States**: Spinners during API calls
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on mobile devices
- **Breadcrumb Navigation**: Easy navigation between admin pages

### Admin Dashboard Layout
- **Stats Grid**: Key metrics at a glance
- **Quick Actions**: Direct links to management pages
- **Recent Activity**: Latest users and parts
- **Professional Design**: Consistent with main app theme

## 📊 Admin Capabilities Summary

### ✅ What Admin Can Do:
1. **View Everything**: All users, parts, and platform data
2. **Delete Users**: Remove problematic users and their content
3. **Delete Parts**: Remove inappropriate or fake listings
4. **Feature Parts**: Highlight genuine/quality parts with ⭐
5. **Verify Parts**: Approve/reject parts with verification badges
6. **Search & Filter**: Advanced filtering across all data
7. **Monitor Activity**: Track recent registrations and listings
8. **Platform Analytics**: View usage statistics and trends

### 🚫 Admin Restrictions:
1. Cannot delete their own account
2. Cannot modify other admin accounts (if multiple)
3. All actions are logged (user can see admin notes)
4. Must confirm destructive actions

## 🔄 Admin Workflow Examples

### Moderating New Parts:
1. Go to `/admin/parts`
2. Filter by "Pending" verification
3. Review part details and images
4. Click "Approve" for genuine parts
5. Click "Reject" with reason for fake/inappropriate parts
6. Optionally "Feature" high-quality parts

### Managing Problem Users:
1. Go to `/admin/users`
2. Search for specific user
3. Click "View" to see their parts
4. Delete individual problematic parts, or
5. Delete entire user account (removes all their parts)

### Featuring Quality Parts:
1. Browse parts in `/admin/parts`
2. Identify high-quality, genuine parts
3. Click "Feature" to add ⭐ badge
4. Featured parts appear prominently to buyers

## 🎉 Admin Module Complete!

The admin module provides comprehensive platform management with:
- **Full User Control**: View, search, and delete users
- **Complete Parts Moderation**: Feature, verify, and remove parts
- **Professional Interface**: Consistent design with main app
- **Security**: Proper authentication and authorization
- **User Experience**: Intuitive admin workflows

**Admin Access**: Login with `bhaleraonishit@gmail.com` / `Nishit@1098` to access all admin features!