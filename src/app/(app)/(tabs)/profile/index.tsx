import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import { useRouter } from "expo-router";


export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            router.replace('/sign-in');
          } catch (error) {
            console.error('Sign out error:', error);
            Alert.alert("Error", "Failed to sign out. Please try again.");
          }
        },
      }
    ]);
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-8">
        <Text className="text-3xl font-bold text-gray-900 mb-8">Profile</Text>
        
        {/* User Information */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <View className="flex-row items-center mb-4">
            <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mr-4">
              <Text className="text-white text-2xl font-bold">
                {user?.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">
                {user?.firstName || 'User'} {user?.lastName || ''}
              </Text>
              <Text className="text-gray-600">{user?.emailAddresses[0]?.emailAddress}</Text>
            </View>
          </View>
          
          <View className="border-t border-gray-100 pt-4">
            <Text className="text-sm text-gray-500 mb-2">User ID</Text>
            <Text className="text-gray-900 font-mono text-sm">{user?.id}</Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-600 rounded-2xl p-4 shadow-sm"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={20} color="white"/>
            <Text className="text-white font-semibold text-lg ml-2">
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
