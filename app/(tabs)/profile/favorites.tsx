
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { campusRoutes } from '@/data/routeData';

export default function FavoritesScreen() {
  const [favoriteRoutes, setFavoriteRoutes] = useState([
    campusRoutes[0], // Legon to Madina
    campusRoutes[2], // Campus Shuttle A
  ]);

  const handleRemoveFavorite = (routeId: string) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this route from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavoriteRoutes(prev => prev.filter(route => route.id !== routeId));
            console.log('Removed favorite route:', routeId);
          }
        }
      ]
    );
  };

  const handleRoutePress = (route: any) => {
    console.log('Selected favorite route:', route.name);
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Favorite Routes",
          headerBackTitle: "Profile",
        }}
      />
      
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {favoriteRoutes.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol name="heart" color={colors.textSecondary} size={48} />
              <Text style={styles.emptyTitle}>No Favorite Routes</Text>
              <Text style={styles.emptyDescription}>
                Add routes to your favorites for quick access
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Your Favorite Routes</Text>
              {favoriteRoutes.map((route) => (
                <TouchableOpacity
                  key={route.id}
                  style={styles.routeCard}
                  onPress={() => handleRoutePress(route)}
                >
                  <View style={styles.routeHeader}>
                    <View style={[styles.routeIcon, { backgroundColor: route.color }]}>
                      <IconSymbol name="bus.fill" color={colors.card} size={20} />
                    </View>
                    <View style={styles.routeInfo}>
                      <Text style={styles.routeName}>{route.name}</Text>
                      <Text style={styles.routeDescription}>{route.description}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={() => handleRemoveFavorite(route.id)}
                    >
                      <IconSymbol name="heart.fill" color={colors.accent} size={20} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.routeDetails}>
                    <View style={styles.detailItem}>
                      <IconSymbol name="clock" color={colors.textSecondary} size={14} />
                      <Text style={styles.detailText}>{route.duration}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <IconSymbol name="creditcard" color={colors.textSecondary} size={14} />
                      <Text style={styles.detailText}>₵{route.fare}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <IconSymbol name="location" color={colors.textSecondary} size={14} />
                      <Text style={styles.detailText}>{route.stops?.length || 0} stops</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  routeCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  routeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  favoriteButton: {
    padding: 8,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});
