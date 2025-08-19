# Job Application System MCP-B Example

This is a simulated job application website MCP-B example that demonstrates how to use AI tools to automate the job application process.

## 🎯 Features

- **Complete Job Application Form**: Includes personal information, education background, work experience, resume upload, and cover letter
- **AI-Powered Form Filling**: Automatically fill form fields through MCP-B tools
- **Smart Cover Letter Generation**: Generate personalized cover letters based on job and company information
- **Real-time Status Tracking**: Display application completion rate and current status
- **File Upload Simulation**: Simulate resume file upload process
- **Form Validation**: Ensure all required fields are complete

## 🛠️ Available MCP-B Tools

### Form Filling Tools
- `fillPersonalInfo` - Automatically fill personal information (name, email, phone, address)
- `fillEducationInfo` - Automatically fill education background (degree, university, major, graduation year)
- `fillWorkExperience` - Automatically fill work experience (company, position, years, skills)

### File Processing Tools
- `uploadResume` - Simulate resume file upload
- `generateCoverLetter` - Generate personalized cover letter

### Management Tools
- `resetApplication` - Reset the entire application form
- `submitApplication` - Submit job application
- `getApplicationStatus` - Get application status and completion rate

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd job-application
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Install MCP-B Browser Extension**
   - Make sure MCP-B browser extension is installed
   - Visit `http://localhost:5173`

4. **Use AI Tools**
   - Open MCP-B extension
   - View available job application tools
   - Call tools to automate the application process

## 📋 Usage Examples

### 1. Fill Personal Information
```typescript
// Call fillPersonalInfo tool
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "address": "New York, NY"
}
```

### 2. Fill Education Background
```typescript
// Call fillEducationInfo tool
{
  "education": "master",
  "university": "MIT",
  "major": "Computer Science",
  "graduationYear": "2023"
}
```

### 3. Fill Work Experience
```typescript
// Call fillWorkExperience tool
{
  "company": "Google",
  "position": "Software Engineer",
  "experienceYears": "3",
  "skills": "React, TypeScript, Node.js, Frontend Engineering"
}
```

### 4. Upload Resume
```typescript
// Call uploadResume tool
{
  "fileName": "John_Doe_Resume.pdf",
  "fileSize": "245.6",
  "fileType": "pdf"
}
```

### 5. Generate Cover Letter
```typescript
// Call generateCoverLetter tool
{
  "position": "Senior Frontend Engineer",
  "company": "Microsoft",
  "experience": "I have 3 years of frontend development experience, proficient in React, TypeScript and other modern frontend technologies.",
  "motivation": "I hope to continue growing on a large platform like Microsoft and contribute my technical skills to the team."
}
```

### 6. Submit Application
```typescript
// Call submitApplication tool
// No parameters needed, will automatically validate required fields and submit
```

## 🎨 Interface Features

- **Responsive Design**: Adapts to different screen sizes
- **Real-time Feedback**: Shows notifications when AI tools are called
- **Status Indicators**: Display application completion rate and status
- **Form Validation**: Real-time validation of required fields
- **File Upload**: Supports PDF, DOC, DOCX formats

## 🔧 Tech Stack

- **Frontend Framework**: Vanilla TypeScript + Vite
- **MCP-B**: @mcp-b/transports
- **MCP SDK**: @modelcontextprotocol/sdk
- **Type Validation**: Zod
- **Styling**: CSS3 + Modern Design

## 📊 State Management

The system maintains complete application state, including:
- Personal Information
- Education Background
- Work Experience
- Resume Information
- Cover Letter Content
- Completion Rate Calculation
- Last Update Time

## 🤖 AI Tool Advantages

1. **Automated Filling**: Reduces repetitive form filling work
2. **Smart Generation**: Generate personalized content based on context
3. **Real-time Validation**: Ensure data completeness and format correctness
4. **Status Tracking**: Real-time monitoring of application progress
5. **Batch Operations**: Support one-click reset and submit

## 🔄 Workflow

1. **Initialization**: Visit the page, system displays blank form
2. **Fill Information**: Use AI tools to fill each section step by step
3. **Upload Files**: Simulate resume file upload
4. **Generate Content**: AI generates personalized cover letter
5. **Validate and Submit**: System validates completeness and submits application
6. **Status Tracking**: Real-time view of application status and completion rate

## 🎯 Extension Possibilities

- Add more form fields (such as references, project experience, etc.)
- Integrate real file upload API
- Add application history records
- Support multi-language interface
- Integrate email sending functionality
- Add application status tracking page

This example demonstrates the application of MCP-B in real business scenarios, greatly improving the efficiency and user experience of the job application process through AI tools.
