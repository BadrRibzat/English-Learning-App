const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Sample lessons data
const lessons = [
  {
    id: 1,
    title: 'Basic Greetings and Introductions',
    description: 'Learn essential phrases for greeting people and introducing yourself.'
  },
  {
    id: 2,
    title: 'Numbers and Counting',
    description: 'Master numbers in English and learn how to count.'
  },
  {
    id: 3,
    title: 'Everyday Objects and Colors',
    description: 'Expand your vocabulary with common objects and colors.'
  }
];

// Sample flashcards data
const flashcards = {
  1: [
    { id: 1, word: 'Hello', definition: 'A greeting used to begin a conversation.', question: 'What is the word "Hello" used for?' },
    { id: 2, word: 'Goodbye', definition: 'A farewell used when leaving.', question: 'What is the word "Goodbye" used for?' },
    { id: 3, word: 'Please', definition: 'A polite way of asking for something.', question: 'What is the word "Please" used for?' },
    { id: 4, word: 'Thank you', definition: 'A polite expression of gratitude.', question: 'What is the phrase "Thank you" used for?' },
    { id: 5, word: 'Yes', definition: 'An affirmative response.', question: 'What does the word "Yes" indicate?' },
    { id: 6, word: 'No', definition: 'A negative response.', question: 'What does the word "No" indicate?' },
    { id: 7, word: 'Help', definition: 'To assist someone.', question: 'What does the word "Help" mean?' },
    { id: 8, word: 'Sorry', definition: 'An expression of regret.', question: 'What is the word "Sorry" used for?' },
    { id: 9, word: 'Excuse me', definition: 'A polite way to get someone\'s attention.', question: 'What is the phrase "Excuse me" used for?' },
    { id: 10, word: 'What is your name?', definition: 'A question asking for someone\'s name.', question: 'What does the question "What is your name?" ask for?' }
  ],
  2: [
    { id: 1, word: 'One', definition: 'The number 1.', question: 'What is the English word for the number 1?' },
    { id: 2, word: 'Two', definition: 'The number 2.', question: 'What is the English word for the number 2?' },
    { id: 3, word: 'Three', definition: 'The number 3.', question: 'What is the English word for the number 3?' },
    { id: 4, word: 'Four', definition: 'The number 4.', question: 'What is the English word for the number 4?' },
    { id: 5, word: 'Five', definition: 'The number 5.', question: 'What is the English word for the number 5?' },
    { id: 6, word: 'Ten', definition: 'The number 10.', question: 'What is the English word for the number 10?' },
    { id: 7, word: 'Twenty', definition: 'The number 20.', question: 'What is the English word for the number 20?' },
    { id: 8, word: 'Thirty', definition: 'The number 30.', question: 'What is the English word for the number 30?' },
    { id: 9, word: 'Hundred', definition: 'The number 100.', question: 'What is the English word for the number 100?' },
    { id: 10, word: 'Thousand', definition: 'The number 1000.', question: 'What is the English word for the number 1000?' }
  ],
  3: [
    { id: 1, word: 'Table', definition: 'A piece of furniture with a flat top and legs.', question: 'What is a "Table"?' },
    { id: 2, word: 'Chair', definition: 'A separate seat for one person.', question: 'What is a "Chair"?' },
    { id: 3, word: 'Red', definition: 'The color of blood or a ruby.', question: 'What color is "Red"?' },
    { id: 4, word: 'Blue', definition: 'The color of the sky on a clear day.', question: 'What color is "Blue"?' },
    { id: 5, word: 'Green', definition: 'The color of grass or leaves.', question: 'What color is "Green"?' },
    { id: 6, word: 'Book', definition: 'A set of printed pages bound together.', question: 'What is a "Book"?' },
    { id: 7, word: 'Pen', definition: 'A tool used for writing with ink.', question: 'What is a "Pen"?' },
    { id: 8, word: 'Yellow', definition: 'The color of a lemon or the sun.', question: 'What color is "Yellow"?' },
    { id: 9, word: 'Computer', definition: 'An electronic device for processing data.', question: 'What is a "Computer"?' },
    { id: 10, word: 'White', definition: 'The color of snow or milk.', question: 'What color is "White"?' }
  ]
};

// Sample user progress data (in a real application, this would be stored in a database)
let userProgress = {};

// Get all lessons (public route)
router.get('/', (req, res) => {
  res.json(lessons);
});

// Get a specific lesson by ID (protected route)
router.get('/:id', verifyToken, (req, res) => {
  const lessonId = parseInt(req.params.id);
  const lesson = lessons.find(l => l.id === lessonId);
  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
});

// Get flashcards for a specific lesson (protected route)
router.get('/:id/flashcards', verifyToken, (req, res) => {
  const lessonId = parseInt(req.params.id);
  if (flashcards[lessonId]) {
    res.json(flashcards[lessonId]);
  } else {
    res.status(404).json({ message: 'Flashcards not found for this lesson.' });
  }
});

// Get user progress (protected route)
router.get('/user/progress', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const progress = userProgress[userId] || {};
  res.json(progress);
});

// Update user progress (protected route)
router.post('/user/progress', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const { lessonId, completed, total } = req.body;
  
  if (!userProgress[userId]) {
    userProgress[userId] = {};
  }
  
  userProgress[userId][lessonId] = { completed, total };
  
  res.json({ 
    message: 'Progress updated successfully', 
    progress: userProgress[userId]
  });
});

module.exports = router;
