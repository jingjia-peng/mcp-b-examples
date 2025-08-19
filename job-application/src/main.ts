
import './style.css';
import './mcp';

function initializeFormEvents() {
  const resumeInput = document.getElementById('resume') as HTMLInputElement;
  const fileInfo = document.getElementById('file-info');
  const fileUpload = document.getElementById('resume-upload');

  resumeInput.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      fileInfo!.style.display = 'block';
      fileInfo!.innerHTML = `
        <strong>Selected file:</strong> ${file.name}<br>
        <strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB<br>
        <strong>Upload time:</strong> ${new Date().toLocaleString()}
      `;
      fileUpload!.style.borderColor = '#10b981';
      fileUpload!.style.background = '#f0fdf4';
    }
  });

  document.getElementById('reset-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all form data?')) {
      (document.querySelector('.job-application-form') as HTMLFormElement).reset();
      fileInfo!.style.display = 'none';
      fileUpload!.style.borderColor = '#d1d5db';
      fileUpload!.style.background = '#f9fafb';
      updateApplicationStatus('draft');
    }
  });

  document.getElementById('submit-btn')?.addEventListener('click', () => {
    if (validateForm()) {
      submitApplication();
    }
  });
}

function validateForm(): boolean {
  const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
  let isValid = true;

  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      field.style.borderColor = '#d1d5db';
    }
  });

  if (!isValid) {
    showNotification('Please fill in all required fields', 'error');
  }

  return isValid;
}

function submitApplication() {
  updateApplicationStatus('submitted');
  showNotification('Application submitted successfully!', 'success');
  setTimeout(() => {
    showNotification('Your application is under review...', 'info');
  }, 2000);
}

function updateApplicationStatus(status: 'draft' | 'submitted') {
  const statusElement = document.getElementById('application-status');
  if (statusElement) {
    if (status === 'draft') {
      statusElement.className = 'status-indicator status-draft';
      statusElement.textContent = 'Draft Status';
    } else {
      statusElement.className = 'status-indicator status-submitted';
      statusElement.textContent = 'Submitted';
    }
  }
}

function showNotification(message: string, type: 'success' | 'info' | 'error' = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = `AI: ${message}`;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 50);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFormEvents);
} else {
  initializeFormEvents();
}

(window as any).showNotification = showNotification;
(window as any).updateApplicationStatus = updateApplicationStatus;
