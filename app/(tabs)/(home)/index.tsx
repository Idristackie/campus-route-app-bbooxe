
import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Modal,
  Platform 
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import MapPlaceholder from '@/components/MapPlaceholder';
import RouteInfo, { RouteData } from '@/components/RouteInfo';
import { campusRoutes, campusLocations } from '@/data/routeData';

export default function HomeScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [showRouteInfo, setShowRouteInfo] = useState(false);

  // Filter routes based on search query
  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return campusRoutes;
    
    const query = searchQuery.toLowerCase();
    return campusRoutes.filter(route => 
      route.name.toLowerCase().includes(query) ||
      route.stops.some(stop => stop.name.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return campusLocations.filter(location =>
      location.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleRoutePress = (route: RouteData) => {
    console.log('Route selected:', route.name);
    setSelectedRoute(route);
    setShowRouteInfo(true);
  };

  const handleCloseRouteInfo = () => {
    setShowRouteInfo(false);
    setSelectedRoute(null);
  };

  const handleSelectRoute = (route: RouteData) => {
    console.log('Route confirmed:', route.name);
    // Here you would typically navigate or perform route selection logic
    setShowRouteInfo(false);
    setSelectedRoute(null);
  };

  const renderHeaderRight = () => (
    <TouchableOpacity style={styles.headerButton}>
      <IconSymbol name="location.fill" color={colors.primary} size={20} />
    </TouchableOpacity>
  );

  const renderHeaderLeft = () => (
    <TouchableOpacity style={styles.headerButton}>
      <IconSymbol name="line.3.horizontal" color={colors.primary} size={20} />
    </TouchableOpacity>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "UG Campus Navigator",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
          }}
        />
      )}
      
      <View style={[commonStyles.container, { backgroundColor: colors.background }]}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={commonStyles.searchContainer}>
            <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
            <TextInput
              style={commonStyles.searchInput}
              placeholder="Search routes or locations..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <IconSymbol name="xmark.circle.fill" color={colors.textSecondary} size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Map Area */}
        <View style={styles.mapContainer}>
          <MapPlaceholder />
        </View>

        {/* Routes and Locations List */}
        <View style={styles.listContainer}>
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Show search results when searching */}
            {searchQuery.trim() && (
              <>
                {filteredLocations.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Locations</Text>
                    {filteredLocations.map(location => (
                      <TouchableOpacity key={location.id} style={styles.locationItem}>
                        <IconSymbol 
                          name="location.fill" 
                          color={colors.primary} 
                          size={16} 
                        />
                        <Text style={styles.locationName}>{location.name}</Text>
                        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(location.category) }]}>
                          <Text style={styles.categoryText}>{location.category}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
                {filteredRoutes.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Routes</Text>
                    {filteredRoutes.map(route => (
                      <RouteCard 
                        key={route.id} 
                        route={route} 
                        onPress={() => handleRoutePress(route)} 
                      />
                    ))}
                  </View>
                )}
                
                {filteredLocations.length === 0 && filteredRoutes.length === 0 && (
                  <View style={styles.noResults}>
                    <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={48} />
                    <Text style={styles.noResultsText}>No results found</Text>
                    <Text style={styles.noResultsSubtext}>
                      Try searching for routes like "Main Campus" or locations like "Great Hall"
                    </Text>
                  </View>
                )}
              </>
            )}

            {/* Show all routes when not searching */}
            {!searchQuery.trim() && (
              <>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Campus Shuttles</Text>
                  {campusRoutes
                    .filter(route => route.type === 'shuttle')
                    .map(route => (
                      <RouteCard 
                        key={route.id} 
                        route={route} 
                        onPress={() => handleRoutePress(route)} 
                      />
                    ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Trotro Routes</Text>
                  {campusRoutes
                    .filter(route => route.type === 'trotro')
                    .map(route => (
                      <RouteCard 
                        key={route.id} 
                        route={route} 
                        onPress={() => handleRoutePress(route)} 
                      />
                    ))}
                </View>
              </>
            )}
          </ScrollView>
        </View>

        {/* Route Info Modal */}
        <Modal
          visible={showRouteInfo}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={handleCloseRouteInfo}
        >
          <RouteInfo
            route={selectedRoute}
            onClose={handleCloseRouteInfo}
            onSelectRoute={handleSelectRoute}
          />
        </Modal>
      </View>
    </>
  );
}

// Helper component for route cards
function RouteCard({ route, onPress }: { route: RouteData; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.routeCard} onPress={onPress}>
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
          {route.type === 'shuttle' ? 'Campus Shuttle' : 'Trotro Route'} • ₵{route.fare.toFixed(2)} • {route.estimatedDuration} min
        </Text>
        <Text style={styles.routeFrequency}>{route.frequency}</Text>
      </View>
      <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
    </TouchableOpacity>
  );
}

// Helper function to get category colors
function getCategoryColor(category: string): string {
  switch (category) {
    case 'academic': return colors.primary;
    case 'residential': return colors.secondary;
    case 'landmark': return colors.accent;
    case 'entrance': return colors.textSecondary;
    default: return colors.highlight;
  }
}

const styles = StyleSheet.create({
  searchSection: {
    padding: 16,
    paddingBottom: 8,
  },
  mapContainer: {
    height: 200,
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS !== 'ios' ? 100 : 16, // Extra padding for floating tab bar
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
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
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  locationName: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    color: colors.card,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  noResults: {
    alignItems: 'center',
    padding: 32,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  headerButton: {
    padding: 8,
  },
});
