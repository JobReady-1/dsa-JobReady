# AlgoPro Backend Judge System

A complete code execution and judging system that supports multiple programming languages.

## Features

- **Multi-language Support**: Java, Python, C++, JavaScript
- **Secure Execution**: Isolated execution with timeouts
- **Test Case Validation**: Automatic test case running and validation
- **RESTful API**: Clean API for code submission and execution

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **Java JDK** (for Java code execution)
- **Python 3** (for Python code execution)
- **GCC/G++** (for C++ code execution)

### Installation Check

Run these commands to verify installations:

```bash
node --version
java --version
python3 --version
g++ --version
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```env
PORT=5000
```

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### 1. Get All Problems
```
GET /api/problems
```

### 2. Get Specific Problem
```
GET /api/problems/:id
```

### 3. Run Code (Test)
```
POST /api/run
Content-Type: application/json

{
  "code": "print('Hello World')",
  "language": "python",
  "input": ""
}
```

### 4. Submit Code (Judge)
```
POST /api/submit
Content-Type: application/json

{
  "code": "your code here",
  "language": "java8",
  "problemId": 1
}
```

## Supported Languages

- `java8` - Java 8+
- `python` - Python 3
- `cpp` - C++17
- `javascript` - Node.js

## Security Features

- **Timeout Protection**: 5-second execution limit
- **Memory Limits**: 1MB output buffer
- **Isolated Execution**: Each submission runs in isolation
- **Automatic Cleanup**: Temporary files are cleaned up after execution

## Project Structure

```
backend/
├── src/
│   ├── app.js              # Main Express app
│   ├── routes/
│   │   └── codeRoutes.js   # API routes
│   ├── services/
│   │   └── codeExecutor.js # Code execution engine
│   └── data/
│       └── problems.js     # Problem definitions
├── temp/                   # Temporary execution files
└── package.json
```

## Adding New Problems

Edit `src/data/problems.js`:

```javascript
{
  id: 11,
  title: "Your Problem Title",
  difficulty: "Easy",
  topic: "Arrays",
  testCases: [
    { input: "test input", output: "expected output" },
    // Add more test cases
  ],
}
```

## Troubleshooting

### Java Compilation Errors
- Ensure JDK is installed and `javac` is in PATH
- Class name must be `Solution`

### Python Errors
- Ensure Python 3 is installed as `python3`
- Check Python is in system PATH

### C++ Compilation Errors
- Ensure GCC/G++ is installed
- Check compiler supports C++17

### Permission Errors
- Ensure the `temp/` directory has write permissions
- On Unix systems: `chmod 755 temp/`

## Performance Notes

- Each code execution is isolated
- Concurrent submissions are handled sequentially
- For production, consider using Docker containers for better isolation
- Consider implementing a queue system for high traffic

## Future Enhancements

- [ ] Docker-based execution for better security
- [ ] Support for more languages (Go, Rust, etc.)
- [ ] Memory usage tracking
- [ ] Execution time tracking
- [ ] Rate limiting
- [ ] User authentication
- [ ] Submission history database
