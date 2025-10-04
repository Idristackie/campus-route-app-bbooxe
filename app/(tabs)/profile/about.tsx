
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function AboutScreen() {
  const handleLinkPress = (url: string) => {
    console.log('Opening link:', url);
    Linking.openURL(url);
  };

  const appInfo = {
    version: '1.0.0',
    buildNumber: '2024.01.15',
    developer: 'UG Campus Navigator Team',
    university: 'University of Ghana',
  };

  const teamMembers = [
    {
      name: 'Development Team',
      role: 'App Development & Design',
      icon: 'laptopcomputer',
    },
    {
      name: 'Transport Office',
      role: 'Route Data & Coordination',
      icon: 'bus.fill',
    },
    {
      name: 'Student Union',
      role: 'User Research & Testing',
      icon: 'person.3.fill',
    },
  ];

  const features = [
    {
      title: 'Real-time Route Information',
      description: 'Live updates on shuttle and trotro schedules',
      icon: 'clock.fill',
    },
    {
      title: 'Interactive Campus Map',
      description: 'Navigate the campus with ease',
      icon: 'map.fill',
    },
    {
      title: 'Fare Calculator',
      description: 'Know the cost before you travel',
      icon: 'creditcard.fill',
    },
    {
      title: 'Offline Support',
      description: 'Access basic route info without internet',
      icon: 'wifi.slash',
    },
  ];

  const links = [
    {
      title: 'University of Ghana',
      url: 'https://www.ug.edu.gh',
      icon: 'globe',
    },
    {
      title: 'Privacy Policy',
      url: 'https://www.ug.edu.gh/privacy',
      icon: 'lock.fill',
    },
    {
      title: 'Terms of Service',
      url: 'https://www.ug.edu.gh/terms',
      icon: 'doc.text.fill',
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "About",
          headerBackTitle: "Profile",
        }}
      />
      
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* App Header */}
          <View style={styles.appHeader}>
            <View style={styles.appIcon}>
              <IconSymbol name="map.fill" color={colors.card} size={40} />
            </View>
            <Text style={styles.appName}>UG Campus Navigator</Text>
            <Text style={styles.appTagline}>
              Making campus navigation faster, cheaper, and stress-free
            </Text>
            <Text style={styles.versionText}>
              Version {appInfo.version} ({appInfo.buildNumber})
            </Text>
          </View>

          {/* Mission Statement */}
          <View style={styles.missionContainer}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.missionText}>
              To solve the transportation challenges faced by students and visitors at the University of Ghana 
              by providing real-time route information, fare details, and navigation assistance in one 
              easy-to-use platform.
            </Text>
          </View>

          {/* Key Features */}
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: colors.primary }]}>
                  <IconSymbol name={feature.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Development Team */}
          <Text style={styles.sectionTitle}>Development Team</Text>
          <View style={styles.teamContainer}>
            {teamMembers.map((member, index) => (
              <View key={index} style={styles.teamMember}>
                <View style={[styles.memberIcon, { backgroundColor: colors.secondary }]}>
                  <IconSymbol name={member.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* App Information */}
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Developer</Text>
              <Text style={styles.infoValue}>{appInfo.developer}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Institution</Text>
              <Text style={styles.infoValue}>{appInfo.university}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>{appInfo.version}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Build</Text>
              <Text style={styles.infoValue}>{appInfo.buildNumber}</Text>
            </View>
          </View>

          {/* Links */}
          <Text style={styles.sectionTitle}>Links</Text>
          <View style={styles.linksContainer}>
            {links.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkItem}
                onPress={() => handleLinkPress(link.url)}
              >
                <View style={[styles.linkIcon, { backgroundColor: colors.primary }]}>
                  <IconSymbol name={link.icon as any} color={colors.card} size={16} />
                </View>
                <Text style={styles.linkTitle}>{link.title}</Text>
                <IconSymbol name="arrow.up.right" color={colors.textSecondary} size={16} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Copyright */}
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              © 2024 University of Ghana. All rights reserved.
            </Text>
            <Text style={styles.copyrightSubtext}>
              Built with ❤️ for the UG community
            </Text>
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
  appHeader: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  appTagline: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  missionContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  missionText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  featuresContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  teamContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  memberIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  linksContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  linkIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linkTitle: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  copyright: {
    alignItems: 'center',
    padding: 16,
  },
  copyrightText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  copyrightSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
