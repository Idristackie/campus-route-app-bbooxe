
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { campusRoutes } from '@/data/routeData';
import { RouteData } from '@/types/route';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  // Mock favorite routes - in a real app, this would come from storage/state management
  const [favoriteRoutes, setFavoriteRoutes] = useState<RouteData[]>([
    campusRoutes[0], // Main Campus Loop
    campusRoutes[2], // Legon - Accra Central
  ]);

  const handleRemoveFavorite = (routeId: string) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this route from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavoriteRoutes(prev => prev.filter(route => route.id !== routeId));
          },
        },
      ]
    );
  };

  const handleRoutePress = (route: RouteData) => {
    console.log('Favorite route pressed:', route.name);
    // Navigate back to home with this route selected
    router.push('/(tabs)/(home)/');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Favorite Routes',
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favoriteRoutes.length > 0 ? (
          <>
            <Text style={styles.description}>
              Your saved routes for quick access
            </Text>
            
            {favoriteRoutes.map(route => (
              <TouchableOpacity
                key={route.id}
                style={styles.routeCard}
                onPress={() => handleRoutePress(route)}
              >
                <View style={[styles.routeIndicator, { backgroundColor: route.color }]}>
                  <IconSymbol 
                    name={route.type === 'shuttle' ? 'bus.fill' : 'car.fill'} 
                    color={colors.card} 
                    size={20} 
                  />
                </View>
                
                <View style={styles.routeContent}>
                  <Text style={styles.routeName}>{route.name}</Text>
                  <Text style={styles.routeDetails}>
                    {route.type === 'shuttle' ? 'Campus Shuttle' : 'Trotro Route'} • ₵{route.fare.toFixed(2)}
                  </Text>
                  <Text style={styles.routeFrequency}>{route.frequency}</Text>
                </View>
                
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFavorite(route.id)}
                >
                  <IconSymbol name="heart.fill" color={colors.secondary} size={20} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <IconSymbol name="heart" color={colors.textSecondary} size={64} />
            <Text style={styles.emptyTitle}>No Favorite Routes</Text>
            <Text style={styles.emptyDescription}>
              Routes you mark as favorites will appear here for quick access.
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => router.push('/(tabs)/(home)/')}
            >
              <Text style={styles.exploreButtonText}>Explore Routes</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  routeIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeContent: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  routeDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  routeFrequency: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
