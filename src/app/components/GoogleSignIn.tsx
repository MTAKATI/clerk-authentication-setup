import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSSO } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Custom hook to warm up the browser (Android/iOS only)
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      void WebBrowser.warmUpAsync()
    }
    return () => {
      if (Platform.OS !== 'web') {
        void WebBrowser.coolDownAsync()
      }
    }
  }, [])
}

// Handle pending sessions
WebBrowser.maybeCompleteAuthSession()

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 12,
  },
});

export default function GoogleSignIn() {
  useWarmUpBrowser()

  const { startSSOFlow } = useSSO()

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: 'oauth_google',
          redirectUrl: AuthSession.makeRedirectUri(),
        })

      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              return
            }
            router.push('/')
          },
        })
      } else {
        console.log('Missing requirements, handle with signIn or signUp')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        <Ionicons name="logo-google" size={20} color="#EA4335" />
        <Text style={styles.buttonText}>
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
  )
}
