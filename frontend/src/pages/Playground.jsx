import { useState } from 'react'
import Editor from '@monaco-editor/react'
import axios from 'axios'

export default function Playground() {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!")')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const languages = [
    { name: 'JavaScript', value: 'javascript', icon: '🟨' },
    { name: 'Python', value: 'python', icon: '🐍' },
    { name: 'Java', value: 'java', icon: '☕' },
    { name: 'C++', value: 'cpp', icon: '⚙️' },
    { name: 'C', value: 'c', icon: '🔤' },
    { name: 'C#', value: 'csharp', icon: '🎮' },
    { name: 'Go', value: 'go', icon: '🐹' },
    { name: 'Rust', value: 'rust', icon: '🦀' },
    { name: 'Ruby', value: 'ruby', icon: '💎' },
    { name: 'PHP', value: 'php', icon: '🐘' },
    { name: 'Swift', value: 'swift', icon: '🍎' },
    { name: 'TypeScript', value: 'typescript', icon: '📘' },
    { name: 'R', value: 'r', icon: '📊' },
    { name: 'Bash', value: 'bash', icon: '🖥️' },
    { name: 'SQL', value: 'sql', icon: '🗄️' }
  ]

  const templates = {
    javascript: '// Write your JavaScript code here\nconsole.log("Hello, World!")',
    python: '# Write your Python code here\nprint("Hello, World!")',
    java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
    cpp: '#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}',
    c: '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
    csharp: 'using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}',
    go: 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, World!")\n}',
    rust: 'fn main() {\n  println!("Hello, World!");\n}',
    ruby: 'puts "Hello, World!"',
    php: '<?php\necho "Hello, World!";\n?>',
    swift: 'print("Hello, World!")',
    typescript: '// Write your TypeScript code here\nconsole.log("Hello, World!")',
    r: 'print("Hello, World!")',
    bash: 'echo "Hello, World!"',
    sql: 'SELECT "Hello, World!" AS greeting;'
  }

  const languageIdMap = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
    c: 50,
    csharp: 51,
    go: 60,
    rust: 73,
    ruby: 72,
    php: 68,
    swift: 83,
    typescript: 74,
    r: 80,
    bash: 46,
    sql: 82
  }

  const getLanguageId = (lang) => languageIdMap[lang] || 63

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setCode(templates[lang] || templates.javascript)
    setOutput('')
    setError('')
  }

  const handleRunCode = async () => {
    setLoading(true)
    setError('')
    setOutput('')

    try {
      if (language === 'javascript') {
        const logs = []
        const originalLog = console.log
        const originalError = console.error

        console.log = (...args) => {
          logs.push(args.map(arg => {
            if (typeof arg === 'object') {
              return JSON.stringify(arg, null, 2)
            }
            return String(arg)
          }).join(' '))
        }

        console.error = (...args) => {
          logs.push('ERROR: ' + args.map(arg => String(arg)).join(' '))
        }

        try {
          // eslint-disable-next-line no-eval
          eval(code)
          setOutput(logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)')
        } catch (err) {
          setError(err.message)
          setOutput('')
        } finally {
          console.log = originalLog
          console.error = originalError
        }
      } else {
        // Use backend code executor
        try {
          const response = await axios.post('http://localhost:5000/api/code-executor/execute', {
            language: language,
            code: code,
            language_id: getLanguageId(language)
          }, {
            timeout: 20000
          })

          if (response.data) {
            if (response.data.success === false) {
              // Execution failed
              setError(response.data.error || 'Code execution failed')
              setOutput('')
            } else if (response.data.error && response.data.error.trim() !== '') {
              // Code ran but had errors (stderr)
              setError(response.data.error)
              setOutput('')
            } else {
              // Success
              setOutput(response.data.output || 'Code executed successfully (no output)')
              setError('')
            }
          } else {
            setError('No response from code execution service')
            setOutput('')
          }
        } catch (err) {
          console.error('Code execution error:', err.message)
          if (err.response?.status === 503) {
            setError('Code execution service unavailable. Please check that the backend is running on port 5000.')
          } else if (err.message === 'Network Error' || err.code === 'ECONNREFUSED') {
            setError('Cannot connect to code execution service. Make sure the backend is running: npm run dev in the backend folder.')
          } else {
            setError('Code execution service error: ' + (err.response?.data?.error || err.message || 'Please try again.'))
          }
          setOutput('')
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to execute code')
      setOutput('')
    } finally {
      setLoading(false)
    }
  }

  const getFileExtension = (lang) => {
    const extensions = {
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      csharp: 'cs',
      go: 'go',
      rust: 'rs',
      ruby: 'rb',
      php: 'php',
      swift: 'swift',
      typescript: 'ts',
      r: 'r',
      bash: 'sh',
      sql: 'sql'
    }
    return extensions[lang] || 'txt'
  }

  const handleClearCode = () => {
    setCode(templates[language] || templates.javascript)
    setOutput('')
    setError('')
  }

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <div className="glass-dark sticky top-0 z-40 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-100">
              💻 Code Playground
            </h1>
            <p className="text-sm text-slate-400 mt-1">Execute code in 15+ languages instantly</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageChange(lang.value)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm ${
                  language === lang.value
                    ? 'glass-dark text-slate-100 shadow-md border border-primary-400/30'
                    : 'glass text-slate-100 hover:shadow-md border border-white/8'
                }`}
                title={lang.name}
              >
                {lang.icon} {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-280px)]">
          {/* Code Editor */}
          <div className="flex flex-col glass rounded-2xl overflow-hidden border border-white/8">
            <div className="glass-secondary px-6 py-4 border-b border-white/8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
              <h2 className="font-semibold text-slate-100">Code Editor</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'Fira Code, monospace',
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
          </div>

          {/* Output Terminal */}
          <div className="flex flex-col glass rounded-2xl overflow-hidden border border-white/8">
            <div className="glass-secondary px-6 py-4 border-b border-white/8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
              <h2 className="font-semibold text-slate-100">Output Terminal</h2>
            </div>
            <div className="flex-1 overflow-auto p-6 font-mono text-sm bg-white/20">
              {error ? (
                <div className="text-red-700">
                  <div className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-lg">❌</span> Error
                  </div>
                  <pre className="whitespace-pre-wrap break-words text-red-600 bg-red-50/40 p-4 rounded-lg border border-red-300/30">{error}</pre>
                </div>
              ) : output ? (
                <div className="text-slate-400">
                  <div className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-lg">✅</span> Output
                  </div>
                  <pre className="whitespace-pre-wrap break-words text-slate-400 bg-primary-50/40 p-4 rounded-lg border border-primary-300/30">{output}</pre>
                </div>
              ) : (
                <div className="text-primary-400 flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-4xl mb-2">▶️</div>
                    <p>Click "Run Code" to see output here...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleRunCode}
            disabled={loading}
            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {loading ? '⏳ Running...' : '▶️ Run Code'}
          </button>
          <button
            onClick={handleClearCode}
            className="flex-1 glass text-slate-100 font-semibold py-3 rounded-xl transition-colors duration-200 border border-white/8 hover:shadow-md"
          >
            🗑️ Clear
          </button>
        </div>

        {/* Info Card */}
        <div className="mt-8 glass rounded-2xl p-6 border border-white/8">
          <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2 text-lg">
            <span className="text-2xl">ℹ️</span> Supported Languages
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            JavaScript • Python • Java • C++ • C • C# • Go • Rust • Ruby • PHP • Swift • TypeScript • R • Bash • SQL
          </p>
          <p className="text-xs text-primary-400 mt-3">Powered by Judge0 • Cloud-based execution • No installation required</p>
        </div>
      </div>
    </div>
  )
}
