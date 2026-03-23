import express from "express"
import fetch from "node-fetch"

const router = express.Router()

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
  kotlin: 78,
  typescript: 74,
  r: 80,
  bash: 46,
  sql: 82
}

router.post("/execute", async (req, res) => {
  try {
    const { language, code, language_id } = req.body
    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: "Language and code are required"
      })
    }
    const langId = language_id || languageIdMap[language]
    if (!langId) {
      return res.status(400).json({
        success: false,
        error: "Language not supported"
      })
    }
    const response = await fetch(
      "https://ce.judge0.com/submissions?wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source_code: code,
          language_id: langId
        })
      }
    )
    if (!response.ok) {
      console.error("Judge0 API error:", response.status)
      return res.status(500).json({
        success: false,
        error: "Code execution service error",
        message: "API Error"
      })
    }
    const data = await response.json()
    console.log("Judge0 execution completed:", {
      language,
      status: data.status?.id,
      hasOutput: !!data.stdout,
      hasError: !!data.stderr
    })
    const output = data.stdout || ""
    const error = data.stderr || data.compile_output || ""
    const statusId = data.status?.id
    const isError = statusId && statusId > 3
    return res.json({
      success: !isError,
      language: language,
      output: output.trim(),
      error: error.trim(),
      message: isError ? "Code executed with errors" : "Code executed successfully",
      statusId: statusId
    })
  } catch (error) {
    console.error("Code execution error:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Code execution failed",
      message: "Execution Error"
    })
  }
})

export default router
