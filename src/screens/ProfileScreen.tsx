import React, { useState } from 'react';
import { Alert, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View style={styles.mainContainer}>
        {/* Header */}
        <Text style={styles.headerTitle}>My Profile</Text>

        {/* User Info Card with Shadow */}
        <View style={styles.profileCard}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </View>

          {/* Name */}
          <Text style={styles.profileName}>
            {profileData.name}
          </Text>

          {/* Email */}
          <Text style={styles.profileEmail}>
            {profileData.email}
          </Text>

          {/* Account Status Badge */}
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                • {profileData.accountStatus.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics Section with improved styling */}
        <View style={styles.statisticsSection}>
          <Text style={styles.sectionLabel}>STATISTICS</Text>
          <View style={styles.statisticsRow}>
            {/* Quotes Read */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Quotes Read</Text>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statSubtext}>this month</Text>
            </View>

            {/* Favorites */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Favorites</Text>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statSubtext}>saved</Text>
            </View>
          </View>
        </View>

        {/* Streak & Achievements Section */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionLabel}>PROGRESS</Text>

          {/* Reading Streak */}
          <View style={styles.streakCard}>
            <View style={styles.streakContent}>
              <View>
                <Text style={styles.streakLabel}>Reading Streak</Text>
                <Text style={styles.streakNumber}>7 days 🔥</Text>
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View>
            <Text style={styles.achievementsLabel}>ACHIEVEMENTS</Text>
            <View style={styles.achievementsRow}>
              <View style={styles.achievementCard}>
                <Text style={styles.achievementEmoji}>⭐</Text>
                <Text style={styles.achievementText}>Quote Master</Text>
              </View>
              <View style={styles.achievementCard}>
                <Text style={styles.achievementEmoji}>❤️</Text>
                <Text style={styles.achievementText}>Fav Collector</Text>
              </View>
              <View style={styles.achievementCard}>
                <Text style={styles.achievementEmoji}>🎯</Text>
                <Text style={styles.achievementText}>Streak Master</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons with enhanced styling */}
        <View style={styles.buttonsSection}>
          <Pressable
            style={styles.editButton}
            onPress={() => setEditMode(true)}>
            <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
          </Pressable>

          <Pressable 
            style={styles.logoutButton}
            onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>🚪 Logout</Text>
          </Pressable>

          <Pressable style={styles.backButton} onPress={onBackToHome}>
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </Pressable>
        </View>
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={editMode} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <View style={styles.inputSection}>
              {/* Name Input */}
              <View>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Enter your name"
                />
              </View>

              {/* Email Input */}
              <View>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.textInput}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.saveButton}
                onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  setEditMode(false);
                  setEditName(profileData.name);
                  setEditEmail(profileData.email);
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  mainContainer: {
    flex: 1,
    overflow: 'scroll',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerTitle: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: '#29293D',
  },
  profileCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 24,
    elevation: 4,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 64,
    backgroundColor: '#5548EF',
    elevation: 3,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  profileName: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: '#29293D',
  },
  profileEmail: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#7E7D94',
  },
  statusContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    borderRadius: 20,
    backgroundColor: '#F0E8FE',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#5548EF',
  },
  statisticsSection: {
    marginTop: 32,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#8D8CA3',
  },
  statisticsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8D8CA3',
  },
  statNumber: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: '800',
    color: '#5548EF',
  },
  statSubtext: {
    marginTop: 4,
    fontSize: 12,
    color: '#7E7D94',
  },
  progressSection: {
    marginTop: 32,
    gap: 12,
  },
  streakCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 2,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8D8CA3',
  },
  streakNumber: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '800',
    color: '#5548EF',
  },
  achievementsLabel: {
    marginBottom: 12,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#8D8CA3',
  },
  achievementsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  achievementCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 16,
    elevation: 2,
  },
  achievementEmoji: {
    fontSize: 28,
  },
  achievementText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#29293D',
  },
  buttonsSection: {
    marginTop: 40,
    gap: 12,
    paddingBottom: 32,
  },
  editButton: {
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingVertical: 16,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  logoutButton: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    backgroundColor: '#FFE7E7',
    paddingVertical: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  backButton: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#29293D',
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '83%',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#29293D',
  },
  inputSection: {
    marginTop: 24,
    gap: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8D8CA3',
  },
  textInput: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#F8F8FC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#29293D',
  },
  modalButtons: {
    marginTop: 32,
    gap: 12,
  },
  saveButton: {
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingVertical: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelButton: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#29293D',
  },
});

export default ProfileScreen;