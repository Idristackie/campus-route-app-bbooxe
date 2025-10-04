
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function HelpScreen() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleContactPress = (method: string, value: string) => {
    console.log(`Contact via ${method}:`, value);
    
    switch (method) {
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'website':
        Linking.openURL(value);
        break;
      default:
        Alert.alert('Contact', `Contact via ${method}: ${value}`);
    }
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const contactOptions = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get help via email',
      value: 'support@ugcampusnavigator.edu.gh',
      icon: 'envelope.fill',
      color: colors.primary,
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Call our support team',
      value: '+233-30-213-7000',
      icon: 'phone.fill',
      color: colors.secondary,
    },
    {
      id: 'website',
      title: 'Visit Website',
      description: 'Browse our help center',
      value: 'https://www.ug.edu.gh',
      icon: 'globe',
      color: colors.primary,
    },
  ];

  const faqItems = [
    {
      id: '1',
      question: 'How do I find the best route to my destination?',
      answer: 'Use the search feature on the home screen to enter your destination. The app will show you all available routes with real-time information including duration, fare, and current delays.',
    },
    {
      id: '2',
      question: 'Are the route times and fares accurate?',
      answer: 'We work closely with transport operators to provide the most up-to-date information. However, times may vary due to traffic conditions and fares may change. Always confirm with the driver.',
    },
    {
      id: '3',
      question: 'How do I save my favorite routes?',
      answer: 'Tap the heart icon on any route card to add it to your favorites. You can access your saved routes from the Profile tab under "Favorite Routes".',
    },
    {
      id: '4',
      question: 'Can I use the app offline?',
      answer: 'Basic route information is available offline, but real-time updates require an internet connection. Enable offline mode in Settings to download route data.',
    },
    {
      id: '5',
      question: 'How do I report incorrect route information?',
      answer: 'You can report issues by contacting our support team via email or phone. We appreciate user feedback to keep our information accurate.',
    },
    {
      id: '6',
      question: 'Is my location data safe?',
      answer: 'Yes, we only use location data to provide route suggestions and never share personal information with third parties. You can manage location permissions in Settings.',
    },
  ];

  const quickActions = [
    {
      id: 'tutorial',
      title: 'App Tutorial',
      description: 'Learn how to use the app',
      icon: 'play.circle.fill',
      color: colors.primary,
    },
    {
      id: 'feedback',
      title: 'Send Feedback',
      description: 'Help us improve the app',
      icon: 'message.fill',
      color: colors.secondary,
    },
    {
      id: 'bug',
      title: 'Report a Bug',
      description: 'Found an issue? Let us know',
      icon: 'exclamationmark.triangle.fill',
      color: colors.accent,
    },
  ];

  const handleQuickAction = (actionId: string) => {
    console.log('Quick action:', actionId);
    
    switch (actionId) {
      case 'tutorial':
        Alert.alert('Tutorial', 'App tutorial feature coming soon!');
        break;
      case 'feedback':
        Alert.alert('Feedback', 'Feedback form coming soon!');
        break;
      case 'bug':
        Alert.alert('Bug Report', 'Bug reporting feature coming soon!');
        break;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Help & Support",
          headerBackTitle: "Profile",
        }}
      />
      
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionItem}
                onPress={() => handleQuickAction(action.id)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <IconSymbol name={action.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>{action.description}</Text>
                </View>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
              </TouchableOpacity>
            ))}
          </View>

          {/* FAQ Section */}
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {faqItems.map((item) => (
              <View key={item.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(item.id)}
                >
                  <Text style={styles.questionText}>{item.question}</Text>
                  <IconSymbol 
                    name={expandedFAQ === item.id ? "chevron.up" : "chevron.down"} 
                    color={colors.textSecondary} 
                    size={16} 
                  />
                </TouchableOpacity>
                {expandedFAQ === item.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Contact Support */}
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <View style={styles.contactContainer}>
            {contactOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.contactItem}
                onPress={() => handleContactPress(option.id, option.value)}
              >
                <View style={[styles.contactIcon, { backgroundColor: option.color }]}>
                  <IconSymbol name={option.icon as any} color={colors.card} size={20} />
                </View>
                <View style={styles.contactContent}>
                  <Text style={styles.contactTitle}>{option.title}</Text>
                  <Text style={styles.contactDescription}>{option.description}</Text>
                  <Text style={styles.contactValue}>{option.value}</Text>
                </View>
                <IconSymbol name="arrow.up.right" color={colors.textSecondary} size={16} />
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
  actionsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  faqContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  answerText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  contactContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
});
