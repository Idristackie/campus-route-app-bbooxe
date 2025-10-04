
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    darkMode: false,
    locationServices: true,
    offlineMode: false,
    autoRefresh: true,
    hapticFeedback: true,
  });

  const handleToggleSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Setting ${key} changed to:`, value);
  };

  const handleAccountAction = (action: string) => {
    console.log('Account action:', action);
    
    switch (action) {
      case 'editProfile':
        Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
        break;
      case 'changePassword':
        Alert.alert('Change Password', 'Password change feature coming soon!');
        break;
      case 'privacy':
        Alert.alert('Privacy Settings', 'Privacy settings feature coming soon!');
        break;
      case 'dataUsage':
        Alert.alert('Data Usage', 'Data usage monitoring feature coming soon!');
        break;
      case 'clearCache':
        Alert.alert(
          'Clear Cache',
          'This will clear all cached data. Continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', onPress: () => console.log('Cache cleared') }
          ]
        );
        break;
      case 'logout':
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => console.log('User logged out') }
          ]
        );
        break;
    }
  };

  const appSettings = [
    {
      id: 'darkMode',
      title: 'Dark Mode',
      description: 'Use dark theme throughout the app',
      icon: 'moon.fill',
      type: 'toggle',
    },
    {
      id: 'locationServices',
      title: 'Location Services',
      description: 'Allow app to access your location',
      icon: 'location.fill',
      type: 'toggle',
    },
    {
      id: 'offlineMode',
      title: 'Offline Mode',
      description: 'Download routes for offline use',
      icon: 'wifi.slash',
      type: 'toggle',
    },
    {
      id: 'autoRefresh',
      title: 'Auto Refresh',
      description: 'Automatically update route information',
      icon: 'arrow.clockwise',
      type: 'toggle',
    },
    {
      id: 'hapticFeedback',
      title: 'Haptic Feedback',
      description: 'Vibrate on interactions',
      icon: 'hand.tap.fill',
      type: 'toggle',
    },
  ];

  const accountOptions = [
    {
      id: 'editProfile',
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: 'person.circle',
      color: colors.primary,
    },
    {
      id: 'changePassword',
      title: 'Change Password',
      description: 'Update your account password',
      icon: 'key.fill',
      color: colors.secondary,
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      description: 'Manage your privacy preferences',
      icon: 'lock.fill',
      color: colors.primary,
    },
    {
      id: 'dataUsage',
      title: 'Data Usage',
      description: 'Monitor app data consumption',
      icon: 'chart.bar.fill',
      color: colors.secondary,
    },
  ];

  const dangerZone = [
    {
      id: 'clearCache',
      title: 'Clear Cache',
      description: 'Remove all cached data',
      icon: 'trash.fill',
      color: colors.textSecondary,
    },
    {
      id: 'logout',
      title: 'Logout',
      description: 'Sign out of your account',
      icon: 'rectangle.portrait.and.arrow.right',
      color: colors.accent,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerBackTitle: "Profile",
        }}
      />
      
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* App Settings */}
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingsContainer}>
            {appSettings.map((setting) => (
              <View key={setting.id} style={styles.settingItem}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primary }]}>
                  <IconSymbol name={setting.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
                <Switch
                  value={settings[setting.id as keyof typeof settings]}
                  onValueChange={(value) => handleToggleSetting(setting.id, value)}
                  trackColor={{ false: colors.highlight, true: colors.primary }}
                  thumbColor={colors.card}
                />
              </View>
            ))}
          </View>

          {/* Account Settings */}
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsContainer}>
            {accountOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.settingItem}
                onPress={() => handleAccountAction(option.id)}
              >
                <View style={[styles.settingIcon, { backgroundColor: option.color }]}>
                  <IconSymbol name={option.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                  <Text style={styles.settingDescription}>{option.description}</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Danger Zone */}
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <View style={styles.settingsContainer}>
            {dangerZone.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.settingItem}
                onPress={() => handleAccountAction(option.id)}
              >
                <View style={[styles.settingIcon, { backgroundColor: option.color }]}>
                  <IconSymbol name={option.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, option.id === 'logout' && { color: option.color }]}>
                    {option.title}
                  </Text>
                  <Text style={styles.settingDescription}>{option.description}</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
              </TouchableOpacity>
            ))}
          </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  settingsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
