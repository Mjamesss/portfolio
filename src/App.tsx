// App.tsx - Complete Portfolio Website with Bootstrap 5
// Customized for Mark James Rafael

import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// ===============================
// 1. TYPE DEFINITIONS
// ===============================

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  socialLinks: SocialLinks;
  resumeUrl?: string;
  yearsOfExperience: number;
}

interface SocialLinks {
  github?: string;
  instagram?: string;
  facebook?: string;
}

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  yearsOfExperience: number;
  description?: string;
}

type SkillCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'desktop';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string[];
  technologies: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: number;
  location: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: ProjectCategory;
  featured: boolean;
  dateCreated: Date;
}

type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'mobile' | 'iot' | 'desktop';

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface PortfolioData {
  userProfile: UserProfile;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
}

// ===============================
// 2. PORTFOLIO DATA (Your Information)
// ===============================

const portfolioData: PortfolioData = {
  userProfile: {
    id: 'user-001',
    firstName: 'Mark James',
    lastName: 'Rafael',
    email: 'rafael.markjames.bscs2022@gmail.com',
    phone: '+639665494046',
    location: 'Blk 1 Lot 21 Tierra Nova Royale I Brgy. 171, Caloocan City',
    title: 'Full-Stack Developer',
    bio: 'Passionate full-stack developer with 2 years of hands-on experience building responsive and scalable web applications. Skilled in both front-end and back-end development. Graduating Computer Science student eager to contribute as a junior to senior-level developer in a professional team environment.',
    socialLinks: {
      github: 'https://github.com/Mjamesss',
      instagram: 'https://www.instagram.com/m_fffyyy_?igsh=MXJteDQ3cndsY2l0dA%3D%3D',
      facebook: 'https://www.facebook.com/thekarinamontage'
    },
    resumeUrl: '/CV.pdf',
    yearsOfExperience: 2
  },
  skills: [
    { id: 'skill-1', name: 'React.js', category: 'frontend', proficiency: 85, yearsOfExperience: 2, description: 'Hooks, Components, State Management' },
    { id: 'skill-2', name: 'Vue.js', category: 'frontend', proficiency: 80, yearsOfExperience: 1.5, description: 'Vuex, Vue Router, Composition API' },
    { id: 'skill-3', name: 'Express.js', category: 'backend', proficiency: 85, yearsOfExperience: 2, description: 'REST APIs, Middleware, Routing' },
    { id: 'skill-4', name: 'Node.js', category: 'backend', proficiency: 85, yearsOfExperience: 2, description: 'Event-driven architecture, NPM' },
    { id: 'skill-5', name: 'Flask', category: 'backend', proficiency: 75, yearsOfExperience: 1, description: 'Python web framework, REST APIs' },
    { id: 'skill-6', name: 'Laravel', category: 'backend', proficiency: 80, yearsOfExperience: 1.5, description: 'PHP framework, Eloquent ORM' },
    { id: 'skill-7', name: 'Django', category: 'backend', proficiency: 75, yearsOfExperience: 1, description: 'Python web framework, ORM' },
    { id: 'skill-8', name: 'Fastify', category: 'backend', proficiency: 70, yearsOfExperience: 1, description: 'High performance Node.js framework' },
    { id: 'skill-9', name: 'Rails', category: 'backend', proficiency: 65, yearsOfExperience: 0.5, description: 'Ruby on Rails framework' },
    { id: 'skill-10', name: 'C#.NET', category: 'desktop', proficiency: 80, yearsOfExperience: 2, description: 'Windows Forms, ASP.NET' },
    { id: 'skill-11', name: 'Java', category: 'desktop', proficiency: 75, yearsOfExperience: 2, description: 'Object-oriented programming' },
    { id: 'skill-12', name: 'C/C++', category: 'desktop', proficiency: 70, yearsOfExperience: 1.5, description: 'System programming, algorithms' },
    { id: 'skill-13', name: 'VB.NET', category: 'desktop', proficiency: 75, yearsOfExperience: 1.5, description: 'Windows application development' },
    { id: 'skill-14', name: 'React Native', category: 'mobile', proficiency: 80, yearsOfExperience: 1.5, description: 'Cross-platform mobile development' },
    { id: 'skill-15', name: 'Bootstrap', category: 'frontend', proficiency: 90, yearsOfExperience: 2, description: 'Responsive design framework' },
    { id: 'skill-16', name: 'Tailwind CSS', category: 'frontend', proficiency: 85, yearsOfExperience: 1.5, description: 'Utility-first CSS framework' },
    { id: 'skill-17', name: 'Postman', category: 'devops', proficiency: 85, yearsOfExperience: 2, description: 'API testing and documentation' },
    { id: 'skill-18', name: 'Git/GitHub', category: 'devops', proficiency: 90, yearsOfExperience: 2, description: 'Version control, collaboration' }
  ],
  experiences: [
    {
      id: 'exp-1',
      company: 'Intracode IT Solutions',
      position: 'Fullstack Developer and QA Lead',
      location: 'On-site',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2026-01-01'),
      current: false,
      description: [
        'Developed and maintained full-stack web applications using modern technologies',
        'Led quality assurance efforts to ensure code quality and user satisfaction',
        'Collaborated with team members to deliver scalable solutions'
      ],
      technologies: ['React.js', 'Express.js', 'Node.js', 'MongoDB', 'Git/GitHub']
    }
  ],
  educations: [
    {
      id: 'edu-elem-1',
      institution: 'San Esteban South Central School',
      degree: 'Elementary',
      field: 'Primary Education',
      startDate: new Date('2010-06-01'),
      endDate: new Date('2011-03-31'),
      current: false,
      location: 'Philippines'
    },
    {
      id: 'edu-elem-2',
      institution: 'Escuela De Sophia of Caloocan Inc',
      degree: 'Elementary',
      field: 'Primary Education',
      startDate: new Date('2011-06-01'),
      endDate: new Date('2015-03-31'),
      current: false,
      location: 'Caloocan City'
    },
    {
      id: 'edu-elem-3',
      institution: 'Bagumbong Elementary School',
      degree: 'Elementary',
      field: 'Primary Education',
      startDate: new Date('2015-06-01'),
      endDate: new Date('2016-03-31'),
      current: false,
      location: 'Caloocan City'
    },
    {
      id: 'edu-high-1',
      institution: 'San Esteban National High School',
      degree: 'High School',
      field: 'Secondary Education',
      startDate: new Date('2016-06-01'),
      endDate: new Date('2017-03-31'),
      current: false,
      location: 'Philippines'
    },
    {
      id: 'edu-high-2',
      institution: 'Bagumbong High School',
      degree: 'High School',
      field: 'Secondary Education',
      startDate: new Date('2017-06-01'),
      endDate: new Date('2020-03-31'),
      current: false,
      location: 'Caloocan City'
    },
    {
      id: 'edu-shs',
      institution: 'St Clare College',
      degree: 'Senior High School',
      field: 'Science, Technology, Engineering, and Mathematics',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2022-03-31'),
      current: false,
      location: 'Philippines'
    },
    {
      id: 'edu-tertiary',
      institution: 'University of Caloocan City - Congressional Campus',
      degree: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      startDate: new Date('2022-08-01'),
      endDate: new Date('2025-05-31'),
      current: true,
      location: 'Caloocan City'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Cuisining',
      description: 'A full-stack MERN application for recipe sharing and culinary exploration. Users can discover, share, and save recipes from around the world.',
      shortDescription: 'MERN recipe sharing platform',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      githubUrl: 'https://github.com/markjamesrafael/cuisining',
      category: 'fullstack',
      featured: true,
      dateCreated: new Date('2024-01-15')
    },
    {
      id: 'proj-2',
      title: 'Math Sprint',
      description: 'Educational mobile game developed with MIT App Inventor that helps children practice arithmetic through engaging gameplay.',
      shortDescription: 'Educational math game',
      technologies: ['MIT App Inventor', 'Mobile Development'],
      githubUrl: 'https://github.com/markjamesrafael/math-sprint',
      category: 'mobile',
      featured: true,
      dateCreated: new Date('2023-08-10')
    },
    {
      id: 'proj-3',
      title: 'RVM IoT',
      description: 'Internet of Things project for Reverse Vending Machhine system that tracks and rewards recycling activities.',
      shortDescription: 'IoT recycling system',
      technologies: ['IoT', 'Arduino', 'Sensors', 'Embedded Systems'],
      githubUrl: 'https://github.com/markjamesrafael/rvm-iot',
      category: 'iot',
      featured: true,
      dateCreated: new Date('2023-11-20')
    },
    {
      id: 'proj-4',
      title: 'MotoTyres',
      description: 'E-commerce platform for motorcycle tires and accessories built with MERN stack. Features product catalog, shopping cart, and payment integration.',
      shortDescription: 'E-commerce motorcycle accessories',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      githubUrl: 'https://github.com/markjamesrafael/mototyres',
      category: 'fullstack',
      featured: true,
      dateCreated: new Date('2024-02-01')
    },
    {
      id: 'proj-5',
      title: 'Bus Fare and Collection System',
      description: 'Desktop application developed in C# for managing bus fare collection, passenger records, and daily transaction reports.',
      shortDescription: 'Bus fare management system',
      technologies: ['C#', '.NET', 'Windows Forms', 'SQL Server'],
      githubUrl: 'https://github.com/markjamesrafael/bus-fare-system',
      category: 'desktop',
      featured: true,
      dateCreated: new Date('2023-10-05')
    }
  ]
};

// ===============================
// 3. UTILITY FUNCTIONS
// ===============================

const formatDate = (date: Date, yearOnly: boolean = false): string => {
  if (yearOnly) {
    return `${date.getFullYear()}`;
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const getDuration = (startDate: Date, endDate?: Date, current: boolean = false): string => {
  const end = current ? new Date() : endDate!;
  const years = end.getFullYear() - startDate.getFullYear();
  const months = end.getMonth() - startDate.getMonth();
  let totalMonths = years * 12 + months;
  if (totalMonths < 0) totalMonths = 0;
  const yearsCount = Math.floor(totalMonths / 12);
  const monthsCount = totalMonths % 12;
  const parts = [];
  if (yearsCount > 0) parts.push(`${yearsCount} ${yearsCount === 1 ? 'year' : 'years'}`);
  if (monthsCount > 0) parts.push(`${monthsCount} ${monthsCount === 1 ? 'month' : 'months'}`);
  return parts.join(' ') || '< 1 month';
};

// ===============================
// 4. REACT COMPONENTS
// ===============================

// Navigation Component
const Navigation: React.FC<{ activeSection: string; setActiveSection: (section: string) => void }> = ({ 
  activeSection, 
  setActiveSection 
}) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];
  
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsNavCollapsed(true);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        <button
          type="button"
          className="navbar-brand fw-bold fs-3 text-primary btn p-0 border-0 bg-transparent"
          onClick={() => handleNavClick('home')}
        >
          raff
        </button>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          aria-expanded={!isNavCollapsed}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {sections.map(section => (
              <li className="nav-item" key={section.id}>
                <button
                  className={`nav-link ${activeSection === section.id ? 'active text-primary fw-bold' : 'text-secondary'}`}
                  onClick={() => handleNavClick(section.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const Hero: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  return (
    <section id="home" className="py-5 bg-gradient section-panel section-home" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '80vh' }}>
      <div className="container h-100">
        <div className="row align-items-center h-100 min-vh-75 py-5">
          <div className="col-lg-12 text-white text-center">
            <h1 className="display-3 fw-bold mb-3">
              Hi, I'm <span className="text-warning">{profile.firstName} {profile.lastName}</span>
            </h1>
            <h2 className="h3 mb-3 fw-normal" style={{ opacity: 0.95 }}>
              Building responsive and scalable web applications
            </h2>
            <p className="lead mb-4 opacity-90 mx-auto" style={{ fontSize: '1.25rem', maxWidth: '800px' }}>
              {profile.bio}
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap mb-4">
              <button className="btn btn-light btn-lg px-4" onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
              }}>
                View Projects
              </button>
              <button className="btn btn-outline-light btn-lg px-4" onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
              }}>
                Contact Me
              </button>
              <a href={profile.resumeUrl} className="btn btn-warning btn-lg px-4 d-inline-flex align-items-center gap-2" download>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.6a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2.6a.5.5 0 0 1 1 0v2.6A1.5 1.5 0 0 1 14.5 14.5h-13A1.5 1.5 0 0 1 0 13v-2.6a.5.5 0 0 1 .5-.5Z"/>
                  <path d="M7.646 10.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.293V1.5a.5.5 0 0 0-1 0v7.793L5.354 7.146a.5.5 0 1 0-.708.708l3 3Z"/>
                </svg>
                Download CV
              </a>
            </div>
            <div className="d-flex gap-3 justify-content-center">
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '48px', height: '48px' }}
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52 0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.53 7.53 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '48px', height: '48px' }}
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 3.9A4.1 4.1 0 1 0 8 12.1 4.1 4.1 0 0 0 8 3.9Zm0 6.8A2.7 2.7 0 1 1 8 5.3a2.7 2.7 0 0 1 0 5.4Z"/>
                    <path d="M12.9 3.7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
                    <path d="M8 1.2c2.2 0 2.5 0 3.4.1.8 0 1.2.2 1.5.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.2.7.3 1.5.1.9.1 1.2.1 3.4s0 2.5-.1 3.4c0 .8-.2 1.2-.3 1.5-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.7.2-1.5.3-.9.1-1.2.1-3.4.1s-2.5 0-3.4-.1c-.8 0-1.2-.2-1.5-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.2-.7-.3-1.5C1.2 10.5 1.2 10.2 1.2 8s0-2.5.1-3.4c0-.8.2-1.2.3-1.5.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.7-.2 1.5-.3C5.5 1.2 5.8 1.2 8 1.2Zm0-1.2C5.8 0 5.5 0 4.5.1c-1 .1-1.6.3-2.2.6-.6.3-1 .6-1.4 1C.5 2.1.2 2.5 0 3.1c-.3.6-.5 1.2-.6 2.2C-.7 6.3-.7 6.6-.7 8.8s0 2.5.1 3.5c.1 1 .3 1.6.6 2.2.3.6.6 1 1 1.4.4.4.8.7 1.4 1 .6.3 1.2.5 2.2.6 1 .1 1.3.1 3.5.1s2.5 0 3.5-.1c1-.1 1.6-.3 2.2-.6.6-.3 1-.6 1.4-1 .4-.4.7-.8 1-1.4.3-.6.5-1.2.6-2.2.1-1 .1-1.3.1-3.5s0-2.5-.1-3.5c-.1-1-.3-1.6-.6-2.2-.3-.6-.6-1-1-1.4-.4-.4-.8-.7-1.4-1-.6-.3-1.2-.5-2.2-.6C10.5 0 10.2 0 8 0Z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.facebook && (
                <a
                  href={profile.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '48px', height: '48px' }}
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a8 8 0 1 0-9.25 7.9V10.3H4.72V8h2.03V6.24c0-2 1.2-3.1 3.03-3.1.88 0 1.8.16 1.8.16v1.98h-1.01c-1 0-1.31.62-1.31 1.26V8h2.23l-.36 2.3H9.26v5.6A8 8 0 0 0 16 8Z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const About: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  return (
    <section id="about" className="py-5 bg-light section-panel section-about">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold">About Me</h2>
          <div className="bg-primary mx-auto" style={{ width: '80px', height: '4px', borderRadius: '2px' }}></div>
        </div>
        <div className="row g-4">
          <div className="col-lg-10 mx-auto">
            <p className="lead mb-4">{profile.bio}</p>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title text-primary mb-3">Personal Information</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2"><strong>Gender:</strong> Male</li>
                      <li className="mb-2"><strong>Age:</strong> 21</li>
                      <li className="mb-2"><strong>Citizenship:</strong> Filipino</li>
                      <li className="mb-2"><strong>Languages:</strong> Tagalog and English</li>
                      <li className="mb-2"><strong>Date of Birth:</strong> September 16, 2003</li>
                      <li className="mb-2"><strong>Place of Birth:</strong> Japan</li>
                      <li className="mb-2"><strong>Civil Status:</strong> Single</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title text-primary mb-3">Qualification Summary</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2"><strong>Full-Stack Development:</strong> Skilled in designing and building responsive, scalable web applications with 2 years of hands-on experience in both front-end and back-end development.</li>
                      <li className="mb-2"><strong>Quality Assurance:</strong> Applied QA practices to validate data integrity and enforce data privacy protocols; improved defect detection rates and streamlined testing workflows.</li>
                      <li className="mb-2"><strong>Technical Versatility:</strong> Proficient in adapting to various frameworks and tools to meet project requirements across diverse environments.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const Skills: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const categories = [
    { name: 'Web Development', key: 'frontend', skills: skills.filter(s => s.category === 'frontend') },
    { name: 'Backend Development', key: 'backend', skills: skills.filter(s => s.category === 'backend') },
    { name: 'Desktop Development', key: 'desktop', skills: skills.filter(s => s.category === 'desktop') },
    { name: 'Mobile Development', key: 'mobile', skills: skills.filter(s => s.category === 'mobile') },
    { name: 'Tools & DevOps', key: 'devops', skills: skills.filter(s => s.category === 'devops') }
  ];
  
  return (
    <section id="skills" className="py-5 section-panel section-skills">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold">Technical Skills</h2>
          <div className="bg-primary mx-auto" style={{ width: '80px', height: '4px', borderRadius: '2px' }}></div>
          <p className="lead mt-3">Technologies I work with</p>
        </div>
        <div className="row g-4">
          {categories.map(category => {
            if (category.skills.length === 0) return null;
            return (
              <div key={category.key} className="col-lg-4 col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h4 className="card-title text-primary mb-3">
                      {category.name}
                    </h4>
                    <div className="row">
                      {category.skills.map(skill => (
                        <div key={skill.id} className="col-12 mb-2">
                          <span className="badge bg-light text-dark p-2 me-2 mb-1 d-inline-block">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Education Section
const Education: React.FC<{ educations: Education[]; experiences: Experience[] }> = ({ educations, experiences }) => {
  const elementarySchools = educations.filter(e => e.degree === 'Elementary');
  const highSchools = educations.filter(e => e.degree === 'High School');
  const seniorHigh = educations.filter(e => e.degree === 'Senior High School');
  const tertiary = educations.filter(e => e.degree === 'Bachelor of Science in Computer Science');
  
  return (
    <section id="education" className="py-5 bg-light section-panel section-education">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold">Education & Experience</h2>
          <div className="bg-primary mx-auto" style={{ width: '80px', height: '4px', borderRadius: '2px' }}></div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h3 className="mb-4 text-primary">🎓 Education</h3>
            
            <div className="mb-4">
              <h5 className="fw-bold">Tertiary</h5>
              {tertiary.map(edu => (
                <div key={edu.id} className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h6 className="card-title mb-0">{edu.institution}</h6>
                    <p className="text-muted mb-1">{edu.field}</p>
                    <small className="education-year fw-semibold">{formatDate(edu.startDate, true)} - {edu.current ? 'Present' : formatDate(edu.endDate!, true)}</small>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <h5 className="fw-bold">Senior High School</h5>
              {seniorHigh.map(edu => (
                <div key={edu.id} className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h6 className="card-title mb-0">{edu.institution}</h6>
                    <p className="text-muted mb-1">{edu.field}</p>
                    <small className="education-year fw-semibold">{formatDate(edu.startDate, true)} - {formatDate(edu.endDate!, true)}</small>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <h5 className="fw-bold">High School</h5>
              {highSchools.map(edu => (
                <div key={edu.id} className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h6 className="card-title mb-0">{edu.institution}</h6>
                    <small className="education-year fw-semibold">{formatDate(edu.startDate, true)} - {formatDate(edu.endDate!, true)}</small>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <h5 className="fw-bold">Elementary</h5>
              {elementarySchools.map(edu => (
                <div key={edu.id} className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h6 className="card-title mb-0">{edu.institution}</h6>
                    <small className="education-year fw-semibold">{formatDate(edu.startDate, true)} - {formatDate(edu.endDate!, true)}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-lg-6">
            <h3 className="mb-4 text-primary">💼 Work Experience</h3>
            {experiences.map(exp => (
              <div key={exp.id} className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="card-title mb-0">{exp.position}</h5>
                      <h6 className="text-primary">{exp.company}</h6>
                    </div>
                    <span className="badge bg-primary">
                      {exp.current ? 'Applying' : formatDate(exp.startDate, true) + ' - ' + formatDate(exp.endDate!, true)}
                    </span>
                  </div>
                  <ul className="list-unstyled mt-2">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="mb-2">✓ {desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  
  const filteredProjects = projects.filter(project => {
    return filter === 'all' || project.category === filter;
  });
  
  const categories = ['all', 'fullstack', 'mobile', 'iot', 'desktop'];
  
  return (
    <section id="projects" className="py-5 section-panel section-projects">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold">Featured Projects</h2>
          <div className="bg-primary mx-auto" style={{ width: '80px', height: '4px', borderRadius: '2px' }}></div>
          <p className="lead mt-3">Some of my best work</p>
        </div>
        <div className="row mb-4">
          <div className="col-md-8 mx-auto">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                >
                  {cat === 'all' ? 'All Projects' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row g-4">
          {filteredProjects.map(project => (
            <div key={project.id} className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100 hover-shadow">
                <div className="card-body">
                  {project.featured && (
                    <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3">
                      Featured
                    </span>
                  )}
                  <h3 className="card-title h4 mb-2">{project.title}</h3>
                  <p className="card-text text-muted">{project.shortDescription}</p>
                  <div className="mb-3">
                    {project.technologies.map(tech => (
                      <span key={tech} className="badge bg-light text-dark me-1 mb-1 p-2">{tech}</span>
                    ))}
                  </div>
                  <div className="d-flex gap-2 align-items-center flex-wrap">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live Demo</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  return (
    <section id="contact" className="py-5 bg-light section-panel section-contact">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold">Get In Touch</h2>
          <div className="bg-primary mx-auto" style={{ width: '80px', height: '4px', borderRadius: '2px' }}></div>
          <p className="lead mt-3">Let's connect</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="mb-4">Contact Information</h3>
                <div className="mb-4">
                  <div className="d-flex mb-3 align-items-start">
                    <div className="me-3 contact-info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-white" aria-hidden="true">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.2L8 9 0 4.2V4Z"/>
                        <path d="M0 5.4V12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4L8.4 10.2a1 1 0 0 1-.8 0L0 5.4Z"/>
                      </svg>
                    </div>
                    <div>
                      <h6 className="mb-0">Email</h6>
                      <p className="mb-0 text-muted">rafael.markjames.bscs2022@gmail.com</p>
                    </div>
                  </div>
                  <div className="d-flex mb-3 align-items-start">
                    <div className="me-3 contact-info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-white" aria-hidden="true">
                        <path d="M4 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm0-1h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Z"/>
                        <path d="M8 13.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"/>
                      </svg>
                    </div>
                    <div>
                      <h6 className="mb-0">Phone</h6>
                      <p className="mb-0 text-muted">+639665494046</p>
                    </div>
                  </div>
                  <div className="d-flex mb-3 align-items-start">
                    <div className="me-3 contact-info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-white" aria-hidden="true">
                        <path d="M8 16s6-5.7 6-10A6 6 0 1 0 2 6c0 4.3 6 10 6 10Zm0-7.5A2.5 2.5 0 1 1 8 3a2.5 2.5 0 0 1 0 5.5Z"/>
                      </svg>
                    </div>
                    <div>
                      <h6 className="mb-0">Location</h6>
                      <p className="mb-0 text-muted">Blk 1 Lot 21 Tierra Nova Royale I Brgy. 171, Caloocan City</p>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <h6 className="mb-3">Follow Me</h6>
                  <div className="d-flex gap-2">
                    <a
                      href="https://github.com/Mjamesss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '44px', height: '44px' }}
                      aria-label="GitHub"
                      title="GitHub"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52 0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.53 7.53 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/m_fffyyy_?igsh=MXJteDQ3cndsY2l0dA%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '44px', height: '44px' }}
                      aria-label="Instagram"
                      title="Instagram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M8 3.9A4.1 4.1 0 1 0 8 12.1 4.1 4.1 0 0 0 8 3.9Zm0 6.8A2.7 2.7 0 1 1 8 5.3a2.7 2.7 0 0 1 0 5.4Z"/>
                        <path d="M12.9 3.7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
                        <path d="M8 1.2c2.2 0 2.5 0 3.4.1.8 0 1.2.2 1.5.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.2.7.3 1.5.1.9.1 1.2.1 3.4s0 2.5-.1 3.4c0 .8-.2 1.2-.3 1.5-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.7.2-1.5.3-.9.1-1.2.1-3.4.1s-2.5 0-3.4-.1c-.8 0-1.2-.2-1.5-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.2-.7-.3-1.5C1.2 10.5 1.2 10.2 1.2 8s0-2.5.1-3.4c0-.8.2-1.2.3-1.5.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.7-.2 1.5-.3C5.5 1.2 5.8 1.2 8 1.2Z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/thekarinamontage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '44px', height: '44px' }}
                      aria-label="Facebook"
                      title="Facebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M16 8a8 8 0 1 0-9.25 7.9V10.3H4.72V8h2.03V6.24c0-2 1.2-3.1 3.03-3.1.88 0 1.8.16 1.8.16v1.98h-1.01c-1 0-1.31.62-1.31 1.26V8h2.23l-.36 2.3H9.26v5.6A8 8 0 0 0 16 8Z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                {submitted && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Message sent successfully! I'll get back to you soon.
                    <button type="button" className="btn-close" onClick={() => setSubmitted(false)}></button>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Subject *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Your Message *</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="text-center">
          <p className="text-muted mb-0">© 2024 Mark James Rafael. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// ===============================
// 5. MAIN APP COMPONENT
// ===============================

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  const profile = useMemo(() => portfolioData.userProfile, []);
  const skills = useMemo(() => portfolioData.skills, []);
  const experiences = useMemo(() => portfolioData.experiences, []);
  const educations = useMemo(() => portfolioData.educations, []);
  const projects = useMemo(() => portfolioData.projects, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body {
        background: #0f0f0f;
        color: #f3f3f3;
      }

      .dark-portfolio {
        background: #0f0f0f;
        color: #f3f3f3;
      }

      .dark-portfolio .navbar {
        background: rgba(20, 20, 20, 0.92) !important;
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .dark-portfolio .navbar-brand,
      .dark-portfolio .nav-link {
        color: #f5f5f5 !important;
      }

      .dark-portfolio .nav-link.text-secondary {
        color: #9e9e9e !important;
      }

      .dark-portfolio .nav-link.active {
        color: #ffffff !important;
      }

      .dark-portfolio .bg-light {
        background: #111111 !important;
      }

      .dark-portfolio section {
        position: relative;
      }

      .dark-portfolio .card {
        background: #1a1a1a !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-radius: 18px !important;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35) !important;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }

      .dark-portfolio .card h1,
      .dark-portfolio .card h2,
      .dark-portfolio .card h3,
      .dark-portfolio .card h4,
      .dark-portfolio .card h5,
      .dark-portfolio .card h6 {
        color: #ffffff !important;
      }

      .dark-portfolio .card p,
      .dark-portfolio .card li,
      .dark-portfolio .text-muted {
        color: #b8b8b8 !important;
      }

      .hover-shadow:hover,
      .dark-portfolio .card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 36px rgba(0, 0, 0, 0.5) !important;
      }

      .dark-portfolio .badge.bg-light {
        background: #2a2a2a !important;
        color: #e5e5e5 !important;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .dark-portfolio .btn-light {
        background: #ffffff;
        color: #121212;
        border-color: #ffffff;
      }

      .dark-portfolio .btn-outline-light {
        color: #f3f3f3;
        border-color: rgba(255, 255, 255, 0.55);
      }

      .dark-portfolio .btn-warning {
        color: #111 !important;
        font-weight: 600;
      }

      .dark-portfolio .btn-outline-primary {
        color: #8ab4ff;
        border-color: #345ea8;
      }

      .dark-portfolio .btn-outline-primary:hover {
        background: #2b4f8e;
        border-color: #2b4f8e;
      }

      .dark-portfolio .form-control,
      .dark-portfolio textarea {
        background: #141414 !important;
        border: 1px solid rgba(255, 255, 255, 0.12) !important;
        color: #f5f5f5 !important;
      }

      .dark-portfolio .form-label,
      .dark-portfolio label {
        color: #e8e8e8 !important;
        font-weight: 500;
      }

      .dark-portfolio .education-year {
        color: #f1f1f1 !important;
      }

      .dark-portfolio .form-control::placeholder,
      .dark-portfolio textarea::placeholder {
        color: #8f8f8f !important;
      }

      .dark-portfolio .form-control:focus,
      .dark-portfolio textarea:focus {
        box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
        border-color: #667eea !important;
      }

      .dark-portfolio .alert-info {
        background: rgba(102, 126, 234, 0.12);
        border-color: rgba(102, 126, 234, 0.25);
        color: #dbe6ff;
      }

      .dark-portfolio footer {
        background: #0b0b0b !important;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .dark-portfolio .text-primary {
        color: #7aa2ff !important;
      }

      .dark-portfolio .bg-primary {
        background-color: #3f68c5 !important;
      }

      .dark-portfolio .hero-social a {
        border: 1px solid rgba(255, 255, 255, 0.15);
      }

      .dark-portfolio .container {
        max-width: 1160px;
      }

      .dark-portfolio .display-3,
      .dark-portfolio .display-4 {
        letter-spacing: -0.5px;
      }

      .dark-portfolio .lead {
        line-height: 1.7;
      }

      .dark-portfolio .navbar {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35) !important;
      }

      .dark-portfolio .navbar .nav-link {
        font-weight: 500;
      }

      .dark-portfolio .btn {
        border-radius: 10px;
        font-weight: 600;
      }

      .dark-portfolio .card-body {
        padding: 1.4rem 1.4rem;
      }

      .dark-portfolio .section-panel {
        padding-top: 5.5rem !important;
        padding-bottom: 5.5rem !important;
      }

      .dark-portfolio .section-panel .text-center.mb-5 {
        margin-bottom: 3.2rem !important;
      }

      .dark-portfolio .section-panel .display-4 {
        font-size: clamp(2rem, 3.5vw, 2.8rem);
      }

      .dark-portfolio .section-about {
        background: linear-gradient(180deg, #101114 0%, #111317 100%) !important;
      }

      .dark-portfolio .section-skills {
        background: linear-gradient(180deg, #0d0f14 0%, #10131a 100%) !important;
      }

      .dark-portfolio .section-education {
        background: linear-gradient(180deg, #101218 0%, #11141a 100%) !important;
      }

      .dark-portfolio .section-projects {
        background: linear-gradient(180deg, #0e1117 0%, #10131a 100%) !important;
      }

      .dark-portfolio .section-contact {
        background: linear-gradient(180deg, #111216 0%, #0f1116 100%) !important;
      }

      .dark-portfolio .section-about .card,
      .dark-portfolio .section-education .card {
        border-left: 2px solid rgba(122, 162, 255, 0.35) !important;
      }

      .dark-portfolio .section-projects .card {
        border-top: 2px solid rgba(244, 180, 0, 0.45) !important;
      }

      .dark-portfolio .section-skills .badge {
        border-radius: 8px !important;
      }

      .dark-portfolio .section-contact .card {
        background: #181b22 !important;
      }

      .dark-portfolio .contact-info-icon {
        width: 22px;
        height: 22px;
        color: #9ec0ff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 4px;
        flex-shrink: 0;
      }

      .dark-portfolio .contact-info-icon .text-white {
        color: inherit !important;
      }

      .dark-portfolio #home {
        background: radial-gradient(circle at top right, #2a3f7e 0%, #131a2f 42%, #0d1018 100%) !important;
      }

      .dark-portfolio #home .btn-warning {
        background: #f4b400;
        border-color: #f4b400;
      }

      .dark-portfolio #projects .card-title {
        font-size: 1.2rem;
      }

      .dark-portfolio .education-year {
        font-size: 0.92rem;
        letter-spacing: 0.2px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="App dark-portfolio">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Education educations={educations} experiences={experiences} />
      <Projects projects={projects} />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
