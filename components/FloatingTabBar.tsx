
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { IconSymbol } from '@/components/IconSymbol';
import { useRouter, usePathname } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 25,
  bottomMargin = 16,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const animatedValue = useSharedValue(0);

  const handleTabPress = (route: string) => {
    console.log('Tab pressed:', route);
    router.push(route as any);
    animatedValue.value = withSpring(1, { damping: 15, stiffness: 150 });
    setTimeout(() => {
      animatedValue.value = withSpring(0, { damping: 15, stiffness: 150 });
    }, 150);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animatedValue.value, [0, 1], [1, 0.95]);
    return {
      transform: [{ scale }],
    };
  });

  return (
    <SafeAreaView style={[styles.safeArea, { bottom: bottomMargin }]} edges={['bottom']}>
      <Animated.View style={[animatedStyle]}>
        <BlurView
          intensity={80}
          tint="light"
          style={[
            styles.container,
            {
              width: containerWidth,
              borderRadius,
              backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.9)' : colors.card,
            },
          ]}
        >
          {tabs.map((tab) => {
            const isActive = pathname.includes(tab.name);
            
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tabButton}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.iconContainer,
                  isActive && { backgroundColor: colors.primary }
                ]}>
                  <IconSymbol
                    name={tab.icon as any}
                    size={20}
                    color={isActive ? colors.card : colors.text}
                  />
                </View>
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isActive ? colors.primary : colors.text }
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </BlurView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
