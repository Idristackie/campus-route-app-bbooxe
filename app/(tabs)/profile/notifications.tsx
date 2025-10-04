
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState({
    routeUpdates: true,
    fareChanges: true,
    newRoutes: false,
    maintenanceAlerts: true,
    promotions: false,
    weeklyReport: true,
  });

  const handleToggleNotification = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Notification ${key} set to:`, value);
  };

  const notificationSettings = [
    {
      id: 'routeUpdates',
      title: 'Route Updates',
      description: 'Get notified about route delays and changes',
      icon: 'bus.fill',
      color: colors.primary,
    },
    {
      id: 'fareChanges',
      title: 'Fare Changes',
      description: 'Alerts when transport fares are updated',
      icon: 'creditcard.fill',
      color: colors.secondary,
    },
    {
      id: 'newRoutes',
      title: 'New Routes',
      description: 'Be the first to know about new routes',
      icon: 'plus.circle.fill',
      color: colors.accent,
    },
    {
      id: 'maintenanceAlerts',
      title: 'Maintenance Alerts',
      description: 'Service interruptions and maintenance notices',
      icon: 'wrench.fill',
      color: colors.primary,
    },
    {
      id: 'promotions',
      title: 'Promotions & Offers',
      description: 'Special deals and discount notifications',
      icon: 'tag.fill',
      color: colors.accent,
    },
    {
      id: 'weeklyReport',
      title: 'Weekly Report',
      description: 'Summary of your travel activity',
      icon: 'chart.bar.fill',
      color: colors.secondary,
    },
  ];

  const recentNotifications = [
    {
      id: '1',
      title: 'Route Delay Alert',
      message: 'Legon to Madina route is experiencing 10-minute delays',
      time: '2 hours ago',
      type: 'alert',
      read: false,
    },
    {
      id: '2',
      title: 'New Route Available',
      message: 'Campus Shuttle C now available with extended hours',
      time: '1 day ago',
      type: 'info',
      read: true,
    },
    {
      id: '3',
      title: 'Weekly Travel Report',
      message: 'You saved ₵12.50 this week using optimal routes',
      time: '3 days ago',
      type: 'report',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return 'exclamationmark.triangle.fill';
      case 'info':
        return 'info.circle.fill';
      case 'report':
        return 'chart.bar.fill';
      default:
        return 'bell.fill';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'alert':
        return colors.accent;
      case 'info':
        return colors.primary;
      case 'report':
        return colors.secondary;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Notifications",
          headerBackTitle: "Profile",
        }}
      />
      
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Notification Settings */}
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          <View style={styles.settingsContainer}>
            {notificationSettings.map((setting) => (
              <View key={setting.id} style={styles.settingItem}>
                <View style={[styles.settingIcon, { backgroundColor: setting.color }]}>
                  <IconSymbol name={setting.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
                <Switch
                  value={notifications[setting.id as keyof typeof notifications]}
                  onValueChange={(value) => handleToggleNotification(setting.id, value)}
                  trackColor={{ false: colors.highlight, true: colors.primary }}
                  thumbColor={colors.card}
                />
              </View>
            ))}
          </View>

          {/* Recent Notifications */}
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          <View style={styles.notificationsContainer}>
            {recentNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadNotification
                ]}
              >
                <View style={[
                  styles.notificationIcon,
                  { backgroundColor: getNotificationColor(notification.type) }
                ]}>
                  <IconSymbol 
                    name={getNotificationIcon(notification.type) as any} 
                    color={colors.card} 
                    size={16} 
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={[
                    styles.notificationTitle,
                    !notification.read && styles.unreadText
                  ]}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {notification.time}
                  </Text>
                </View>
                {!notification.read && <View style={styles.unreadDot} />}
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
  notificationsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  unreadNotification: {
    backgroundColor: colors.highlight,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginLeft: 8,
  },
});
