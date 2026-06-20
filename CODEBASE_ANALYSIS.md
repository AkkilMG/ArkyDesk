# ArkyDesk Codebase Analysis

## 1. Authentication System Overview

### Authentication Architecture
- **Type**: Custom JWT-based authentication with session cookies
- **Library**: `jose` (JWT signing/verification) + `crypto-js` (AES encryption)
- **Session Duration**: 7 days
- **Storage**: HTTP-only cookies (`session` cookie)

### Session Management (`src/lib/session.ts`)
```
- Encryption: HS256 (HMAC SHA-256)
- Requires: SESSION_SECRET environment variable
- Functions:
  - encryptSession(payload): Creates signed JWT with 7-day expiration
  - decryptSession(session): Verifies and decrypts JWT payload
```

### Encryption System (`src/lib/crypto.ts`)
- **Derivable Encryption** (for user IDs): AES with SHA256-derived keys
  - encrypt() / decrypt() - for sensitive data that needs reversible encryption
- **Non-Derivable Hash** (for passwords): SHA256 hash with secret key appended
  - encryptCode() / decryptCode() - one-way hashing for passwords

---

## 2. User Authentication Flow

### Regular User Registration (`/src/app/api/auth/signup/route.ts`)
1. **Validation**: Name, email, password (min 8 chars)
2. **Process**:
   - Check if email already exists
   - Hash password using `encryptCode()`
   - Store user in MongoDB `users` collection
3. **Frontend**: Terms & conditions acceptance required (`TermsAcceptance` component)
4. **Consent**: Timestamp recorded with signup

### Regular User Signin (`/src/app/api/auth/signin/route.ts`)
1. **Rate Limiting**: 8 attempts per 10 minutes per IP
2. **Validation**: Email + password
3. **Process**:
   - Hash provided password
   - Find user by email + password hash match
   - Encrypt user ID: `encry = encrypt(result._id.toString())`
   - Create session JWT: `encryptSession({ token: encry, expiresAt })`
   - Set HTTP-only cookie with 7-day expiration
4. **Routing**: Returns `admin` flag to determine redirect
   - Admin users → `/dashboard`
   - Regular users → `/tickets`

### Session Verification (`/src/app/api/auth/verify/route.ts`)
- **GET Request**: Checks current session cookie
- **Returns**: `{ success, admin }` boolean
- **Used by**: Frontend to determine routing and feature access

---

## 3. Guest User Flow

### Guest Login Without Account (`/src/app/signin/page.tsx`)
1. **Input**: Name and email only
2. **No password required** - instant account creation
3. **Endpoint**: `POST /api/guest/login-link`

### Guest Account Creation (`/src/app/api/guest/login-link/route.ts`)
1. **Rate Limiting**: 6 requests per 10 minutes per IP
2. **User Creation** (if new):
   - Sets `temporary: true` and `guest: true` flags
   - No password stored
   - Stored in `users` collection
3. **Token Generation**:
   - Creates random 32-byte token
   - Hashes token with SHA256
   - Stores hash in `guest_login_tokens` collection
   - Expires in 1 hour
4. **Email Delivery**:
   - Sends login link via SMTP: `sendGuestLoginLinkEmail()`
   - Link format: `{baseUrl}/api/guest/login-link/{rawToken}`
   - Uses nodemailer with SMTP configuration
5. **Response**: Returns `loginUrl` for development/testing

### Guest Login Token Consumption (`/src/app/api/guest/login-link/[token]/route.ts`)
1. **GET Request** with token in URL
2. **Validation**:
   - Hash provided token
   - Find unused, non-expired token in `guest_login_tokens`
   - Verify associated user exists
3. **Process**:
   - Mark token as used (`used: true, usedAt: new Date()`)
   - Create encrypted session (same as regular user)
   - Set session cookie
4. **Redirect**: To `/tickets?guest=1`

### Guest User Restrictions
- `guest` and `temporary` flags set in user document
- **Cannot comment** on tickets (enforced in comment endpoint)
- **Can create reports** (guest-only endpoint)
- Limited functionality compared to registered users

---

## 4. Ticket/Bug Report System

### Ticket Categories (`/src/types/grievances.ts`)
```
[
  "Account login problems",
  "Unable to upload files",
  "File download issues",
  "Slow loading times",
  "File corruption",
  "Permission errors",
  "Storage limit reached",
  "Syncing issues",
  "File version conflicts",
  "Unauthorized access",
  "Data loss",
  "UI not responsive",
  "Search functionality not working",
  "File preview issues",
  "Error messages not clear",
  "Content formatting issues",
  "Content duplication",
  "Spam content",
  "Inappropriate content",
  "Other Bug"
]
```

### Regular User Ticket Creation (`/src/app/api/dashboard/tickets/route.ts`)
- **Input**: Subject, description, product, attachment/files
- **Process**: 
  - Creates ticket in `tickets` collection
  - Associates with authenticated user ID
  - Status: `open`
- **Broadcast**: Real-time update via WebSocket

### Guest Ticket Submission (`/src/app/api/guest/tickets/route.ts`)
1. **Rate Limiting**: 10 submissions per 10 minutes per IP
2. **Allowed Problems**: Only `['crash', 'copyright']`
   - Restricted compared to authenticated users
3. **Guest Form** (`/src/app/guest-report/page.tsx`):
   - Name, email, subject, description, problem category
   - Allows requesting login link after submission
4. **Stored As**:
   - `product: 'guest'`
   - `user: 'guest'` (string identifier)
   - `guestName` and `guestEmail` fields
   - `status: 'open'`
5. **Component**: `<GuestCreate/>` in `/src/components/ticket/guestCreate.tsx`
   - Shows success with optional login link
   - Sends guest login link if requested

### Ticket Display
- **Admin View**: All tickets (open/ignore status) limited to 100 recent
- **User View**: Only their own tickets (max 50)
- **Tags Generated**:
  - Product, status, problem
  - 'ignore' tag if older than 1 week

---

## 5. Comment System

### Fetching Comments (`/src/app/api/dashboard/comment/route.ts` - GET)
1. **Auth Required**: Session cookie must be valid
2. **Query Parameter**: `ticketId`
3. **Process**:
   - Decrypt session
   - Verify user exists
   - Fetch ticket (existence check)
   - Fetch all comments for ticket from `comments` collection
   - Batch fetch user data for comment authors
   - Attach user names to comments
4. **Returns**: Array of comments with user info and formatted timestamps

### Creating Comments (`/src/app/api/dashboard/comment/route.ts` - POST)
1. **Auth Required**: Session cookie
2. **Input**: `comment` (1-2000 chars), `ticketId`
3. **Guest Restriction**:
   ```
   if (user.guest || user.temporary) {
     return "Guest accounts cannot comment."  // 403 Forbidden
   }
   ```
4. **Process**:
   - Verify user is authenticated (not guest)
   - Verify ticket exists
   - Create comment in `comments` collection
   - Comment structure:
     - `user`: User ID
     - `ticket`: Ticket ID
     - `body`: Comment text
     - `createdAt`: Timestamp
5. **Broadcast**: Real-time update via WebSocket

### Comment Restrictions
- **Only authenticated users** can comment (guests blocked explicitly)
- **Comments public** within ticket context (both users and admins see them)
- **Admin can see** all ticket comments
- **Users see** only comments on their tickets (unless admin)

---

## 6. Admin Features

### Admin Dashboard (`/src/app/dashboard/page.tsx`)
1. **Access Control**: Checks `admin` flag from `/api/auth/verify`
2. **Redirects**:
   - Non-admin authenticated users → `/tickets`
   - Unauthenticated → `/signin`
3. **Features**: User management, admin functions

### User Management (`/src/app/api/admin/users/route.ts`)
- **Admin-only** access (verified by `admin` flag)
- **Returns**:
  - All users with aggregated ticket counts
  - Closed ticket count per user
  - Pending user actions
- **Aggregation Pipeline**: $lookup with tickets collection

### Admin Approval Actions (`/src/app/api/admin/approve-action/route.ts`)
- **Admin-only** (PUT request)
- **Actions**:
  - `flag`: Mark user as flagged with reason
  - `admin`: Promote user to admin
  - `delete`: Mark user as deleted (soft delete)
  - `undelete`: Restore deleted user
  - `unflag`: Remove flag status
- **Implementation**: Updates `users` collection with action status
- **Process**:
  - Find pending action in `userActions` collection
  - Verify admin privileges
  - Execute action
  - Mark action as completed

### Admin Ticket Viewing (`/src/app/api/admin-dashboard/tickets/route.ts`)
- **GET**: All tickets (no user filter)
- **Limits**: 100 recent tickets for performance
- **Includes**: Aggregated user data for each ticket

### Real-time Admin Features (`/src/lib/realtime.ts`)
- WebSocket connections track `isAdmin` status
- Admin can see all ticket updates
- Users only see their own ticket updates

---

## 7. Email System

### Implementation (`/src/lib/email.ts`)
- **Transport**: Nodemailer with SMTP
- **Configuration**:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
  - `SMTP_FROM` (sender address)
- **Graceful Degradation**: Returns `false` if SMTP not configured

### Guest Login Email (`sendGuestLoginLinkEmail`)
- **To**: Guest email address
- **Subject**: "Your temporary ArkyDesk login link"
- **Content**:
  - Personalized greeting
  - Explanation of temporary account
  - Call-to-action button with login link
  - Warning about link expiration
- **HTML Formatted**: Professional email styling

---

## 8. Current Guest vs Authenticated User Comparison

| Feature | Authenticated | Guest |
|---------|---------------|-------|
| **Create Account** | Email + password | Email only |
| **Password Required** | Yes (min 8 chars) | No |
| **Account Duration** | Permanent | Temporary (token-based) |
| **Create Tickets** | Yes (all categories) | Yes (crash, copyright only) |
| **Comment on Tickets** | Yes | **No** (blocked) |
| **View Own Tickets** | Yes | Yes |
| **Rate Limiting** | 8 signin/10min | 6 login-links/10min, 10 tickets/10min |
| **Session Duration** | 7 days | 1 hour (token) |
| **Email Verification** | No (not enforced) | Link-based (token) |
| **Access Dashboard** | Yes (if admin) | No |
| **User Flags** | Optional (admin) | `guest: true, temporary: true` |

---

## 9. Security Features

### 1. **Rate Limiting**
- **Signin**: 8 attempts per 10 minutes per IP
- **Guest login**: 6 requests per 10 minutes per IP
- **Guest tickets**: 10 submissions per 10 minutes per IP
- **Implementation**: In-memory Map with IP tracking

### 2. **Password Security**
- Minimum 8 characters
- SHA256 hashing with secret key
- Salt appended (SECRET_KEY)

### 3. **Session Security**
- HTTP-only cookies
- Secure flag (production only)
- SameSite=Lax
- 7-day expiration
- JWT with HS256 signature

### 4. **Guest Token Security**
- 32-byte random token
- SHA256 hashed before storage
- 1-hour expiration
- One-time use (marked used after consumption)
- Cannot be reused

### 5. **Authorization Checks**
- Session validation on every protected endpoint
- Admin flag verification for admin endpoints
- Guest flag checking (prevents comment submission)
- User ID encryption/decryption for session tokens

### 6. **Data Protection**
- AES encryption for reversible data (user IDs)
- Password hashes non-reversible
- No plain text storage of credentials

---

## 10. Database Collections

### `users`
```
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  admin?: boolean,
  guest?: boolean,           // For guest users
  temporary?: boolean,       // For temporary accounts
  flagged?: boolean,
  flaggedAt?: Date,
  flaggedBy?: ObjectId,
  flaggedReason?: string,
  createdAt: Date,
  updatedAt?: Date
}
```

### `tickets`
```
{
  _id: ObjectId,
  subject: string,
  description: string,
  user: string | ObjectId,   // User ID or 'guest'
  product: string,           // e.g., 'guest', specific product
  status: 'open' | 'closed' | 'ignore',
  problem: string,           // Category from grievances
  guestName?: string,        // For guest submissions
  guestEmail?: string,       // For guest submissions
  attachment?: string,
  files?: string[],
  createdAt: Date
}
```

### `comments`
```
{
  _id: ObjectId,
  ticket: ObjectId,
  user: string,              // User ID
  body: string,
  createdAt: Date
}
```

### `guest_login_tokens`
```
{
  _id: ObjectId,
  userId: string,            // User ObjectId as string
  tokenHash: string,         // SHA256 hash of token
  expiresAt: Date,
  used: boolean,
  usedAt?: Date,
  createdAt: Date
}
```

### `userActions`
```
{
  _id: ObjectId,
  userId: ObjectId,
  action: 'flag' | 'admin' | 'delete' | 'undelete' | 'unflag',
  reason: string,
  status: 'pending' | 'completed' | 'rejected',
  createdAt: Date,
  approvedAt?: Date,
  approvedBy?: ObjectId
}
```

---

## 11. Key Files Summary

| Path | Purpose |
|------|---------|
| `src/lib/session.ts` | JWT encryption/decryption |
| `src/lib/crypto.ts` | AES encryption & SHA256 hashing |
| `src/lib/email.ts` | Email transport configuration |
| `src/app/api/auth/signin/route.ts` | User login endpoint |
| `src/app/api/auth/signup/route.ts` | User registration endpoint |
| `src/app/api/auth/verify/route.ts` | Session verification |
| `src/app/api/guest/login-link/route.ts` | Guest login link generation |
| `src/app/api/guest/login-link/[token]/route.ts` | Guest token consumption |
| `src/app/api/guest/tickets/route.ts` | Guest ticket submission |
| `src/app/api/dashboard/comment/route.ts` | Comment CRUD |
| `src/app/api/dashboard/tickets/route.ts` | Authenticated ticket CRUD |
| `src/app/api/admin/users/route.ts` | User management |
| `src/app/api/admin/approve-action/route.ts` | Admin action approvals |
| `src/app/signin/page.tsx` | Login/guest entry page |
| `src/app/signup/page.tsx` | Registration page |
| `src/app/guest-report/page.tsx` | Guest ticket form page |
| `src/types/grievances.ts` | Ticket categories |

---

## 12. Architecture Notes

### Next.js Setup
- **Framework**: Next.js 14.2.35 (App Router)
- **Database**: MongoDB
- **Deployment**: Cloudflare (OpenNextJS)
- **Build Targets**: Edge/Serverless compatible

### Real-time Features
- WebSocket support via `/api/realtime/*` endpoints
- Broadcast updates for ticket changes
- Connection tracking (admin vs user)

### Client-Server Pattern
- Client-side components for UI rendering
- Server-side API routes for business logic
- Server-only utilities for sensitive operations

---

## 13. Potential Improvements

1. **Email Verification**: Currently not enforced for regular signups
2. **Comment Restrictions**: Could be granular (ticket owner can respond to guests)
3. **Guest Session Refresh**: No refresh token mechanism; 1-hour limit is strict
4. **Audit Logging**: No audit trail for admin actions
5. **Two-Factor Authentication**: Not implemented
6. **Password Reset Flow**: Forgot-password endpoint exists but flow unclear
7. **Rate Limiting**: Could use Redis for distributed rate limiting
8. **Token Rotation**: JWT not rotated during session
