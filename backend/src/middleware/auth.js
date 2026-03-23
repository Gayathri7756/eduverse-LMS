import { auth } from '../firebase.js'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    if (!auth) {
      // Firebase not configured - extract uid from JWT token (for development/testing)
      try {
        const parts = token.split('.')
        if (parts.length === 3) {
          // Decode JWT payload
          const decoded = JSON.parse(Buffer.from(parts[1], 'base64').toString())
          console.log('Token decoded (Firebase not configured):', decoded)
          console.log('Available fields:', Object.keys(decoded))
          
          // Firebase tokens use 'sub' for user ID, but also have 'uid' in custom claims
          // Try different field names
          const uid = decoded.uid || decoded.sub || decoded.user_id
          if (!uid) {
            console.error('No uid found in token. Available fields:', Object.keys(decoded))
            return res.status(401).json({ error: 'Invalid token - no user ID found' })
          }
          
          req.user = { ...decoded, uid }
          console.log('User set to:', req.user.uid)
          return next()
        }
      } catch (e) {
        console.error('Failed to decode token:', e.message)
      }
      // If we can't decode, reject
      return res.status(401).json({ error: 'Invalid token format' })
    }

    const decodedToken = await auth.verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    console.error('Token verification error:', error.message)
    res.status(401).json({ error: 'Invalid token' })
  }
}

export const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}
