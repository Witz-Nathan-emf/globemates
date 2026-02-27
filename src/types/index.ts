
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-Binary',
  OTHER = 'Other'
}

export enum VerificationStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  VERIFIED = 'Verified',
  REJECTED = 'Rejected',
  RESTRICTED = 'Restricted'
}

export enum SubscriptionPlan {
  FREE = 'Free',
  PREMIUM = 'Premium',
  PREMIUM_PLUS = 'Premium+'
}

export enum ActivityStatus {
  OPEN = 'Open',
  FULL = 'Full',
  CANCELLED = 'Cancelled',
  FINISHED = 'Finished'
}

export interface TrustBreakdown {
  behavioral: number;
  community: number;
  activity: number;
}

export interface UserReview {
  id: string;
  reviewerId: string;
  rating: number;
  comment: string;
  timestamp: string;
  criteria: {
    respect: number;
    punctuality: number;
    behavior: number;
    reliability: number;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: Gender;
  origin: string;
  languages: string[];
  bio: string;
  interests: string[];
  goals: string[];
  photo?: string;
  verificationStatus: VerificationStatus;
  subscriptionPlan: SubscriptionPlan;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  ratingCount: number;
  trustBreakdown: TrustBreakdown;
  reviews: UserReview[];
  isOnline: boolean;
  lastSeen?: string;
}

export interface Activity {
  id: string;
  creatorId: string;
  title: string;
  type: string;
  description: string;
  dateTime: string;
  locationName: string;
  location: {
    lat: number;
    lng: number;
  };
  participants: string[]; // User IDs who joined
  interestedUserIds: string[]; // User IDs who are considering going
  maxParticipants: number;
  status: ActivityStatus;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  isSystem?: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  isMuted: boolean;
  activityId?: string; // If it's an activity group chat
}

export interface AppNotification {
  id: string;
  type: 'security' | 'social' | 'activity' | 'message' | 'system' | 'subscription';
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface AppState {
  currentUser: UserProfile | null;
  users: UserProfile[];
  activities: Activity[];
  conversations: Conversation[];
  messages: Record<string, Message[]>; // conversationId -> messages
}

export interface Filters {
  maxDistance: number;
  minAge: number;
  maxAge: number;
  gender: Gender | 'All';
  interests: string[];
  goals: string[];
}
