# SkillMatch AI - Resume-Job Match Platform

A modern, AI-powered platform that connects job seekers with perfect opportunities using intelligent resume analysis and job matching algorithms.

## 🚀 Features

### For Job Seekers (Applicants)
- **Smart Resume Upload**: PDF/DOC support with automatic parsing
- **AI-Powered Analysis**: Comprehensive skill extraction and resume scoring
- **Visual Match Analytics**: Radar charts, bar graphs, and skill gap analysis
- **Job Recommendations**: Personalized job suggestions with match percentages
- **Real-time Updates**: Live notifications for new matching opportunities
- **Skill Gap Identification**: Word cloud visualization of missing skills

### For Recruiters (HR)
- **Job Management**: Easy job posting with manual forms or document upload
- **Candidate Discovery**: Advanced filtering by skills, experience, and match scores
- **Smart Matching**: AI-driven candidate recommendations for each role
- **Analytics Dashboard**: Recruitment metrics and hiring insights
- **Resume Viewer**: Detailed candidate profiles with skill analysis
- **Bulk Operations**: Efficient candidate management tools

## 🎨 Design & Technology

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome 6
- **Responsive**: Mobile-first design approach
- **Modern UI**: Clean, professional interface with role-specific themes

## 📁 Project Structure

```
v2/
├── index.html              # Landing page
├── signup.html            # Universal signup page with role selection
├── login-applicant.html   # Applicant login page
├── login-hr.html         # HR login page
├── dashboard-applicant.html # Applicant dashboard
├── dashboard-hr.html     # HR dashboard
├── js/
│   └── app.js           # Main application logic
└── README.md           # This file
```

## 🔧 Pages Overview

### 1. Landing Page (`index.html`)
- Hero section with clear value proposition
- Role-specific CTAs for signup/login
- Feature highlights with icons
- Company statistics and social proof
- Responsive navigation and footer

### 2. Signup Page (`signup.html`)
- Visual role selection (Applicant vs HR)
- Comprehensive form validation
- Password strength indicators
- Terms and conditions agreement
- Auto-redirect based on selected role

### 3. Login Pages
#### Applicant Login (`login-applicant.html`)
- Blue-themed interface
- User-focused messaging
- Feature preview for applicants
- Link to HR login for role switching

#### HR Login (`login-hr.html`)
- Purple-themed interface
- Professional messaging
- HR-specific feature highlights
- Link to applicant login for role switching

### 4. Dashboard Pages
#### Applicant Dashboard (`dashboard-applicant.html`)
- Resume upload with drag-and-drop
- Match statistics with visual charts
- Job explorer with filtering
- Skill gap analysis
- Interactive job detail modals

#### HR Dashboard (`dashboard-hr.html`)
- Job role management interface
- Document upload for job descriptions
- Candidate browser with advanced filters
- Recruitment analytics
- Detailed candidate profiles

## 🎯 Key Features Implemented

### Visual Design
- **Role-based Color Schemes**: Blue for applicants, purple for HR
- **Interactive Components**: Hover effects, smooth transitions
- **Data Visualization**: Charts for match analysis and recruitment metrics
- **Responsive Layout**: Optimized for all screen sizes

### User Experience
- **Intuitive Navigation**: Clear user flows between pages
- **Smart Defaults**: Pre-filled forms based on URL parameters
- **Visual Feedback**: Loading states, success messages, error handling
- **Accessibility**: Keyboard navigation, screen reader support

### Functionality
- **File Upload**: Resume and job description processing
- **Search & Filter**: Advanced filtering for jobs and candidates
- **Modal Windows**: Job details and candidate profiles
- **Session Management**: Auto-logout and user state persistence

## 🚀 Getting Started

1. **Open the Project**: Navigate to the project directory
2. **Launch Landing Page**: Open `index.html` in a web browser
3. **Explore Features**: 
   - Sign up as different user types
   - Navigate through role-specific dashboards
   - Test upload functionality
   - Explore data visualizations

## 🌐 **How to Run (Browser Only)**

### **Method 1: Direct File Opening**
1. Navigate to your project folder: `c:\Users\harsh\OneDrive\Desktop\SEM 5\DBMS\project\ui\v2`
2. **Double-click** `index.html`
3. It will open in your default browser
4. Start exploring the platform!

### **Method 2: Right-Click Menu**
1. **Right-click** on `index.html`
2. Choose **"Open with"** → **Your preferred browser** (Chrome, Firefox, Edge)

### **Method 3: Drag & Drop**
1. Open your browser
2. **Drag** `index.html` from the file explorer
3. **Drop** it into the browser window

## ✅ **What Works Out of the Box**
- ✅ All navigation between pages
- ✅ Form validation and submissions
- ✅ File upload interfaces (UI only)
- ✅ Interactive charts and visualizations
- ✅ All styling and animations
- ✅ Role-based login flows
- ✅ Dashboard features and mock data
- ✅ Responsive design on all devices

**No Installation Needed** - Pure HTML/CSS/JavaScript that runs entirely in the browser!

## 🔄 User Flow

1. **Landing** → Choose role and sign up/login
2. **Authentication** → Role-specific login pages
3. **Dashboard** → Access role-appropriate features
4. **Interactions** → Upload, search, analyze, match

## 🎨 Styling Notes

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Theme**: Extended color palette for brand consistency
- **Component Approach**: Reusable styling patterns
- **Mobile Responsive**: Grid layouts adapt to screen size

## 🔧 Technical Implementation

### JavaScript Architecture
- **Modular Design**: Organized utility functions
- **Event Handling**: Smooth user interactions
- **Data Simulation**: Mock API responses for demonstration
- **State Management**: Local storage for user sessions

### Chart Integration
- **Chart.js**: Professional data visualization
- **Responsive Charts**: Adapt to container sizes
- **Interactive Elements**: Hover states and animations
- **Multiple Chart Types**: Radar, bar, and line charts

## 🎯 Future Enhancements

- **Backend Integration**: Connect to real API endpoints
- **Advanced AI**: Implement actual ML algorithms
- **Real-time Features**: WebSocket connections for live updates
- **Enhanced Analytics**: More detailed reporting features
- **Mobile App**: Native mobile applications
- **Video Interviews**: Integrated video calling

## 🤝 Contributing

This project serves as a foundation for a comprehensive recruitment platform. The clean architecture and modern design patterns make it easy to extend and customize for specific business needs.

---

**Built with ❤️ for modern recruitment needs**
