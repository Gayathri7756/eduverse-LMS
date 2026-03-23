/**
 * Password encoding/decoding utilities for backend
 * Note: For production, use bcrypt or argon2 instead of Base64
 */

/**
 * Encode password using Base64
 * @param {string} password - Plain text password
 * @returns {string} - Base64 encoded password
 */
export const encodePassword = (password) => {
  return Buffer.from(password).toString('base64')
}

/**
 * Decode password from Base64
 * @param {string} encodedPassword - Base64 encoded password
 * @returns {string} - Plain text password
 */
export const decodePassword = (encodedPassword) => {
  return Buffer.from(encodedPassword, 'base64').toString('utf-8')
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result
 */
export const validatePassword = (password) => {
  const result = {
    isValid: true,
    message: '',
    strength: 'weak'
  }

  if (password.length < 8) {
    result.isValid = false
    result.message = 'Password must be at least 8 characters long'
    result.strength = 'weak'
    return result
  }

  if (password.length < 12) {
    result.strength = 'medium'
  } else if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
    result.strength = 'strong'
  }

  return result
}
