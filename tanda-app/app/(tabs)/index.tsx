import NotificationSheet from '@/components/NotificationSheet';
import ProfileSheet from '@/components/ProfileSheet';

import CommunityAlerts from '@/components/CommunityAlerts';
import Header from '@/components/Header';
import MainMenu from '@/components/MainMenu';
import QuickActions from '@/components/QuickActions';
import RecentActivity from '@/components/RecentActivity';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

export default function Home() {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header
          onNotifPress={() => setShowNotif(true)}
          onProfilePress={() => setShowProfile(true)}
        />
        <View style={{ marginTop: -24, paddingHorizontal: 16 }} />
        <CommunityAlerts />
        <MainMenu />
        <QuickActions />
        <RecentActivity />
      </ScrollView>

      <NotificationSheet visible={showNotif} onClose={() => setShowNotif(false)} />

      <ProfileSheet visible={showProfile} onClose={() => setShowProfile(false)} />
    </SafeAreaView>
  );
}

