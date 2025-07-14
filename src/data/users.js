export const users = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    bio: 'Software developer passionate about React and Node.js. Building the future one line of code at a time.',
    joinedDate: '2023-01-15',
    followers: 1234,
    following: 567,
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123',
    bio: 'UI/UX Designer creating beautiful digital experiences. Coffee enthusiast ☕',
    joinedDate: '2023-02-20',
    followers: 892,
    following: 234,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 3,
    username: 'mike_wilson',
    email: 'mike@example.com',
    password: 'password123',
    bio: 'Product Manager at a tech startup. Love hiking and photography 📸',
    joinedDate: '2023-03-10',
    followers: 456,
    following: 123,
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 4,
    username: 'sarah_johnson',
    email: 'sarah@example.com',
    password: 'password123',
    bio: 'Marketing specialist and content creator. Helping brands tell their stories.',
    joinedDate: '2023-04-05',
    followers: 2341,
    following: 890,
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const tweets = [
  {
    id: 1,
    userId: 1,
    username: 'john_doe',
    content: 'Just finished building a new React component library! The developer experience is so much better with TypeScript. Excited to share it with the community soon! 🚀',
    timestamp: '2024-01-20T10:30:00Z',
    likes: 45,
    comments: [
      {
        id: 1,
        userId: 2,
        username: 'jane_smith',
        content: 'That sounds amazing! Can\'t wait to see what you\'ve built.',
        timestamp: '2024-01-20T10:45:00Z'
      },
      {
        id: 2,
        userId: 3,
        username: 'mike_wilson',
        content: 'TypeScript really does make a huge difference. Looking forward to trying it out!',
        timestamp: '2024-01-20T11:00:00Z'
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    username: 'jane_smith',
    content: 'Working on a new design system today. The importance of consistent spacing and typography cannot be overstated. Small details make the biggest difference in user experience.',
    timestamp: '2024-01-20T09:15:00Z',
    likes: 32,
    comments: [
      {
        id: 3,
        userId: 4,
        username: 'sarah_johnson',
        content: 'Absolutely agree! Consistency is key to great UX.',
        timestamp: '2024-01-20T09:30:00Z'
      }
    ]
  },
  {
    id: 3,
    userId: 3,
    username: 'mike_wilson',
    content: 'Beautiful sunrise from my morning hike! There\'s nothing quite like starting the day in nature. Perfect inspiration for the week ahead. 🌄',
    timestamp: '2024-01-20T08:00:00Z',
    likes: 67,
    comments: []
  },
  {
    id: 4,
    userId: 4,
    username: 'sarah_johnson',
    content: 'Just launched our new content marketing campaign! The response has been incredible. Data-driven storytelling really works when you understand your audience.',
    timestamp: '2024-01-19T16:45:00Z',
    likes: 89,
    comments: [
      {
        id: 4,
        userId: 1,
        username: 'john_doe',
        content: 'Congrats on the launch! Data-driven approaches always yield the best results.',
        timestamp: '2024-01-19T17:00:00Z'
      }
    ]
  },
  {
    id: 5,
    userId: 1,
    username: 'john_doe',
    content: 'Hot take: The best code is the code you don\'t have to write. Sometimes the simplest solution is the most elegant one.',
    timestamp: '2024-01-19T14:20:00Z',
    likes: 156,
    comments: [
      {
        id: 5,
        userId: 2,
        username: 'jane_smith',
        content: 'So true! Less is definitely more when it comes to clean code.',
        timestamp: '2024-01-19T14:35:00Z'
      },
      {
        id: 6,
        userId: 3,
        username: 'mike_wilson',
        content: 'KISS principle at its finest!',
        timestamp: '2024-01-19T15:00:00Z'
      }
    ]
  }
];