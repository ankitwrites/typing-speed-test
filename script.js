const textSamples = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast is a useful skill for everyone.",
    "Practice makes perfect, especially in typing."
  ]
  
  let timerElement = document.getElementById("timer")
  let wpmElement = document.getElementById("wpm")
  let accuracyElement = document.getElementById("accuracy")
  let textToTypeElement = document.getElementById("text-to-type")
  let inputField = document.getElementById("input")
  let restartBtn = document.getElementById("restart")
  let stopwatchElement = document.getElementById("stopwatch")
  
  let timer = 0
  let timerInterval
  let started = false
  let currentText = ""
  let timeLeft = 20
  let timeLeftInterval

  function loadText() {
    inputField.disabled = false
    currentText = textSamples[Math.floor(Math.random() * textSamples.length)]
    textToTypeElement.textContent = currentText
    inputField.value = ""
    timer = 0
    started = false
    clearInterval(timerInterval)
    timerElement.textContent = "0"
    wpmElement.textContent = "0"
    accuracyElement.textContent = "0"
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++
      timerElement.textContent = timer
    }, 1000)
  }

  function stopwatch() {
    stopwatchElement.textContent = timeLeft

    timeLeftInterval = setInterval(() => {
      timeLeft--
      stopwatchElement.textContent = timeLeft
      if (timeLeft <= 0) {
        clearInterval(timeLeftInterval)
        inputField.disabled = true
        clearInterval(timerInterval)
      }
    }, 1000)
  }
  
  function calculateStats() {
    const typedText = inputField.value
    const correctChars = typedText.split('').filter((char, i) => char === currentText[i]).length
    const accuracy = (correctChars / typedText.length) * 100 || 0
    const wordsTyped = typedText.trim().split(/\s+/).length
    const wpm = Math.round((wordsTyped / timer) * 60) || 0
  
    wpmElement.textContent = wpm
    accuracyElement.textContent = accuracy.toFixed(0)
  }
  
  inputField.addEventListener("input", () => {
    if (!started) {
      started = true
      startTimer()
      stopwatch()
    }
    calculateStats()
    const typed = inputField.value
    if (typed === textToTypeElement.textContent){
      clearInterval(timerInterval)
      inputField.disabled = true
    }
    let result = ""
    for (let i = 0; i < textToTypeElement.textContent.length; i++){
      if (i < typed.length) {
        if (typed[i] === textToTypeElement.textContent[i]) {
          result += `<span class="correct">${textToTypeElement.textContent[i]}</span>`
        } else {
          result += `<span class="incorrect">${textToTypeElement.textContent[i]}</span>`
        }
      } else {
        result += textToTypeElement.textContent[i]
      }
    }
    textToTypeElement.innerHTML = result
  })

  restartBtn.addEventListener("click", loadText)

  loadText()