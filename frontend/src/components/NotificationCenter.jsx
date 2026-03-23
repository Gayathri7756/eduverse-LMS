import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function NotificationCenter() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNotifications()
    // Refresh notifications every 5 minutes
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [user])

  const fetchNotifications = async () => {
    if (!user) return
    try {
      setLoading(true)
      const token = localStorage.getItem(`token_${user.uid}`)
      const response = await axios.get(
        'http://localhost:5000/api/progress/notifications',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setNotifications(response.data)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-50/40 border-red-300/40 text-red-900'
      case 'high':
        return 'bg-orange-50/40 border-orange-300/40 text-orange-900'
      case 'medium':
        return 'bg-yellow-50/40 border-yellow-300/40 text-yellow-900'
      case 'low':
        return 'bg-blue-50/40 border-blue-300/40 text-blue-900'
      default:
        return 'bg-white/5 border-white/30 text-slate-100'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return '🔴'
      case 'high':
        return '🟠'
      case 'medium':
        return '🟡'
      case 'low':
        return '🔵'
      default:
        return '⚪'
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'video':
        return '🎥'
      case 'quiz':
        return '📝'
      case 'assignment':
        return '📋'
      case 'assignment_overdue':
        return '⚠️'
      default:
        return '📢'
    }
  }

  const unreadCount = notifications.length

  const openNotification = (notif) => {
    const focus =
      notif.type === 'quiz' ? 'quizzes' : notif.type === 'assignment' || notif.type === 'assignment_overdue' ? 'assignments' : 'videos'

    setShowDropdown(false)
    navigate(`/course/${notif.courseId}/player?focus=${focus}`)
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-slate-400 hover:text-slate-100 transition"
        title="Notifications"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 glass-panel shadow-2xl z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 glass-dark text-slate-100 p-4 flex justify-between items-center border-b border-white/20">
            <h3 className="font-semibold">Notifications</h3>
            <button
              onClick={() => setShowDropdown(false)}
              className="text-slate-400 hover:text-slate-100"
            >
              ✕
            </button>
          </div>

          {/* Notifications List */}
          {loading ? (
            <div className="p-4 text-center text-primary-400">
              <p>Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-primary-400">
              <p>No notifications</p>
              <p className="text-xs mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => openNotification(notif)}
                  className={`w-full text-left p-4 border-l-4 ${getPriorityColor(notif.priority)} hover:bg-white/15 transition`}
                  style={{
                    borderLeftColor:
                      notif.priority === 'critical'
                        ? '#dc2626'
                        : notif.priority === 'high'
                        ? '#ea580c'
                        : notif.priority === 'medium'
                        ? '#ca8a04'
                        : '#2563eb'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{getNotificationIcon(notif.type)}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{notif.courseName}</p>
                      <p className="text-sm mt-1">{notif.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs">{getPriorityIcon(notif.priority)}</span>
                        <span className="text-xs font-semibold uppercase">
                          {notif.priority}
                        </span>
                        <span className="ml-auto text-xs text-primary-400">Open</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Refresh Button */}
          <div className="sticky bottom-0 glass-secondary p-3 border-t border-white/20">
            <button
              onClick={fetchNotifications}
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/15 rounded-xl transition disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
