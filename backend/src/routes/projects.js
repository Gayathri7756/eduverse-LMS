// projects.js
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { db } from '../utils/inMemoryDb.js';

const router = express.Router();

// Get all projects for a user
router.get('/my-projects', verifyToken, (req, res) => {
  try {
    const userId = req.user.uid;
    const projects = db.projects.filter(p => p.userId === userId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project
router.get('/:projectId', verifyToken, (req, res) => {
  try {
    const project = db.projects.find(p => p.id === req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.userId !== req.user.uid) return res.status(403).json({ error: 'Unauthorized' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create project
router.post('/', verifyToken, (req, res) => {
  try {
    const { title, description, skills, technologies, startDate, endDate, status } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Title and description required' });

    const project = {
      id: `project_${Date.now()}`,
      userId: req.user.uid,
      title,
      description,
      skills: skills || [],
      technologies: technologies || [],
      startDate,
      endDate,
      status: status || 'in-progress',
      linkedCourses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.projects.push(project);

    // Auto-link courses
    project.linkedCourses = autoLinkCourses(project);

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.put('/:projectId', verifyToken, (req, res) => {
  try {
    const project = db.projects.find(p => p.id === req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.userId !== req.user.uid) return res.status(403).json({ error: 'Unauthorized' });

    const { title, description, skills, technologies, startDate, endDate, status } = req.body;

    if (title) project.title = title;
    if (description) project.description = description;
    if (skills) project.skills = skills;
    if (technologies) project.technologies = technologies;
    if (startDate) project.startDate = startDate;
    if (endDate) project.endDate = endDate;
    if (status) project.status = status;

    project.updatedAt = new Date().toISOString();
    project.linkedCourses = autoLinkCourses(project);

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project
router.delete('/:projectId', verifyToken, (req, res) => {
  try {
    const index = db.projects.findIndex(p => p.id === req.params.projectId);
    if (index === -1) return res.status(404).json({ error: 'Project not found' });

    const project = db.projects[index];
    if (project.userId !== req.user.uid) return res.status(403).json({ error: 'Unauthorized' });

    db.projects.splice(index, 1);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to auto-link courses
function autoLinkCourses(project) {
  const skillKeywords = (project.skills || []).map(s => s.toLowerCase());
  const techKeywords = (project.technologies || []).map(t => t.toLowerCase());
  const allKeywords = [...skillKeywords, ...techKeywords];

  return db.courses
    .filter(course => {
      const courseTitle = course.title.toLowerCase();
      const courseDesc = (course.description || '').toLowerCase();
      const courseCategory = (course.category || '').toLowerCase();

      return allKeywords.some(keyword =>
        courseTitle.includes(keyword) ||
        courseDesc.includes(keyword) ||
        courseCategory.includes(keyword)
      );
    })
    .map(course => ({
      id: course.id,
      title: course.title,
      category: course.category,
    }));
}

export default router;