import React, { useState } from 'react';
import { Alert, Modal, Pressable, StatusBar, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profileData } from '../data/profileData';

type ProfileScreenProps = {
  onBackToHome: () => void;
};

const ProfileScreen = ({ onBackToHome }: ProfileScreenProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(profileData.name);
  const [editEmail, setEditEmail] = useState(profileData.email);

  const initials = editMode
    ? editName
        .split(' ')
        .filter(Boolean)
        .map(part => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : profileData.name
        .split(' ')
        .filter(Boolean)
        .map(part => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    if (!editEmail.trim()) {
      Alert.alert('Error', 'Email cannot be empty');
      return;
    }
    Alert.alert('Success', 'Profile updated successfully!');
    setEditMode(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            Alert.alert('Logged Out', 'You have been logged out successfully.');
            onBackToHome();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="flex-1 overflow-y-auto px-6 pt-8">
        {/* User Info Card */}
        <View className="rounded-3xl border border-[#E7E7F0] bg-white p-6">
          {/* Avatar */}
          <View className="items-center">
            <View className="h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#5548EF] to-[#3D3AE0]">
              <Text className="text-4xl font-extrabold text-white">{initials}</Text>
            </View>
          </View>

          {/* Name */}
          <Text className="mt-6 text-center text-2xl font-extrabold text-[#29293D]">
            {profileData.name}
          </Text>

          {/* Email */}
          <Text className="mt-2 text-center text-sm text-[#7E7D94]">
            {profileData.email}
          </Text>

          {/* Account Status Badge */}
          <View className="mt-4 flex-row items-center justify-center">
            <View className="rounded-full bg-[#E8F0FE] px-4 py-2">
              <Text className="text-xs font-semibold text-[#5548EF]">
                {profileData.accountStatus}
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics Section */}
        <View className="mt-8 gap-3">
          <View className="flex-row gap-3">
            {/* Quotes Read */}
            <View className="flex-1 rounded-2xl border border-[#E7E7F0] bg-white p-4">
              <Text className="text-sm font-semibold text-[#8D8CA3]">Quotes Read</Text>
              <Text className="mt-3 text-3xl font-extrabold text-[#5548EF]">42</Text>
              <Text className="mt-1 text-xs text-[#7E7D94]">this month</Text>
            </View>

            {/* Favorites */}
            <View className="flex-1 rounded-2xl border border-[#E7E7F0] bg-white p-4">
              <Text className="text-sm font-semibold text-[#8D8CA3]">Favorites</Text>
              <Text className="mt-3 text-3xl font-extrabold text-[#5548EF]">18</Text>
              <Text className="mt-1 text-xs text-[#7E7D94]">saved</Text>
            </View>
          </View>
        </View>

        {/* Streak & Achievements Section */}
        <View className="mt-8 gap-3">
          {/* Reading Streak */}
          <View className="rounded-2xl border border-[#E7E7F0] bg-white p-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-semibold text-[#8D8CA3]">Reading Streak</Text>
                <Text className="mt-2 text-2xl font-extrabold text-[#5548EF]">7 days 🔥</Text>
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View>
            <Text className="mb-3 text-sm font-semibold text-[#8D8CA3]">Achievements</Text>
            <View className="flex-row gap-2">
              <View className="flex-1 items-center rounded-2xl border border-[#E7E7F0] bg-white p-4">
                <Text className="text-2xl">⭐</Text>
                <Text className="mt-2 text-center text-xs font-semibold text-[#29293D]">Quote Master</Text>
              </View>
              <View className="flex-1 items-center rounded-2xl border border-[#E7E7F0] bg-white p-4">
                <Text className="text-2xl">❤️</Text>
                <Text className="mt-2 text-center text-xs font-semibold text-[#29293D]">Fav Collector</Text>
              </View>
              <View className="flex-1 items-center rounded-2xl border border-[#E7E7F0] bg-white p-4">
                <Text className="text-2xl">🎯</Text>
                <Text className="mt-2 text-center text-xs font-semibold text-[#29293D]">Streak Master</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-8 gap-3 pb-8">
          <Pressable
            className="items-center rounded-2xl bg-[#5548EF] py-4"
            onPress={() => setEditMode(true)}>
            <Text className="text-[16px] font-semibold text-white">Edit Profile</Text>
          </Pressable>

          <Pressable 
            className="items-center rounded-2xl border border-[#FF6B6B] bg-[#FFE7E7] py-4"
            onPress={handleLogout}>
            <Text className="text-[16px] font-semibold text-[#FF6B6B]">Logout</Text>
          </Pressable>

          <Pressable className="items-center rounded-2xl border border-[#E7E7F0] bg-white py-4" onPress={onBackToHome}>
            <Text className="text-[16px] font-semibold text-[#29293D]">Back to Home</Text>
          </Pressable>
        </View>
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={editMode} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-5/6 rounded-3xl bg-white p-6">
            <Text className="text-2xl font-extrabold text-[#29293D]">Edit Profile</Text>

            <View className="mt-6 gap-4">
              {/* Name Input */}
              <View>
                <Text className="text-sm font-semibold text-[#8D8CA3]">Full Name</Text>
                <TextInput
                  className="mt-2 rounded-xl border border-[#E7E7F0] bg-[#F8F8FC] px-4 py-3 text-[#29293D]"
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Enter your name"
                />
              </View>

              {/* Email Input */}
              <View>
                <Text className="text-sm font-semibold text-[#8D8CA3]">Email Address</Text>
                <TextInput
                  className="mt-2 rounded-xl border border-[#E7E7F0] bg-[#F8F8FC] px-4 py-3 text-[#29293D]"
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Modal Buttons */}
            <View className="mt-8 gap-3">
              <Pressable
                className="items-center rounded-2xl bg-[#5548EF] py-3"
                onPress={handleSaveProfile}>
                <Text className="text-[16px] font-semibold text-white">Save Changes</Text>
              </Pressable>

              <Pressable
                className="items-center rounded-2xl border border-[#E7E7F0] bg-white py-3"
                onPress={() => {
                  setEditMode(false);
                  setEditName(profileData.name);
                  setEditEmail(profileData.email);
                }}>
                <Text className="text-[16px] font-semibold text-[#29293D]">Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  );
};

export default ProfileScreen;