
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.text,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="favorites" />
      <Stack.Screen name="history" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="help" />
      <Stack.Screen name="about" />
    </Stack>
  );
}
