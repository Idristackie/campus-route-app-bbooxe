
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface MapPlaceholderProps {
  message?: string;
}

export default function MapPlaceholder({ 
  message = "Interactive maps are not supported on web in Natively. This would show the University of Ghana campus map with shuttle and trotro routes." 
}: MapPlaceholderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <IconSymbol name="map" color={colors.primary} size={64} />
        <Text style={styles.title}>Campus Map</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <IconSymbol name="bus.fill" color={colors.secondary} size={24} />
            <Text style={styles.featureText}>Shuttle Routes</Text>
          </View>
          <View style={styles.feature}>
            <IconSymbol name="car.fill" color={colors.accent} size={24} />
            <Text style={styles.featureText}>Trotro Routes</Text>
          </View>
          <View style={styles.feature}>
            <IconSymbol name="location.fill" color={colors.primary} size={24} />
            <Text style={styles.featureText}>Campus Locations</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  featuresContainer: {
    width: '100%',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 1,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    fontWeight: '500',
  },
});
