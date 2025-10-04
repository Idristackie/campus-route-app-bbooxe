
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function ProfileScreen() {
  const profileOptions = [
    {
      id: 'favorites',
      title: 'Favorite Routes',
      description: 'Your saved routes and locations',
      icon: 'heart.fill',
      color: colors.accent,
      route: '/(tabs)/profile/favorites',
    },
    {
      id: 'history',
      title: 'Travel History',
      description: 'Recent routes and trips',
      icon: 'clock.fill',
      color: colors.primary,
      route: '/(tabs)/profile/history',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Route updates and alerts',
      icon: 'bell.fill',
      color: colors.secondary,
      route: '/(tabs)/profile/notifications',
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'App preferences and account',
      icon: 'gear',
      color: colors.textSecondary,
      route: '/(tabs)/profile/settings',
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'FAQs and contact information',
      icon: 'questionmark.circle.fill',
      color: colors.primary,
      route: '/(tabs)/profile/help',
    },
    {
      id: 'about',
      title: 'About',
      description: 'App version and information',
      icon: 'info.circle.fill',
      color: colors.textSecondary,
      route: '/(tabs)/profile/about',
    },
  ];

  const handleOptionPress = (option: any) => {
    console.log('Profile option pressed:', option.id);
    if (option.route) {
      router.push(option.route);
    }
  };

  const handleHeaderSettingsPress = () => {
    console.log('Header settings pressed');
    router.push('/(tabs)/profile/settings');
  };

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
    // This could navigate to an edit profile screen in the future
  };

  const renderHeaderRight = () => (
    <TouchableOpacity style={styles.headerButton} onPress={handleHeaderSettingsPress}>
      <IconSymbol name="gear" color={colors.primary} size={20} />
    </TouchableOpacity>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Profile",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <TouchableOpacity style={styles.profileHeader} onPress={handleEditProfile}>
            <View style={styles.avatarContainer}>
              <IconSymbol name="person.fill" color={colors.card} size={40} />
            </View>
            <Text style={styles.userName}>UG Student</Text>
            <Text style={styles.userEmail}>student@ug.edu.gh</Text>
            <View style={styles.editIndicator}>
              <IconSymbol name="pencil" color={colors.textSecondary} size={14} />
              <Text style={styles.editText}>Tap to edit</Text>
            </View>
          </TouchableOpacity>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statItem} onPress={() => router.push('/(tabs)/profile/history')}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Routes Used</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.statItem} onPress={() => router.push('/(tabs)/profile/history')}>
              <Text style={styles.statNumber}>₵45.50</Text>
              <Text style={styles.statLabel}>Total Saved</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.statItem} onPress={() => router.push('/(tabs)/profile/history')}>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Trips This Month</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Options */}
          <View style={styles.optionsContainer}>
            {profileOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                onPress={() => handleOptionPress(option)}
                activeOpacity={0.7}
              >
                <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                  <IconSymbol name={option.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
              </TouchableOpacity>
            ))}
          </View>

          {/* App Info */}
          <TouchableOpacity 
            style={styles.appInfo}
            onPress={() => router.push('/(tabs)/profile/about')}
          >
            <Text style={styles.appInfoText}>UG Campus Navigator v1.0.0</Text>
            <Text style={styles.appInfoSubtext}>
              Making campus navigation faster, cheaper, and stress-free
            </Text>
            <Text style={styles.tapForMore}>Tap for more info</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  editIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  editText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.highlight,
    marginHorizontal: 16,
  },
  optionsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  appInfo: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  appInfoText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  appInfoSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 4,
  },
  tapForMore: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '500',
  },
  headerButton: {
    padding: 8,
  },
});
