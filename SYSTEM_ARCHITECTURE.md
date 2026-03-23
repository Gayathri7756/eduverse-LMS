# EduVerse - System Architecture

## Project Structure

```
eduverse/
├── backend/
│   ├── src/
│   │   ├── index.js                 # Express server entry point
│   │   ├── firebase.js              # Firebase Admin SDK setup
│   │   ├── middleware/
│   │   │   └── auth.js              # JWT verification & role checking
│   │   ├── routes/
│   │   │   ├── courses.js           # Course CRUD endpoints
│   │   │   ├── sections.js          # Section CRUD endpoints
│   │   │   ├── lessons.js           # Lesson CRUD endpoints
│   │   │   ├── enrollments.js       # Enrollment management
│   │   │   └── users.js             # User management
│   │   └── utils/
│   │       ├── youtubeUtils.js      # YouTube URL extraction
│   │       ├── passwordUtils.js     # Password encoding
│   │       └── sampleData.js        # Demo data initialization
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.jsx                  # Main app with routing
│   │   ├── firebase.js              # Firebase client setup
│   │   ├── index.css                # Global styles
│   │   ├── components/
│   │   │   └── Navbar.jsx           # Navigation component
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state management
│   │   ├── pages/
│   │   │   ├── Landing.jsx          # Home page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Registration page
│   │   │   ├── CourseCatalog.jsx    # All courses listing
│   │   │   ├── CourseDetail.jsx     # Course details & enrollment
│   │   │   ├── CoursePlayer.jsx     # Video player interface
│   │   │   ├── InstructorDashboard.jsx  # Course management
│   │   │   └── StudentDashboard.jsx     # Student progress
│   │   └── utils/
│   │       └── passwordUtils.js     # Password encoding
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
├── COURSE_SYSTEM_GUIDE.md           # Complete documentation
├── QUICK_START.md                   # Quick start guide
└── SYSTEM_ARCHITECTURE.md           # This file
```

## Data Flow

### Course Creation Flow
```
Instructor Dashboard
    ↓
POST /api/courses
    ↓
Backend validates & creates in Firestore
    ↓
Returns course ID
    ↓
Frontend updates course list
```

### Lesson Creation Flow
```
Instructor Dashboard
    ↓
POST /api/lessons/:sectionId/lessons
    ↓
Backend extracts YouTube video ID
    ↓
Validates YouTube URL
    ↓
Stores in Firestore
    ↓
Frontend updates lesson list
```

### Video Playback Flow
```
Student clicks "Start Learning"
    ↓
Navigate to /course/:courseId/player
    ↓
GET /api/courses/:courseId/content
    ↓
Backend fetches sections & lessons
    ↓
Frontend renders course structure
    ↓
Student selects lesson
    ↓
YouTube iframe loads with videoId
    ↓
Video plays
```

### Enrollment Flow
```
Student clicks "Enroll Now"
    ↓
POST /api/enrollments
    ↓
Backend creates enrollment record
    ↓
Frontend shows "Start Learning" button
    ↓
Student can access course content
```

## API Architecture

### Request/Response Pattern
```
Frontend Request
    ↓
Express Route Handler
    ↓
Middleware (Auth, Role Check)
    ↓
Business Logic
    ↓
Firestore Operation
    ↓
Response with Data/Error
    ↓
Frontend Updates UI
```

### Authentication Flow
```
User Signs Up
    ↓
Firebase Auth creates user
    ↓
Backend stores user role
    ↓
Frontend stores auth token
    ↓
Token sent in Authorization header
    ↓
Middleware verifies token
    ↓
Request proceeds or rejected
```

## Database Schema

### Firestore Collections

#### courses
- Document ID: Auto-generated
- Fields: title, description, category, price, thumbnail, instructorId, etc.
- Indexes: instructorId (for instructor courses)

#### sections
- Document ID: Auto-generated
- Fields: courseId, title, order
- Indexes: courseId, order

#### lessons
- Document ID: Auto-generated
- Fields: courseId, sectionId, title, youtubeUrl, videoId, order
- Indexes: sectionId, order

#### enrollments
- Document ID: Auto-generated
- Fields: userId, courseId, purchased, progress
- Indexes: userId, courseId

## Frontend Architecture

### Component Hierarchy
```
App
├── Navbar
├── Routes
│   ├── Landing
│   ├── Login
│   ├── Signup
│   ├── CourseCatalog
│   ├── CourseDetail
│   ├── CoursePlayer
│   ├── InstructorDashboard
│   └── StudentDashboard
└── AuthContext (Provider)
```

### State Management
- **AuthContext**: User authentication state
- **Component State**: Local component data
- **API Calls**: Axios for backend communication

### Styling
- **TailwindCSS**: Utility-first CSS framework
- **Responsive**: Mobile-first design
- **Dark Mode**: Gray-900 for video player

## Backend Architecture

### Middleware Stack
```
Express App
├── CORS
├── JSON Parser
├── Routes
│   ├── Auth Middleware (verifyToken)
│   ├── Role Middleware (requireRole)
│   └── Route Handler
└── Error Handler
```

### Route Organization
- `/api/courses` - Course management
- `/api/sections` - Section management
- `/api/lessons` - Lesson management
- `/api/enrollments` - Enrollment management
- `/api/users` - User management

## YouTube Integration

### Video ID Extraction
```
Input URL
    ↓
Regex Pattern Matching
    ↓
Extract Video ID
    ↓
Validate ID Format
    ↓
Store in Database
```

### Supported URL Formats
1. `https://www.youtube.com/watch?v=VIDEO_ID`
2. `https://youtu.be/VIDEO_ID`
3. `https://www.youtube.com/embed/VIDEO_ID`
4. Direct Video ID: `VIDEO_ID`

### Embed Implementation
```jsx
<iframe
  src={`https://www.youtube.com/embed/${videoId}`}
  allowFullScreen
/>
```

## Security Architecture

### Authentication
- Firebase Auth for user management
- JWT tokens for API requests
- Token stored in localStorage

### Authorization
- Role-based access control (RBAC)
- Instructor-only endpoints
- Course ownership verification

### Data Validation
- Email format validation
- Password requirements (8+ chars)
- YouTube URL validation
- Input sanitization

## Performance Optimization

### Frontend
- Code splitting with React Router
- Lazy loading of components
- Image optimization
- CSS minification

### Backend
- Firestore indexing
- Query optimization
- Caching strategies
- Efficient data fetching

## Error Handling

### Frontend
- Try-catch blocks
- User-friendly error messages
- Console logging for debugging
- Loading states

### Backend
- Express error middleware
- Validation error responses
- Firebase error handling
- Detailed error logging

## Deployment Considerations

### Backend
- Environment variables for Firebase
- PORT configuration
- CORS settings
- Error logging

### Frontend
- Build optimization
- Environment variables
- API endpoint configuration
- Asset optimization

## Scalability

### Current Limitations
- Single instructor per course
- No course versioning
- Basic progress tracking
- No caching layer

### Future Improvements
- Redis caching
- Database sharding
- CDN for videos
- Microservices architecture
- Message queues for async tasks

## Testing Strategy

### Unit Tests
- Utility functions (YouTube extraction, password encoding)
- Component rendering
- API response handling

### Integration Tests
- Course creation workflow
- Lesson addition workflow
- Enrollment process
- Video playback

### E2E Tests
- Complete user journey
- Instructor workflow
- Student workflow
- Error scenarios

## Monitoring & Logging

### Backend Logging
- Request/response logging
- Error logging
- Firebase operation logging
- Performance metrics

### Frontend Logging
- Console errors
- API call tracking
- User action tracking
- Performance metrics

## Backup & Recovery

### Data Backup
- Firestore automatic backups
- Regular exports
- Version control for code

### Disaster Recovery
- Firestore point-in-time recovery
- Code repository backups
- Database replication

## Compliance & Security

### Data Protection
- HTTPS only
- Secure password storage
- User data privacy
- GDPR compliance

### Access Control
- Role-based permissions
- Instructor course ownership
- Student enrollment verification
- Admin capabilities

## Future Enhancements

### Phase 2
- Payment integration
- Course ratings
- Student reviews
- Discussion forums

### Phase 3
- Quizzes and assignments
- Certificate generation
- Video transcripts
- Downloadable resources

### Phase 4
- Mobile app
- Live classes
- Peer-to-peer learning
- Gamification
