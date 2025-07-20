export const DIFFICULTY_SCORES = {
  Easy: 1,
  Medium: 2,
  Hard: 3
} as const;

export const DIFFICULTY_EMOJIS = {
  Easy: '🟢',
  Medium: '🟡',
  Hard: '🔴'
} as const;

export const PERFORMANCE_THRESHOLDS = {
  CHAMPION: 90,
  EXCELLENT: 80,
  GREAT: 70,
  GOOD: 60,
  NOT_BAD: 50,
  KEEP_TRYING: 30
} as const;

export const FEEDBACK_MESSAGES = {
  CORRECT: [
    "Awesome! You nailed it!",
    "Fantastic! You're on fire!",
    "Perfect! Keep it up!",
    "Brilliant! You got it right!",
    "Excellent! Well done!",
    "Amazing! You're crushing it!"
  ],
  INCORRECT: [
    "Oops! Better luck next time!",
    "Not quite! Keep trying!",
    "Close, but not quite right!",
    "Don't worry, learning is a journey!",
    "Almost there! You'll get the next one!",
    "No worries, every mistake is a lesson!"
  ]
} as const;

export const FEEDBACK_EMOJIS = {
  CORRECT: ['🎉', '🚀', '⭐', '🎯', '💯', '🔥'],
  INCORRECT: ['💪', '🎯', '📚', '🌟', '🚀', '💡']
} as const;

export const SCORE_ASSESSMENTS = {
  CHAMPION: { emoji: '🏆', message: 'Outstanding! You\'re a trivia champion!' },
  EXCELLENT: { emoji: '🌟', message: 'Excellent work! You really know your stuff!' },
  GREAT: { emoji: '👏', message: 'Great job! Well done on that performance!' },
  GOOD: { emoji: '👍', message: 'Good effort! You\'re getting there!' },
  NOT_BAD: { emoji: '📚', message: 'Not bad! Keep studying and you\'ll improve!' },
  KEEP_TRYING: { emoji: '💪', message: 'Keep trying! Practice makes perfect!' },
  BEGINNER: { emoji: '🎯', message: 'Don\'t give up! Every expert was once a beginner!' }
} as const;
