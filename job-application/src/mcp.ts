import { TabServerTransport } from '@mcp-b/transports';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

// Application state management
interface ApplicationState {
  status: 'draft' | 'submitted';
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  education: {
    level: string;
    university: string;
    major: string;
    graduationYear: string;
  };
  workExperience: {
    company: string;
    position: string;
    experienceYears: string;
    skills: string;
  };
  resume: {
    fileName: string;
    fileSize: string;
    uploadTime: string;
  };
  coverLetter: string;
  lastUpdated: string;
}

const applicationState: ApplicationState = {
  status: 'draft',
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  },
  education: {
    level: '',
    university: '',
    major: '',
    graduationYear: ''
  },
  workExperience: {
    company: '',
    position: '',
    experienceYears: '',
    skills: ''
  },
  resume: {
    fileName: '',
    fileSize: '',
    uploadTime: ''
  },
  coverLetter: '',
  lastUpdated: new Date().toLocaleString()
};

// Show notification
function showNotification(message: string, type: 'success' | 'info' | 'error' = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'info' ? '#3b82f6' : '#ef4444'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: bold;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    transform: translateX(400px);
    transition: transform 0.3s ease;
  `;
  notification.textContent = `🤖 AI: ${message}`;

  document.body.appendChild(notification);

  // Slide in animation
  setTimeout(() => (notification.style.transform = 'translateX(0)'), 50);

  // Slide out animation
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

// Update form fields
function updateFormField(fieldId: string, value: string) {
  const field = document.getElementById(fieldId) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  if (field) {
    field.value = value;
    // Add visual feedback
    field.style.borderColor = '#10b981';
    field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
    setTimeout(() => {
      field.style.borderColor = '#d1d5db';
      field.style.boxShadow = 'none';
    }, 1000);
  }
}

// Update application status
function updateApplicationStatus(status: 'draft' | 'submitted') {
  const statusElement = document.getElementById('application-status');
  if (statusElement) {
    if (status === 'draft') {
      statusElement.className = 'status-indicator status-draft';
      statusElement.textContent = '📝 Draft Status';
    } else {
      statusElement.className = 'status-indicator status-submitted';
      statusElement.textContent = '✅ Submitted';
    }
  }
  applicationState.status = status;
  applicationState.lastUpdated = new Date().toLocaleString();
}

// Create MCP server
const server = new McpServer({
  name: 'JobApplicationSystem',
  version: '1.0.0'
});

// Basic ping tool
server.tool('ping', 'Test connection', {}, async () => {
  return {
    content: [{ type: 'text', text: 'pong - Job Application System connected' }]
  };
});

// Fill personal information tool
server.tool('fillPersonalInfo', 'Automatically fill personal information form', {
  firstName: z.string().describe('First name'),
  lastName: z.string().describe('Last name'),
  email: z.string().email().describe('Email address'),
  phone: z.string().describe('Phone number'),
  address: z.string().optional().describe('Address (optional)')
}, async ({ firstName, lastName, email, phone, address = '' }) => {
  showNotification('Filling personal information...', 'info');
  
  // Update form fields
  updateFormField('firstName', firstName);
  updateFormField('lastName', lastName);
  updateFormField('email', email);
  updateFormField('phone', phone);
  if (address) {
    updateFormField('address', address);
  }

  // Update state
  applicationState.personalInfo = { firstName, lastName, email, phone, address };
  applicationState.lastUpdated = new Date().toLocaleString();

  showNotification('Personal information filled successfully!', 'success');
  
  return {
    content: [{ 
      type: 'text', 
      text: `Personal information filled successfully:
👤 Name: ${firstName} ${lastName}
📧 Email: ${email}
📞 Phone: ${phone}
📍 Address: ${address || 'Not provided'}`
    }]
  };
});

// Fill education background tool
server.tool('fillEducationInfo', 'Automatically fill education background information', {
  education: z.enum(['high-school', 'bachelor', 'master', 'phd']).describe('Highest education level'),
  university: z.string().describe('University name'),
  major: z.string().describe('Major/Field of study'),
  graduationYear: z.string().describe('Graduation year')
}, async ({ education, university, major, graduationYear }) => {
  showNotification('Filling education background...', 'info');
  
  updateFormField('education', education);
  updateFormField('university', university);
  updateFormField('major', major);
  updateFormField('graduationYear', graduationYear);

  applicationState.education = { level: education, university, major, graduationYear };
  applicationState.lastUpdated = new Date().toLocaleString();

  showNotification('Education background filled successfully!', 'success');
  
  return {
    content: [{ 
      type: 'text', 
      text: `Education background filled successfully:
🎓 Education Level: ${education}
🏫 University: ${university}
📚 Major: ${major}
📅 Graduation Year: ${graduationYear}`
    }]
  };
});

// Fill work experience tool
server.tool('fillWorkExperience', 'Automatically fill work experience information', {
  company: z.string().describe('Company name'),
  position: z.string().describe('Job position'),
  experienceYears: z.string().describe('Years of experience'),
  skills: z.string().describe('Skills list, separated by commas')
}, async ({ company, position, experienceYears, skills }) => {
  showNotification('Filling work experience...', 'info');
  
  updateFormField('currentCompany', company);
  updateFormField('position', position);
  updateFormField('experienceYears', experienceYears);
  updateFormField('skills', skills);

  applicationState.workExperience = { company, position, experienceYears, skills };
  applicationState.lastUpdated = new Date().toLocaleString();

  showNotification('Work experience filled successfully!', 'success');
  
  return {
    content: [{ 
      type: 'text', 
      text: `Work experience filled successfully:
🏢 Company: ${company}
💼 Position: ${position}
⏰ Years of Experience: ${experienceYears} years
🛠️ Skills: ${skills}`
    }]
  };
});

// Upload resume tool
server.tool('uploadResume', 'Simulate resume file upload', {
  fileName: z.string().describe('Resume file name'),
  fileSize: z.string().describe('File size (KB)'),
  fileType: z.enum(['pdf', 'doc', 'docx']).describe('File type')
}, async ({ fileName, fileSize, fileType }) => {
  showNotification('Uploading resume...', 'info');
  
  // Simulate file upload process
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Update file information display
  const fileInfo = document.getElementById('file-info');
  const fileUpload = document.getElementById('resume-upload');
  
  if (fileInfo && fileUpload) {
    fileInfo.style.display = 'block';
    fileInfo.innerHTML = `
      <strong>📄 Selected file:</strong> ${fileName}<br>
      <strong>📏 File size:</strong> ${fileSize} KB<br>
      <strong>📅 Upload time:</strong> ${new Date().toLocaleString()}
    `;
    fileUpload.style.borderColor = '#10b981';
    fileUpload.style.background = '#f0fdf4';
  }

  applicationState.resume = {
    fileName,
    fileSize,
    uploadTime: new Date().toLocaleString()
  };
  applicationState.lastUpdated = new Date().toLocaleString();

  showNotification('Resume uploaded successfully!', 'success');
  
  return {
    content: [{ 
      type: 'text', 
      text: `Resume uploaded successfully:
📄 File name: ${fileName}
📏 File size: ${fileSize} KB
📅 Upload time: ${new Date().toLocaleString()}`
    }]
  };
});

// Generate cover letter tool
server.tool('generateCoverLetter', 'Generate cover letter content', {
  position: z.string().describe('Applied position'),
  company: z.string().describe('Applied company'),
  experience: z.string().describe('Relevant experience description'),
  motivation: z.string().describe('Application motivation')
}, async ({ position, company, experience, motivation }) => {
  showNotification('Generating cover letter...', 'info');
  
  const coverLetter = `Dear ${company} Recruitment Team,

I am writing to express my strong interest in the ${position} position at your company.

${experience}

${motivation}

I believe my skills and experience can bring value to your company, and I look forward to the opportunity to discuss how I can contribute to your team.

Thank you for your time and consideration.

Best regards`;

  updateFormField('coverLetter', coverLetter);
  applicationState.coverLetter = coverLetter;
  applicationState.lastUpdated = new Date().toLocaleString();

  showNotification('Cover letter generated successfully!', 'success');
  
  return {
    content: [{ 
      type: 'text', 
      text: `Cover letter generated successfully for ${position} position at ${company}. Content has been automatically filled in the form.`
    }]
  };
});

// Reset application tool
server.tool('resetApplication', 'Reset entire job application form', {}, async () => {
  showNotification('Resetting application form...', 'info');
  
  // Reset all form fields
  updateFormField('firstName', '');
  updateFormField('lastName', '');
  updateFormField('email', '');
  updateFormField('phone', '');
  updateFormField('address', '');
  updateFormField('education', '');
  updateFormField('university', '');
  updateFormField('major', '');
  updateFormField('graduationYear', '');
  updateFormField('currentCompany', '');
  updateFormField('position', '');
  updateFormField('experienceYears', '');
  updateFormField('skills', '');
  updateFormField('coverLetter', '');

  // Reset file upload area
  const fileInfo = document.getElementById('file-info');
  const fileUpload = document.getElementById('resume-upload');
  
  if (fileInfo && fileUpload) {
    fileInfo.style.display = 'none';
    fileUpload.style.borderColor = '#d1d5db';
    fileUpload.style.background = '#f9fafb';
  }
  
  // Reset status
  updateApplicationStatus('draft');
  
  // Clear application state
  Object.assign(applicationState, {
    status: 'draft',
    personalInfo: { firstName: '', lastName: '', email: '', phone: '', address: '' },
    education: { level: '', university: '', major: '', graduationYear: '' },
    workExperience: { company: '', position: '', experienceYears: '', skills: '' },
    resume: { fileName: '', fileSize: '', uploadTime: '' },
    coverLetter: '',
    lastUpdated: new Date().toLocaleString()
  });

  showNotification('Application form reset successfully!', 'success');
  
  return {
    content: [{ 
      type: 'text', 
      text: 'Application form has been completely reset, all fields have been cleared.'
    }]
  };
});

// Submit application tool
server.tool('submitApplication', 'Submit job application', {}, async () => {
  showNotification('Submitting application...', 'info');
  
  // Validate required fields
  const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
  const missingFields = requiredFields.filter(fieldId => {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    return !field.value.trim();
  });
  
  if (missingFields.length > 0) {
    showNotification('Please fill in all required fields first!', 'error');
    return {
      content: [{ 
        type: 'text', 
        text: `Submission failed: Missing required fields ${missingFields.join(', ')}`
      }]
    };
  }
  
  // Simulate submission process
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  updateApplicationStatus('submitted');
  showNotification('Application submitted successfully!', 'success');
  
  // Simulate follow-up processing
  setTimeout(() => {
    showNotification('Your application is under review...', 'info');
  }, 1000);
  
  return {
    content: [{ 
      type: 'text', 
      text: `Application submitted successfully!
✅ Status: Submitted
📅 Submission time: ${new Date().toLocaleString()}
📧 Confirmation email sent to: ${applicationState.personalInfo.email}`
    }]
  };
});

// Get application status tool
server.tool('getApplicationStatus', 'Get current application status and all filled information', {}, async () => {
  showNotification('Getting application status...', 'info');
  
  const status = {
    ...applicationState,
    completionRate: calculateCompletionRate()
  };
  
  return {
    content: [{ 
      type: 'text', 
      text: `Application Status Report:
📊 Completion Rate: ${status.completionRate}%
📝 Status: ${status.status === 'draft' ? 'Draft' : 'Submitted'}
🕒 Last Updated: ${status.lastUpdated}

👤 Personal Information: ${status.personalInfo.firstName ? 'Filled' : 'Not filled'}
🎓 Education Background: ${status.education.university ? 'Filled' : 'Not filled'}
💼 Work Experience: ${status.workExperience.company ? 'Filled' : 'Not filled'}
📄 Resume: ${status.resume.fileName ? 'Uploaded' : 'Not uploaded'}
💬 Cover Letter: ${status.coverLetter ? 'Filled' : 'Not filled'}`
    }]
  };
});

// Calculate completion rate
function calculateCompletionRate(): number {
  let completed = 0;
  let total = 0;
  
  // Personal information
  total += 4; // firstName, lastName, email, phone
  if (applicationState.personalInfo.firstName) completed++;
  if (applicationState.personalInfo.lastName) completed++;
  if (applicationState.personalInfo.email) completed++;
  if (applicationState.personalInfo.phone) completed++;
  
  // Education background
  total += 4; // level, university, major, graduationYear
  if (applicationState.education.level) completed++;
  if (applicationState.education.university) completed++;
  if (applicationState.education.major) completed++;
  if (applicationState.education.graduationYear) completed++;
  
  // Work experience
  total += 4; // company, position, experienceYears, skills
  if (applicationState.workExperience.company) completed++;
  if (applicationState.workExperience.position) completed++;
  if (applicationState.workExperience.experienceYears) completed++;
  if (applicationState.workExperience.skills) completed++;
  
  // Resume and cover letter
  total += 2;
  if (applicationState.resume.fileName) completed++;
  if (applicationState.coverLetter) completed++;
  
  return Math.round((completed / total) * 100);
}

// Connect server
const transport = new TabServerTransport({
  allowedOrigins: ['*']
});

await server.connect(transport);

console.log('🤖 Job Application System MCP-B tools started');
