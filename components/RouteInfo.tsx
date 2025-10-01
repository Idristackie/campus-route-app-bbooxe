
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export interface RouteStop {
  id: string;
  name: string;
  estimatedTime: number; // in minutes from start
}

export interface RouteData {
  id: string;
  name: string;
  type: 'shuttle' | 'trotro';
  fare: number;
  estimatedDuration: number; // total duration in minutes
  stops: RouteStop[];
  operatingHours: string;
  frequency: string; // e.g., "Every 15 minutes"
  color: string;
}

interface RouteInfoProps {
  route: RouteData | null;
  onClose: () => void;
  onSelectRoute?: (route: RouteData) => void;
}

export default function RouteInfo({ route, onClose, onSelectRoute }: RouteInfoProps) {
  if (!route) return null;

  const handleSelectRoute = () => {
    console.log('Route selected:', route.name);
    if (onSelectRoute) {
      onSelectRoute(route);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={[styles.routeTypeIndicator, { backgroundColor: route.color }]}>
            <IconSymbol 
              name={route.type === 'shuttle' ? 'bus.fill' : 'car.fill'} 
              color={colors.card} 
              size={20} 
            />
          </View>
          <View style={styles.routeHeaderText}>
            <Text style={styles.routeName}>{route.name}</Text>
            <Text style={styles.routeType}>
              {route.type === 'shuttle' ? 'Campus Shuttle' : 'Trotro Route'}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <IconSymbol name="xmark" color={colors.textSecondary} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <IconSymbol name="banknote" color={colors.secondary} size={16} />
            <Text style={styles.infoLabel}>Fare</Text>
            <Text style={styles.infoValue}>₵{route.fare.toFixed(2)}</Text>
          </View>
          <View style={styles.infoItem}>
            <IconSymbol name="clock" color={colors.primary} size={16} />
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{route.estimatedDuration} min</Text>
          </View>
          <View style={styles.infoItem}>
            <IconSymbol name="arrow.clockwise" color={colors.accent} size={16} />
            <Text style={styles.infoLabel}>Frequency</Text>
            <Text style={styles.infoValue}>{route.frequency}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operating Hours</Text>
          <Text style={styles.operatingHours}>{route.operatingHours}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route Stops</Text>
          {route.stops.map((stop, index) => (
            <View key={stop.id} style={styles.stopItem}>
              <View style={styles.stopIndicator}>
                <View style={[
                  styles.stopDot, 
                  { 
                    backgroundColor: index === 0 || index === route.stops.length - 1 
                      ? route.color 
                      : colors.highlight 
                  }
                ]} />
                {index < route.stops.length - 1 && <View style={styles.stopLine} />}
              </View>
              <View style={styles.stopContent}>
                <Text style={styles.stopName}>{stop.name}</Text>
                <Text style={styles.stopTime}>
                  {stop.estimatedTime === 0 ? 'Start' : `${stop.estimatedTime} min`}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.selectButton, { backgroundColor: colors.accent }]}
          onPress={handleSelectRoute}
        >
          <IconSymbol name="checkmark.circle.fill" color={colors.card} size={20} />
          <Text style={styles.selectButtonText}>Select This Route</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routeTypeIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeHeaderText: {
    flex: 1,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  routeType: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  operatingHours: {
    fontSize: 14,
    color: colors.textSecondary,
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
  },
  stopItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stopIndicator: {
    alignItems: 'center',
    marginRight: 12,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stopLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.highlight,
    marginTop: 4,
  },
  stopContent: {
    flex: 1,
  },
  stopName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  stopTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  selectButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
