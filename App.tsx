
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Types & Data
import { 
  UserProfile, 
  Activity, 
  Conversation,
  ActivityStatus,
  AppNotification,
  Message
} from './src/types';
import { MOCK_USERS, MOCK_ACTIVITIES } from './src/data/mockData';

// Hooks
// import { useDarkMode } from './src/hooks/useDarkMode';

// Components
import { Navbar } from './src/components/Navbar';
import { OnboardingView } from './src/components/OnboardingView';
import { ReportingModal } from './src/components/ReportingModal';
import { PostActivityFeedback } from './src/components/PostActivityFeedback';

// Views
import { HomeView } from './src/pages/HomeView';
import { ExploreView } from './src/pages/ExploreView';
import { MatesListView } from './src/pages/MatesListView';
import { ChatListView } from './src/pages/ChatListView';
import { ChatDetailView } from './src/pages/ChatDetailView';
import { ProfileView } from './src/pages/ProfileView';
import { NotificationCenter } from './src/pages/NotificationCenter';
import { SubscriptionView } from './src/pages/SubscriptionView';
import { UserDetailView } from './src/pages/UserDetailView';

export default function App() {
  // const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentUserId] = useState('u1');
  const [users] = useState<UserProfile[]>(MOCK_USERS);
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [notifications] = useState<AppNotification[]>([
    { id: '1', type: 'security', title: 'Compte Vérifié', content: 'Félicitations ! Votre profil a été validé par nos équipes.', timestamp: new Date().toISOString(), isRead: false },
    { id: '2', type: 'activity', title: 'Nouvelle activité proche', content: 'Marc a créé "Picnic au Canal" à 500m de vous.', timestamp: new Date(Date.now() - 3600000).toISOString(), isRead: true },
    { id: '3', type: 'social', title: 'Nouveau Mate', content: 'Julie souhaite explorer Paris avec vous.', timestamp: new Date(Date.now() - 7200000).toISOString(), isRead: true },
  ]);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('onboarding_completed'));
  const [reportingTarget, setReportingTarget] = useState<{ type: 'user' | 'activity' | 'message', id: string } | null>(null);
  const [feedbackTarget, setFeedbackTarget] = useState<{ activity: Activity, mate: UserProfile } | null>(null);

  const currentUser = users.find(u => u.id === currentUserId)!;

  const handleCompleteOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const handleJoinActivity = (aid: string) => {
    setActivities(prev => prev.map(a => a.id === aid ? { ...a, participants: [...a.participants, currentUserId] } : a));
  };

  const startConversation = (targetId: string, text?: string) => {
    const existing = conversations.find(c => c.participants.includes(targetId));
    if (!existing) {
      const newConv: Conversation = {
        id: `c${Date.now()}`,
        participants: [currentUserId, targetId],
        lastMessage: text || 'Hey ! Envie d\'explorer ensemble ?',
        lastMessageTime: new Date().toISOString(),
        isMuted: false
      };
      setConversations([newConv, ...conversations]);
      setMessages(prev => ({
        ...prev,
        [newConv.id]: [{
          id: 'm1',
          senderId: targetId,
          text: text || 'Hey ! Envie d\'explorer ensemble ?',
          timestamp: new Date().toISOString(),
          isRead: true
        }]
      }));
    }
  };

  const handleSendMessage = (convId: string, text: string) => {
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: currentUserId,
      text,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMessage]
    }));
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, lastMessage: text, lastMessageTime: newMessage.timestamp } : c));
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-light-bg selection:bg-[#3A4FFF] selection:text-white font-sans transition-colors duration-300">
        <AnimatePresence mode="wait">
          {showOnboarding ? (
            <OnboardingView onComplete={handleCompleteOnboarding} />
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomeView users={users} activities={activities} currentUser={currentUser} />} />
                <Route path="/explore" element={
                  <ExploreView 
                    activities={activities} 
                    users={users} 
                    currentUser={currentUser} 
                    onMessage={startConversation} 
                    onJoin={handleJoinActivity}
                    onCreateActivity={() => {
                      const act: Activity = {
                        id: `a${Date.now()}`,
                        creatorId: currentUserId,
                        title: 'Nouvelle activité',
                        type: 'Activity',
                        description: 'Description de l\'activité...',
                        dateTime: new Date().toISOString(),
                        locationName: 'Paris, France',
                        location: currentUser.location,
                        participants: [currentUserId],
                        interestedUserIds: [],
                        maxParticipants: 5,
                        status: ActivityStatus.OPEN
                      };
                      setActivities([act, ...activities]);
                    }}
                  />
                } />
                <Route path="/mates" element={<MatesListView users={users} currentUser={currentUser} />} />
                <Route path="/user/:id" element={<UserDetailView users={users} currentUserId={currentUserId} onMessage={startConversation} onReport={(id) => setReportingTarget({ type: 'user', id })} />} />
                <Route path="/chats" element={<ChatListView conversations={conversations} users={users} />} />
                <Route path="/chat/:id" element={<ChatDetailView conversations={conversations} users={users} messages={messages} onSendMessage={handleSendMessage} />} />
                <Route path="/profile" element={<ProfileView currentUser={currentUser} />} />
                <Route path="/notifications" element={<NotificationCenter notifications={notifications} />} />
                <Route path="/subscription" element={<SubscriptionView currentUser={currentUser} />} />
              </Routes>
              <Navbar />
            </>
          )}
        </AnimatePresence>

        <ReportingModal 
          target={reportingTarget} 
          onClose={() => setReportingTarget(null)} 
          onSubmit={(data) => {
            console.log('Report submitted:', data);
            setReportingTarget(null);
          }}
        />

        {feedbackTarget && (
          <PostActivityFeedback 
            activity={feedbackTarget.activity} 
            mate={feedbackTarget.mate} 
            onClose={() => setFeedbackTarget(null)} 
          />
        )}
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </HashRouter>
  );
}
