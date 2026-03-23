import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ResumeBuilder() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const [completedCourses, setCompletedCourses] = useState([])
  const [activeTab, setActiveTab] = useState('personal')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certificates: []
  })

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(`token_${user?.uid}`)
        const resumeResponse = await axios.get('http://localhost:5000/api/resume', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setResumeData(resumeResponse.data.resume)
        setFormData(resumeResponse.data.resume)

        const coursesResponse = await axios.get('http://localhost:5000/api/enrollments/completed', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCompletedCourses(coursesResponse.data.courses || [])
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }
    if (user?.uid) fetchData()
  }, [user?.uid])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveResume = async () => {
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      const response = await axios.put('http://localhost:5000/api/resume', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setResumeData(response.data.resume)
      alert('Resume updated successfully!')
    } catch (err) {
      console.error('Error saving resume:', err)
      alert('Failed to save resume')
    }
  }

  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', field: '', startDate: '', endDate: '', description: '' }]
    }))
  }

  const handleUpdateEducation = (idx, field, value) => {
    const updated = [...formData.education]
    updated[idx][field] = value
    setFormData(prev => ({ ...prev, education: updated }))
  }

  const handleRemoveEducation = (idx) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx)
    }))
  }

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    }))
  }

  const handleUpdateExperience = (idx, field, value) => {
    const updated = [...formData.experience]
    updated[idx][field] = value
    setFormData(prev => ({ ...prev, experience: updated }))
  }

  const handleRemoveExperience = (idx) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx)
    }))
  }

  const handleAddSkill = () => {
    const skill = prompt('Enter skill name:')
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }))
    }
  }

  const handleRemoveSkill = (idx) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx)
    }))
  }

  const handleAddCourse = async (course) => {
    try {
      const token = localStorage.getItem(`token_${user?.uid}`)
      const skillsMap = {
        'Machine Learning': ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
        'Web Development': ['React', 'Node.js', 'JavaScript', 'HTML/CSS', 'REST APIs'],
        'Python Programming': ['Python', 'OOP', 'Data Structures', 'Algorithms'],
        'Data Science': ['Python', 'Data Analysis', 'Pandas', 'NumPy', 'Matplotlib'],
        'React.js': ['React', 'JavaScript', 'Frontend Development', 'State Management'],
        'Node.js': ['Node.js', 'Express', 'Backend Development', 'REST APIs'],
        'Cloud Computing': ['AWS', 'Cloud Architecture', 'DevOps', 'Docker'],
        'Mobile Development': ['React Native', 'Mobile Apps', 'Cross-platform'],
        'UI/UX Design': ['UI Design', 'UX Design', 'Figma', 'Prototyping'],
        'Digital Marketing': ['SEO', 'Content Marketing', 'Social Media', 'Analytics']
      }
      const skills = skillsMap[course.title] || []
      const response = await axios.post('http://localhost:5000/api/resume/add-course', 
        { course, skills },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResumeData(response.data.resume)
      setFormData(response.data.resume)
      alert(`${course.title} added to your resume!`)
    } catch (err) {
      console.error('Error adding course:', err)
      alert('Failed to add course to resume')
    }
  }

  const handleDownloadPDF = async () => {
    if (!resumeData) return
    setGeneratingPDF(true)
    try {
      const { jsPDF } = await import('jspdf')
      const html2canvas = (await import('html2canvas')).default
      const element = document.getElementById('resume-content')
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= 297
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }
      pdf.save(`${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`)
      alert('Resume downloaded successfully!')
    } catch (err) {
      console.error('Error generating PDF:', err)
      alert('Failed to generate PDF')
    } finally {
      setGeneratingPDF(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-2 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-slate-400">Loading your resume...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">📄 Professional Resume Builder</h1>
          <p className="text-xl text-slate-400">Create and manage your professional resume</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Edit Form */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-4 max-h-[90vh] overflow-y-auto border border-white/8">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Edit Resume</h2>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {['personal', 'education', 'experience', 'skills', 'projects', 'certificates'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                      activeTab === tab
                        ? 'glass-dark text-slate-100 border border-primary-400/30'
                        : 'glass text-slate-100 hover:shadow-md border border-white/8'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Personal Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Professional Summary</label>
                    <textarea name="summary" value={formData.summary} onChange={handleInputChange} rows="4" className="w-full px-4 py-2 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-4">
                  {formData.education.map((edu, idx) => (
                    <div key={idx} className="glass rounded-xl p-4 space-y-3 border border-white/8">
                      <input type="text" placeholder="School/University" value={edu.school} onChange={(e) => handleUpdateEducation(idx, 'school', e.target.value)} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleUpdateEducation(idx, 'degree', e.target.value)} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <input type="text" placeholder="Field of Study" value={edu.field} onChange={(e) => handleUpdateEducation(idx, 'field', e.target.value)} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Start Date" value={edu.startDate} onChange={(e) => handleUpdateEducation(idx, 'startDate', e.target.value)} className="px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                        <input type="text" placeholder="End Date" value={edu.endDate} onChange={(e) => handleUpdateEducation(idx, 'endDate', e.target.value)} className="px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      </div>
                      <textarea placeholder="Description" value={edu.description} onChange={(e) => handleUpdateEducation(idx, 'description', e.target.value)} rows="2" className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <button onClick={() => handleRemoveEducation(idx)} className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700">Remove</button>
                    </div>
                  ))}
                  <button onClick={handleAddEducation} className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600">+ Add Education</button>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  {formData.experience.map((exp, idx) => (
                    <div key={idx} className="glass rounded-xl p-4 space-y-3 border border-white/8">
                      <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <input type="text" placeholder="Position" value={exp.position} onChange={(e) => handleUpdateExperience(idx, 'position', e.target.value)} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleUpdateExperience(idx, 'startDate', e.target.value)} className="px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                        <input type="text" placeholder="End Date" value={exp.endDate} onChange={(e) => handleUpdateExperience(idx, 'endDate', e.target.value)} className="px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      </div>
                      <textarea placeholder="Description" value={exp.description} onChange={(e) => handleUpdateExperience(idx, 'description', e.target.value)} rows="2" className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <button onClick={() => handleRemoveExperience(idx)} className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700">Remove</button>
                    </div>
                  ))}
                  <button onClick={handleAddExperience} className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600">+ Add Experience</button>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, idx) => (
                      <div key={idx} className="glass text-slate-100 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 border border-white/8">
                        {skill}
                        <button onClick={() => handleRemoveSkill(idx)} className="text-red-600 hover:text-red-700 font-bold">✕</button>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleAddSkill} className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600">+ Add Skill</button>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {formData.projects.map((proj, idx) => (
                    <div key={idx} className="glass rounded-xl p-4 space-y-3 border border-white/8">
                      <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => {
                        const updated = [...formData.projects]
                        updated[idx].title = e.target.value
                        setFormData(prev => ({ ...prev, projects: updated }))
                      }} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <textarea placeholder="Project Description" value={proj.description} onChange={(e) => {
                        const updated = [...formData.projects]
                        updated[idx].description = e.target.value
                        setFormData(prev => ({ ...prev, projects: updated }))
                      }} rows="2" className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <input type="text" placeholder="Technologies Used" value={proj.technologies?.join(', ') || ''} onChange={(e) => {
                        const updated = [...formData.projects]
                        updated[idx].technologies = e.target.value.split(',').map(t => t.trim())
                        setFormData(prev => ({ ...prev, projects: updated }))
                      }} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <input type="text" placeholder="Date (e.g., Jan 2024)" value={proj.date} onChange={(e) => {
                        const updated = [...formData.projects]
                        updated[idx].date = e.target.value
                        setFormData(prev => ({ ...prev, projects: updated }))
                      }} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <button onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          projects: prev.projects.filter((_, i) => i !== idx)
                        }))
                      }} className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700">Remove</button>
                    </div>
                  ))}
                  <button onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      projects: [...prev.projects, { title: '', description: '', technologies: [], date: '' }]
                    }))
                  }} className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600">+ Add Project</button>
                </div>
              )}

              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <div className="space-y-4">
                  {formData.certificates.map((cert, idx) => (
                    <div key={idx} className="glass rounded-xl p-4 space-y-3 border border-white/8">
                      <input type="text" placeholder="Certificate Name" value={cert.name} onChange={(e) => {
                        const updated = [...formData.certificates]
                        updated[idx].name = e.target.value
                        setFormData(prev => ({ ...prev, certificates: updated }))
                      }} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <input type="text" placeholder="Issuing Organization" value={cert.issuer} onChange={(e) => {
                        const updated = [...formData.certificates]
                        updated[idx].issuer = e.target.value
                        setFormData(prev => ({ ...prev, certificates: updated }))
                      }} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <input type="text" placeholder="Date Obtained (e.g., Jan 2024)" value={cert.date} onChange={(e) => {
                        const updated = [...formData.certificates]
                        updated[idx].date = e.target.value
                        setFormData(prev => ({ ...prev, certificates: updated }))
                      }} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <input type="text" placeholder="Certificate ID (Optional)" value={cert.id || ''} onChange={(e) => {
                        const updated = [...formData.certificates]
                        updated[idx].id = e.target.value
                        setFormData(prev => ({ ...prev, certificates: updated }))
                      }} className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-100 placeholder-slate-500 bg-white/5" />
                      <button onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          certificates: prev.certificates.filter((_, i) => i !== idx)
                        }))
                      }} className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700">Remove</button>
                    </div>
                  ))}
                  <button onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      certificates: [...prev.certificates, { name: '', issuer: '', date: '', id: '' }]
                    }))
                  }} className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600">+ Add Certificate</button>
                </div>
              )}

              <button onClick={handleSaveResume} className="w-full mt-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold py-3 rounded-lg hover:from-primary-500 hover:to-primary-600 transition">💾 Save All Changes</button>

              {/* Completed Courses Section */}
              {completedCourses.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/8">
                  <h3 className="font-bold text-slate-100 mb-3">Add Completed Courses</h3>
                  <div className="space-y-2">
                    {completedCourses.map((course) => {
                      const isAdded = resumeData?.completedCourses?.some(c => c.id === course.id)
                      return (
                        <button
                          key={course.id}
                          onClick={() => !isAdded && handleAddCourse(course)}
                          disabled={isAdded}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition ${
                            isAdded
                              ? 'glass-dark text-slate-100 cursor-not-allowed border border-primary-400/30'
                              : 'glass text-slate-100 hover:shadow-md border border-white/8'
                          }`}
                        >
                          {isAdded ? '✓ ' : '+ '}{course.title}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Resume Preview */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl overflow-hidden border border-white/8">
              <div id="resume-content" className="bg-white/40 p-12">
                {/* Header */}
                <div className="text-center mb-8 pb-8 border-b-2 border-primary-300/30">
                  <h1 className="text-4xl font-bold text-slate-100 mb-2">{resumeData?.name}</h1>
                  <div className="flex justify-center gap-4 text-slate-400 text-sm flex-wrap">
                    <span>📧 {resumeData?.email}</span>
                    <span>📱 {resumeData?.phone}</span>
                    <span>📍 {resumeData?.location}</span>
                  </div>
                </div>

                {/* Professional Summary */}
                {resumeData?.summary && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-100 mb-3">Professional Summary</h2>
                    <p className="text-slate-200 leading-relaxed">{resumeData.summary}</p>
                  </div>
                )}

                {/* Education */}
                {resumeData?.education && resumeData.education.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">Education</h2>
                    <div className="space-y-4">
                      {resumeData.education.map((edu, idx) => (
                        <div key={idx} className="border-l-4 border-primary-600 pl-4">
                          <h3 className="font-bold text-slate-100">{edu.degree} in {edu.field}</h3>
                          <p className="text-slate-200">{edu.school}</p>
                          <p className="text-slate-400 text-sm">{edu.startDate} - {edu.endDate}</p>
                          {edu.description && <p className="text-slate-200 text-sm mt-2">{edu.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {resumeData?.experience && resumeData.experience.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">Professional Experience</h2>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp, idx) => (
                        <div key={idx} className="border-l-4 border-secondary-600 pl-4">
                          <h3 className="font-bold text-slate-100">{exp.position}</h3>
                          <p className="text-slate-200">{exp.company}</p>
                          <p className="text-slate-400 text-sm">{exp.startDate} - {exp.endDate}</p>
                          {exp.description && <p className="text-slate-200 text-sm mt-2">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {resumeData?.skills && resumeData.skills.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">Technical Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, idx) => (
                        <span key={idx} className="glass text-slate-100 px-4 py-2 rounded-full text-sm font-semibold border border-white/8">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {resumeData?.projects && resumeData.projects.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">Projects</h2>
                    <div className="space-y-4">
                      {resumeData.projects.map((proj, idx) => (
                        <div key={idx} className="border-l-4 border-accent-600 pl-4">
                          <h3 className="font-bold text-slate-100">{proj.title}</h3>
                          <p className="text-slate-200 text-sm mt-1">{proj.description}</p>
                          {proj.technologies && proj.technologies.length > 0 && (
                            <p className="text-slate-400 text-xs mt-2">Technologies: {proj.technologies.join(', ')}</p>
                          )}
                          <p className="text-slate-400 text-xs mt-2">{proj.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certificates */}
                {resumeData?.certificates && resumeData.certificates.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">Certifications</h2>
                    <div className="space-y-3">
                      {resumeData.certificates.map((cert, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="text-primary-400 font-bold">✓</span>
                          <div>
                            <p className="font-semibold text-slate-100">{cert.name}</p>
                            <p className="text-slate-200 text-sm">{cert.issuer} • {cert.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <div className="glass-secondary px-12 py-6 border-t border-white/8">
                <button
                  onClick={handleDownloadPDF}
                  disabled={generatingPDF}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg hover:shadow-lg disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {generatingPDF ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      📥 Download Resume as PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
