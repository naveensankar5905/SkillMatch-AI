// Global app configuration and utilities
// Dark/Light mode toggle logic
document.addEventListener('DOMContentLoaded', function() {
    const toggleInput = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Function to apply dark mode
    function applyDarkMode() {
        body.classList.add('dark-mode');
        body.classList.remove('bg-gray-50');
        body.classList.add('bg-gray-900');
        
        // Force all sections to update
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('bg-white', 'bg-gray-50');
        });
        
        if (toggleInput) {
            toggleInput.checked = true;
        }
    }
    
    // Function to apply light mode
    function applyLightMode() {
        body.classList.remove('dark-mode');
        body.classList.remove('bg-gray-900');
        body.classList.add('bg-gray-50');
        
        if (toggleInput) {
            toggleInput.checked = false;
        }
    }
    
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        applyDarkMode();
    }
    
    if (toggleInput) {
        toggleInput.addEventListener('change', function() {
            if (this.checked) {
                // Switch to dark mode
                applyDarkMode();
                localStorage.setItem('theme', 'dark');
            } else {
                // Switch to light mode
                applyLightMode();
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Set initial toggle state
        if (body.classList.contains('dark-mode')) {
            toggleInput.checked = true;
        } else {
            toggleInput.checked = false;
        }
    }
});
// ...existing code...
const SkillMatchAI = {
    config: {
        version: '1.0.0',
        api: {
            baseUrl: '/api',
            endpoints: {
                auth: '/auth',
                users: '/users',
                jobs: '/jobs',
                resumes: '/resumes',
                matches: '/matches'
            }
        }
    },

    // Utility functions
    utils: {
        // Format percentage
        formatPercentage: (value) => `${Math.round(value)}%`,
        
        // Format date
        formatDate: (date) => new Date(date).toLocaleDateString(),
        
        // Debounce function for search inputs
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Local storage helpers
        storage: {
            set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
            get: (key) => {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            },
            remove: (key) => localStorage.removeItem(key),
            clear: () => localStorage.clear()
        },

        // Session management
        session: {
            setUser: (user) => {
                SkillMatchAI.utils.storage.set('currentUser', user);
                SkillMatchAI.utils.storage.set('isLoggedIn', true);
            },
            getUser: () => SkillMatchAI.utils.storage.get('currentUser'),
            isLoggedIn: () => SkillMatchAI.utils.storage.get('isLoggedIn') || false,
            logout: () => {
                SkillMatchAI.utils.storage.clear();
                window.location.href = 'index.html';
            }
        },

        // Show notifications
        notify: (message, type = 'info') => {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                type === 'success' ? 'bg-green-500 text-white' :
                type === 'error' ? 'bg-red-500 text-white' :
                type === 'warning' ? 'bg-yellow-500 text-black' :
                'bg-blue-500 text-white'
            }`;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 5000);
        },

        // File upload validation
        validateFile: (file, allowedTypes = ['.pdf', '.doc', '.docx'], maxSize = 5 * 1024 * 1024) => {
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!allowedTypes.includes(fileExtension)) {
                return { valid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` };
            }
            
            if (file.size > maxSize) {
                return { valid: false, error: `File size too large. Maximum size: ${maxSize / (1024 * 1024)}MB` };
            }
            
            return { valid: true };
        }
    },

    // API functions (mock for now)
    api: {
        // Authentication
        login: async (credentials) => {
            // Mock API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true,
                        user: {
                            id: 1,
                            username: credentials.username,
                            role: credentials.role || 'applicant',
                            email: credentials.username + '@example.com'
                        }
                    });
                }, 1000);
            });
        },

        signup: async (userData) => {
            // Mock API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true,
                        user: {
                            id: Date.now(),
                            ...userData
                        }
                    });
                }, 1000);
            });
        },

        // Resume operations
        uploadResume: async (file) => {
            // Mock API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true,
                        resumeId: Date.now(),
                        parsedData: {
                            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
                            experience: '3 years',
                            education: 'B.S. Computer Science'
                        }
                    });
                }, 2000);
            });
        },

        // Job operations
        getJobs: async (filters = {}) => {
            // Mock API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true,
                        jobs: [
                            {
                                id: 1,
                                title: 'Senior Frontend Developer',
                                company: 'TechCorp',
                                location: 'San Francisco, CA',
                                matchPercentage: 92,
                                skills: ['React', 'JavaScript', 'TypeScript']
                            },
                            {
                                id: 2,
                                title: 'Full Stack Engineer',
                                company: 'StartupXYZ',
                                location: 'Remote',
                                matchPercentage: 89,
                                skills: ['Node.js', 'MongoDB', 'React']
                            }
                        ]
                    });
                }, 1000);
            });
        },

        createJob: async (jobData) => {
            // Mock API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true,
                        job: {
                            id: Date.now(),
                            ...jobData
                        }
                    });
                }, 1000);
            });
        }
    },

    // Initialize app
    init: () => {
        console.log('SkillMatch AI initialized');
        
        // Add global event listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Auto-logout after inactivity (30 minutes)
            let inactivityTimer;
            const resetTimer = () => {
                clearTimeout(inactivityTimer);
                if (SkillMatchAI.utils.session.isLoggedIn()) {
                    inactivityTimer = setTimeout(() => {
                        SkillMatchAI.utils.notify('Session expired due to inactivity', 'warning');
                        setTimeout(SkillMatchAI.utils.session.logout, 2000);
                    }, 30 * 60 * 1000); // 30 minutes
                }
            };

            // Reset timer on user activity
            ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
                document.addEventListener(event, resetTimer, true);
            });

            resetTimer();
        });
    }
};

// Initialize the app
SkillMatchAI.init();

// Export for use in other files
window.SkillMatchAI = SkillMatchAI;

// Applicant Portal Functionality
let currentSection = 'dashboard';
let resumeUploaded = false;
let resumeData = null;
let skillSpiderChart = null;

// Section Navigation Functions
function showSection(section) {
    console.log('showSection called with:', section); // Debug log
    
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.add('hidden');
    });
    
    // Show selected section
    const targetSection = document.getElementById(section + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
        console.log('Showing section:', section + '-section'); // Debug log
    } else {
        console.error('Section not found:', section + '-section'); // Debug log
    }
    
    // Update sidebar active state - reset all nav items
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.classList.remove('bg-gray-100', 'text-gray-900');
        navItem.classList.add('text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900');
    });
    
    // Activate current nav item
    const navId = 'nav-' + section;
    const currentNavItem = document.getElementById(navId);
    if (currentNavItem) {
        currentNavItem.classList.add('bg-gray-100', 'text-gray-900');
        currentNavItem.classList.remove('text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900');
        console.log('Activated nav item:', navId); // Debug log
    } else {
        console.error('Nav item not found:', navId); // Debug log
    }
    
    currentSection = section;
    
    // Load section-specific content
    if (section === 'search-jobs') {
        loadRecentJobs();
    }
    // Dashboard now only contains resume upload, no additional content loading needed
}

// Resume Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const resumeUpload = document.getElementById('resumeUpload');
    const resumeFile = document.getElementById('resumeFile');
    
    if (resumeUpload && resumeFile) {
        // Drag and drop functionality
        resumeUpload.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('border-blue-400', 'bg-blue-50');
        });
        
        resumeUpload.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('border-blue-400', 'bg-blue-50');
        });
        
        resumeUpload.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('border-blue-400', 'bg-blue-50');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleResumeUpload(files[0]);
            }
        });
        
        // File input change
        resumeFile.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleResumeUpload(this.files[0]);
            }
        });
    }
});

function handleResumeUpload(file) {
    // Validate file type and size
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file.');
        return;
    }
    
    if (file.size > maxSize) {
        alert('File size must be less than 5MB.');
        return;
    }
    
    // Show uploaded file
    document.getElementById('uploadedResume').classList.remove('hidden');
    document.getElementById('resumeFileName').textContent = file.name;
    document.getElementById('resumeUpload').style.display = 'none';
    
    // Simulate resume processing
    setTimeout(() => {
        processResume(file);
    }, 2000);
}

function removeResume() {
    document.getElementById('uploadedResume').classList.add('hidden');
    document.getElementById('resumeUpload').style.display = 'block';
    
    // Hide analysis section
    const analysisSection = document.getElementById('resumeAnalysisSection');
    if (analysisSection) {
        analysisSection.classList.add('hidden');
    }
    
    document.getElementById('emptyProfile').classList.remove('hidden');
    document.getElementById('populatedProfile').classList.add('hidden');
    resumeUploaded = false;
    resumeData = null;
    
    // Destroy chart if it exists
    if (window.skillAnalysisChart) {
        window.skillAnalysisChart.destroy();
        window.skillAnalysisChart = null;
    }
}

function processResume(file) {
    // Simulate resume parsing and analysis
    resumeData = {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        skills: ["JavaScript", "React", "HTML/CSS", "Python", "Git", "SQL"],
        experience: [
            {
                title: "Frontend Developer",
                company: "Tech Company Inc.",
                duration: "2020 - Present",
                description: "Developed responsive web applications using React and JavaScript."
            },
            {
                title: "Junior Developer",
                company: "StartupXYZ",
                duration: "2018 - 2020", 
                description: "Worked on various web development projects using HTML, CSS, and JavaScript."
            }
        ],
        education: [
            {
                degree: "Bachelor of Computer Science",
                school: "University of Technology",
                year: "2018",
                gpa: "3.8/4.0"
            }
        ]
    };
    
    resumeUploaded = true;
    
    // Show analysis section after resume is processed
    const analysisSection = document.getElementById('resumeAnalysisSection');
    if (analysisSection) {
        analysisSection.classList.remove('hidden');
    }
    
    // Update analysis cards
    document.getElementById('skillsMatched').textContent = '8/12';
    document.getElementById('jobMatches').textContent = '15';
    document.getElementById('overallMatch').textContent = '87%';
    
    // Create the skill analysis chart
    setTimeout(() => {
        createSkillAnalysisChart();
        populateSkillsLegend();
        populateTopJobMatches();
        populateSkillGaps();
    }, 100);
    
    // Populate profile when resume is uploaded
    populateProfile();
}

function createSkillAnalysisChart() {
    const ctx = document.getElementById('skillAnalysisChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.skillAnalysisChart) {
        window.skillAnalysisChart.destroy();
    }
    
    const skillLevels = {
        'JavaScript': 9,
        'React': 8,
        'HTML/CSS': 9,
        'Python': 6,
        'Node.js': 4,
        'TypeScript': 5,
        'AWS': 3,
        'MongoDB': 5
    };
    
    window.skillAnalysisChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(skillLevels),
            datasets: [{
                label: 'Your Skills',
                data: Object.values(skillLevels),
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function populateSkillsLegend() {
    const skillsLegend = document.getElementById('skillsLegend');
    if (!skillsLegend) return;
    
    const skillLevels = {
        'JavaScript': 9,
        'React': 8,
        'HTML/CSS': 9,
        'Python': 6,
        'Node.js': 4,
        'TypeScript': 5,
        'AWS': 3,
        'MongoDB': 5
    };
    
    // Sort skills by level (highest first)
    const sortedSkills = Object.entries(skillLevels)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 6); // Show top 6 skills
    
    skillsLegend.innerHTML = '';
    
    sortedSkills.forEach(([skill, level]) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'flex items-center justify-between';
        skillItem.innerHTML = `
            <span class="text-sm text-gray-700">${skill}</span>
            <div class="flex items-center space-x-2">
                <div class="w-12 h-2 bg-gray-200 rounded-full">
                    <div class="h-2 bg-blue-500 rounded-full" style="width: ${level * 10}%"></div>
                </div>
                <span class="text-xs text-gray-500">${level}/10</span>
            </div>
        `;
        skillsLegend.appendChild(skillItem);
    });
}

function populateTopJobMatches() {
    const jobMatches = document.getElementById('topJobMatches');
    if (!jobMatches) return;
    
    const matchingJobs = [
        {
            title: "Senior Frontend Developer",
            company: "TechCorp Solutions",
            match: 94,
            location: "San Francisco, CA",
            salary: "$120,000 - $150,000",
            type: "Full-time"
        },
        {
            title: "React Developer",
            company: "InnovateLabs",
            match: 89,
            location: "Remote",
            salary: "$100,000 - $130,000",
            type: "Full-time"
        },
        {
            title: "Full Stack JavaScript Developer",
            company: "StartupXYZ",
            match: 85,
            location: "New York, NY",
            salary: "$95,000 - $125,000",
            type: "Full-time"
        },
        {
            title: "Frontend Engineer",
            company: "Digital Solutions Inc",
            match: 82,
            location: "Austin, TX",
            salary: "$90,000 - $115,000",
            type: "Full-time"
        },
        {
            title: "UI/UX Developer",
            company: "DesignFirst",
            match: 78,
            location: "Seattle, WA",
            salary: "$85,000 - $110,000",
            type: "Full-time"
        }
    ];
    
    jobMatches.innerHTML = '';
    
    matchingJobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.className = 'border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors';
        jobItem.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">${job.title}</h4>
                    <p class="text-sm text-gray-600">${job.company}</p>
                    <div class="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span><i class="fas fa-map-marker-alt mr-1"></i>${job.location}</span>
                        <span><i class="fas fa-dollar-sign mr-1"></i>${job.salary}</span>
                        <span><i class="fas fa-briefcase mr-1"></i>${job.type}</span>
                    </div>
                </div>
                <div class="ml-4 text-right">
                    <div class="flex items-center space-x-2">
                        <span class="text-sm font-medium text-green-600">${job.match}% match</span>
                        <div class="w-12 h-2 bg-gray-200 rounded-full">
                            <div class="h-2 bg-green-500 rounded-full" style="width: ${job.match}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        jobMatches.appendChild(jobItem);
    });
}

function populateSkillGaps() {
    const skillGaps = document.getElementById('skillGaps');
    if (!skillGaps) return;
    
    const gaps = [
        {
            skill: "TypeScript",
            importance: "High",
            reason: "Required for 80% of matching positions",
            resources: ["TypeScript Handbook", "Online Course"],
            urgency: "high"
        },
        {
            skill: "AWS Cloud Services",
            importance: "High", 
            reason: "Growing demand in cloud-first companies",
            resources: ["AWS Certification", "Cloud Practitioner"],
            urgency: "high"
        },
        {
            skill: "Docker & Kubernetes",
            importance: "Medium",
            reason: "DevOps skills increasingly valuable",
            resources: ["Docker Documentation", "K8s Tutorials"],
            urgency: "medium"
        },
        {
            skill: "GraphQL",
            importance: "Medium",
            reason: "Modern API development standard",
            resources: ["GraphQL Tutorial", "Apollo Docs"],
            urgency: "medium"
        }
    ];
    
    skillGaps.innerHTML = '';
    
    gaps.forEach(gap => {
        const urgencyColor = gap.urgency === 'high' ? 'red' : 'yellow';
        const gapItem = document.createElement('div');
        gapItem.className = `border border-gray-200 rounded-lg p-4 bg-${urgencyColor}-50`;
        gapItem.innerHTML = `
            <div class="flex items-start justify-between mb-2">
                <h4 class="font-medium text-gray-900">${gap.skill}</h4>
                <span class="text-xs px-2 py-1 bg-${urgencyColor}-100 text-${urgencyColor}-800 rounded-full">
                    ${gap.importance} Priority
                </span>
            </div>
            <p class="text-sm text-gray-600 mb-3">${gap.reason}</p>
            <div class="space-y-1">
                <p class="text-xs font-medium text-gray-700">Recommended Resources:</p>
                ${gap.resources.map(resource => `
                    <div class="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
                        • ${resource}
                    </div>
                `).join('')}
            </div>
        `;
        skillGaps.appendChild(gapItem);
    });
}

function populateProfile() {
    if (!resumeData) return;
    
    // Hide empty profile, show populated profile
    document.getElementById('emptyProfile').classList.add('hidden');
    document.getElementById('populatedProfile').classList.remove('hidden');
    
    // Basic information
    document.getElementById('profileName').textContent = resumeData.name;
    document.getElementById('profileEmail').textContent = resumeData.email;
    document.getElementById('profilePhone').textContent = resumeData.phone;
    document.getElementById('profileLocation').textContent = resumeData.location;
    
    // Skills
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';
    resumeData.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm';
        skillTag.textContent = skill;
        skillsList.appendChild(skillTag);
    });
    
    // Experience
    const experienceList = document.getElementById('experienceList');
    experienceList.innerHTML = '';
    resumeData.experience.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'border-l-4 border-blue-500 pl-4';
        expDiv.innerHTML = `
            <h4 class="font-medium text-gray-900">${exp.title}</h4>
            <p class="text-sm text-gray-600">${exp.company} • ${exp.duration}</p>
            <p class="text-sm text-gray-700 mt-1">${exp.description}</p>
        `;
        experienceList.appendChild(expDiv);
    });
    
    // Education
    const educationList = document.getElementById('educationList');
    educationList.innerHTML = '';
    resumeData.education.forEach(edu => {
        const eduDiv = document.createElement('div');
        eduDiv.className = 'flex justify-between items-center p-3 border border-gray-200 rounded-lg';
        eduDiv.innerHTML = `
            <div>
                <h4 class="font-medium text-gray-900">${edu.degree}</h4>
                <p class="text-sm text-gray-600">${edu.school}</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-medium text-gray-900">${edu.year}</p>
                <p class="text-xs text-gray-500">GPA: ${edu.gpa}</p>
            </div>
        `;
        educationList.appendChild(eduDiv);
    });
}

// Job Search Functionality
function searchJobs() {
    const title = document.getElementById('searchTitle').value;
    const skills = document.getElementById('searchSkills').value;
    const keywords = document.getElementById('searchKeywords').value;
    
    // Simulate job search
    const allJobs = getJobDatabase();
    let filteredJobs = allJobs;
    
    if (title) {
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    
    if (skills) {
        const skillArray = skills.split(',').map(s => s.trim().toLowerCase());
        filteredJobs = filteredJobs.filter(job =>
            skillArray.some(skill => 
                job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill))
            )
        );
    }
    
    if (keywords) {
        const keywordArray = keywords.split(',').map(k => k.trim().toLowerCase());
        filteredJobs = filteredJobs.filter(job =>
            keywordArray.some(keyword =>
                job.title.toLowerCase().includes(keyword) ||
                job.company.toLowerCase().includes(keyword) ||
                job.location.toLowerCase().includes(keyword)
            )
        );
    }
    
    displayJobSearchResults(filteredJobs);
}

function clearJobSearch() {
    document.getElementById('searchTitle').value = '';
    document.getElementById('searchSkills').value = '';
    document.getElementById('searchKeywords').value = '';
    loadRecentJobs();
}

function loadRecentJobs() {
    const jobs = getJobDatabase();
    displayJobSearchResults(jobs);
}

function displayJobSearchResults(jobs) {
    const resultsContainer = document.getElementById('jobSearchResults');
    const jobCount = document.getElementById('jobCount');
    
    if (!resultsContainer) return;
    
    jobCount.textContent = `${jobs.length} jobs found`;
    resultsContainer.innerHTML = '';
    
    jobs.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer';
        
        // Determine match score badge classes
        let badgeClasses = '';
        if (job.matchScore >= 90) {
            badgeClasses = 'bg-green-100 text-green-800';
        } else if (job.matchScore >= 80) {
            badgeClasses = 'bg-yellow-100 text-yellow-800';
        } else {
            badgeClasses = 'bg-red-100 text-red-800';
        }
        
        jobDiv.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900">${job.title}</h4>
                <span class="${badgeClasses} text-xs px-2 py-1 rounded-full">${job.matchScore}%</span>
            </div>
            <p class="text-sm text-gray-600 mb-2">${job.company} • ${job.location}</p>
            <p class="text-sm text-gray-700 mb-3">${job.description}</p>
            <div class="flex justify-between items-center">
                <div class="flex flex-wrap gap-1">
                    ${job.skills.slice(0, 3).map(skill => `<span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">${skill}</span>`).join('')}
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-gray-900">$${job.salary}</span>
                    <button onclick="openJobDetails('${job.title}', '${job.company}', '${job.matchScore}%')" class="text-primary text-sm hover:underline">View Details</button>
                </div>
            </div>
        `;
        resultsContainer.appendChild(jobDiv);
    });
}

function loadJobExplorer() {
    const jobExplorer = document.getElementById('jobExplorerList');
    if (!jobExplorer) return;
    
    const jobs = getJobDatabase().slice(0, 5); // Show top 5 jobs
    jobExplorer.innerHTML = '';
    
    jobs.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer';
        
        // Determine match score badge classes
        let badgeClasses = '';
        if (job.matchScore >= 90) {
            badgeClasses = 'bg-green-100 text-green-800';
        } else if (job.matchScore >= 80) {
            badgeClasses = 'bg-yellow-100 text-yellow-800';
        } else {
            badgeClasses = 'bg-red-100 text-red-800';
        }
        
        jobDiv.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-medium text-gray-900">${job.title}</h4>
                    <p class="text-sm text-gray-600">${job.company} • ${job.location}</p>
                </div>
                <span class="${badgeClasses} text-xs px-2 py-1 rounded-full">${job.matchScore}%</span>
            </div>
        `;
        jobExplorer.appendChild(jobDiv);
    });
}

function getJobDatabase() {
    return [
        {
            title: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            matchScore: 94,
            salary: "120k-150k",
            skills: ["React", "JavaScript", "TypeScript", "CSS", "Node.js"],
            description: "Join our team to build next-generation web applications using modern technologies."
        },
        {
            title: "React Developer",
            company: "StartupXYZ",
            location: "Remote",
            matchScore: 91,
            salary: "90k-120k", 
            skills: ["React", "JavaScript", "Redux", "HTML", "CSS"],
            description: "Looking for a passionate React developer to join our growing startup."
        },
        {
            title: "Full Stack Engineer",
            company: "WebSolutions Ltd",
            location: "New York, NY",
            matchScore: 88,
            salary: "100k-130k",
            skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
            description: "Full stack position working on enterprise-level web applications."
        },
        {
            title: "UI/UX Developer",
            company: "DesignHub Co.",
            location: "Austin, TX",
            matchScore: 85,
            salary: "95k-125k",
            skills: ["HTML", "CSS", "JavaScript", "Figma", "React"],
            description: "Create beautiful and functional user interfaces for our design platform."
        },
        {
            title: "JavaScript Developer",
            company: "CodeCraft Inc.",
            location: "Seattle, WA",
            matchScore: 82,
            salary: "85k-110k",
            skills: ["JavaScript", "Vue.js", "Node.js", "SQL", "Git"],
            description: "Work with cutting-edge JavaScript technologies in a collaborative environment."
        },
        {
            title: "Frontend Engineer",
            company: "WebTech Solutions",
            location: "Boston, MA",
            matchScore: 89,
            salary: "105k-135k",
            skills: ["React", "TypeScript", "GraphQL", "CSS", "Jest"],
            description: "Build scalable frontend solutions for enterprise clients."
        },
        {
            title: "Web Developer",
            company: "Digital Innovations",
            location: "Chicago, IL", 
            matchScore: 79,
            salary: "70k-90k",
            skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            description: "Develop and maintain websites for various clients across industries."
        },
        {
            title: "Software Engineer",
            company: "TechFlow Inc.",
            location: "Denver, CO",
            matchScore: 87,
            salary: "110k-140k",
            skills: ["React", "Python", "Django", "PostgreSQL", "Docker"],
            description: "Full stack development position with focus on web technologies."
        }
    ];
}

// Initialize sections when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard by default
    if (document.getElementById('dashboard-section')) {
        showSection('dashboard');
    }
});

// Job Modal Functions
function openJobDetails(title, company, match) {
    const modal = document.getElementById('jobModal');
    const modalContent = document.getElementById('jobModalContent');
    
    if (!modal || !modalContent) return;
    
    // Populate modal with job details
    modalContent.innerHTML = `
        <div class="space-y-4">
            <div>
                <h3 class="text-xl font-bold text-gray-900">${title}</h3>
                <p class="text-gray-600">${company}</p>
                <span class="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">${match} Match</span>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-900 mb-2">Job Description</h4>
                <p class="text-gray-700">We are looking for an experienced developer to join our team and work on cutting-edge projects. This role offers excellent growth opportunities and the chance to work with modern technologies.</p>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-900 mb-2">Required Skills</h4>
                <div class="flex flex-wrap gap-2">
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">JavaScript</span>
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">React</span>
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Node.js</span>
                    <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Docker (Missing)</span>
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-900 mb-2">Salary Range</h4>
                <p class="text-gray-700">$80,000 - $120,000 per year</p>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
                <button onclick="closeJobModal()" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Close
                </button>
                <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">
                    Apply Now
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeJobModal() {
    const modal = document.getElementById('jobModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        window.location.href = 'index.html';
    }
}

// Make functions globally accessible
window.showSection = showSection;
window.removeResume = removeResume;
window.openJobDetails = openJobDetails;
window.closeJobModal = closeJobModal;
window.logout = logout;
window.searchJobs = searchJobs;
window.clearJobSearch = clearJobSearch;
