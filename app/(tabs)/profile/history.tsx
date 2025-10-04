
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function HistoryScreen() {
  const travelHistory = [
    {
      id: '1',
      route: 'Legon to Madina',
      date: '2024-01-15',
      time: '08:30 AM',
      fare: '3.50',
      duration: '25 mins',
      status: 'completed'
    },
    {
      id: '2',
      route: 'Campus Shuttle A',
      date: '2024-01-14',
      time: '02:15 PM',
      fare: '1.00',
      duration: '15 mins',
      status: 'completed'
    },
    {
      id: '3',
      route: 'Accra to Legon',
      date: '2024-01-14',
      time: '07:45 AM',
      fare: '4.00',
      duration: '35 mins',
      status: 'completed'
    },
    {
      id: '4',
      route: 'Campus Shuttle B',
      date: '2024-01-13',
      time: '11:20 AM',
      fare: '1.00',
      duration: '12 mins',
      status: 'completed'
    },
    {
      id: '5',
      route: 'Legon to Circle',
      date: '2024-01-12',
      time: '05:30 PM',
      fare: '5.00',
      duration: '40 mins',
      status: 'completed'
    }
  ];

  const handleTripPress = (trip: any) => {
    console.log('Selected trip:', trip.route, trip.date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.success || colors.primary;
      case 'cancelled':
        return colors.error || colors.accent;
      default:
        return colors.textSecondary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Travel History",
          headerBackTitle: "Profile",
        }}
      />
      
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary Stats */}
          <View style={styles.summaryContainer}>
            <Text style={styles.sectionTitle}>This Month</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Total Trips</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>₵45.50</Text>
                <Text style={styles.statLabel}>Total Spent</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12h 30m</Text>
                <Text style={styles.statLabel}>Travel Time</Text>
              </View>
            </View>
          </View>

          {/* Recent Trips */}
          <Text style={styles.sectionTitle}>Recent Trips</Text>
          {travelHistory.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={styles.tripCard}
              onPress={() => handleTripPress(trip)}
            >
              <View style={styles.tripHeader}>
                <View style={styles.tripIcon}>
                  <IconSymbol name="bus.fill" color={colors.primary} size={20} />
                </View>
                <View style={styles.tripInfo}>
                  <Text style={styles.tripRoute}>{trip.route}</Text>
                  <Text style={styles.tripDateTime}>
                    {formatDate(trip.date)} • {trip.time}
                  </Text>
                </View>
                <View style={styles.tripStatus}>
                  <Text style={[styles.statusText, { color: getStatusColor(trip.status) }]}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.tripDetails}>
                <View style={styles.detailItem}>
                  <IconSymbol name="clock" color={colors.textSecondary} size={14} />
                  <Text style={styles.detailText}>{trip.duration}</Text>
                </View>
                <View style={styles.detailItem}>
                  <IconSymbol name="creditcard" color={colors.textSecondary} size={14} />
                  <Text style={styles.detailText}>₵{trip.fare}</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
              </View>
            </TouchableOpacity>
          ))}
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
  summaryContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
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
  tripCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tripInfo: {
    flex: 1,
  },
  tripRoute: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  tripDateTime: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tripStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});
