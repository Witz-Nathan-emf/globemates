
import { Gender, VerificationStatus, UserProfile, Activity, SubscriptionPlan, ActivityStatus } from '../types';
import { INTEREST_TAGS, GOAL_TAGS, COUNTRIES, NAMES, ACTIVITY_TITLES } from '../constants';

// Generate 50 mock users around Paris with distinct locations
export const MOCK_USERS: UserProfile[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `u${i + 1}`,
  email: `user${i}@example.com`,
  name: NAMES[i % NAMES.length] + (i >= NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : ''),
  age: 18 + Math.floor(Math.random() * 15),
  gender: i % 3 === 0 ? Gender.FEMALE : i % 3 === 1 ? Gender.MALE : Gender.NON_BINARY,
  origin: COUNTRIES[i % COUNTRIES.length],
  languages: ['English', i % 2 === 0 ? 'French' : 'Spanish'],
  bio: `Passionate about ${INTEREST_TAGS[i % INTEREST_TAGS.length].toLowerCase()} and discovering new cultures. Let's explore Paris together!`,
  interests: [INTEREST_TAGS[i % INTEREST_TAGS.length], INTEREST_TAGS[(i + 1) % INTEREST_TAGS.length]],
  goals: [GOAL_TAGS[i % GOAL_TAGS.length]],
  verificationStatus: i % 5 === 0 ? VerificationStatus.VERIFIED : i % 5 === 1 ? VerificationStatus.IN_PROGRESS : VerificationStatus.PENDING,
  subscriptionPlan: i % 10 === 0 ? SubscriptionPlan.PREMIUM_PLUS : i % 5 === 0 ? SubscriptionPlan.PREMIUM : SubscriptionPlan.FREE,
  location: { 
    lat: 48.8566 + (Math.random() - 0.5) * 0.15, 
    lng: 2.3522 + (Math.random() - 0.5) * 0.15 
  },
  rating: 4.0 + Math.random(),
  ratingCount: 5 + Math.floor(Math.random() * 50),
  trustBreakdown: {
    behavioral: 4.2 + Math.random() * 0.8,
    community: 4.0 + Math.random() * 1.0,
    activity: 4.5 + Math.random() * 0.5
  },
  reviews: [],
  isOnline: Math.random() > 0.7,
  lastSeen: new Date(Date.now() - Math.random() * 86400000).toISOString()
}));

// Generate 50 mock activities with random interested mates
export const MOCK_ACTIVITIES: Activity[] = Array.from({ length: 50 }).map((_, i) => {
  // Pick 3-6 random users (excluding u1) as "interested"
  const interested = Array.from({ length: 3 + Math.floor(Math.random() * 4) })
    .map(() => MOCK_USERS[1 + Math.floor(Math.random() * (MOCK_USERS.length - 1))].id);
  
  return {
    id: `a${i + 1}`,
    creatorId: MOCK_USERS[i % 10].id,
    title: ACTIVITY_TITLES[i % ACTIVITY_TITLES.length],
    type: i % 3 === 0 ? 'Culture' : 'Activity',
    description: 'A unique local experience designed for travelers who want to see the real Paris beyond the guidebooks.',
    dateTime: new Date(Date.now() + Math.random() * 864000000).toISOString(),
    locationName: `Spot ${i + 1} - District ${Math.floor(Math.random() * 20) + 1}`,
    location: {
      lat: 48.8566 + (Math.random() - 0.5) * 0.12,
      lng: 2.3522 + (Math.random() - 0.5) * 0.12,
    },
    participants: [MOCK_USERS[i % 10].id],
    interestedUserIds: Array.from(new Set(interested)), // Ensure unique IDs
    maxParticipants: 5 + Math.floor(Math.random() * 10),
    status: ActivityStatus.OPEN
  };
});
