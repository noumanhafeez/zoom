// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'tailwind-react-native-classnames';

export const HomeScreen = () => {
  // Sample data for call history
  const allCalls = [
    { id: '1', type: 'Incoming', status: 'Missed', name: 'John Doe' },
    { id: '2', type: 'Outgoing', status: 'Answered', name: 'Jane Smith' },
    { id: '3', type: 'Incoming', status: 'Missed', name: 'Alice Brown' },
    // Add more call data as needed
  ];

  const [showMissedCalls, setShowMissedCalls] = useState(false);

  // Filtered call history based on toggle selection
  const displayedCalls = showMissedCalls
    ? allCalls.filter((call) => call.status === 'Missed')
    : allCalls;

  return (
    <LinearGradient colors={['#42275a', '#734b6d']} style={[tw`flex-1`] }>
      <View style={styles.container}>
        <Text style={styles.header}>Call History</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !showMissedCalls && styles.activeButton,
            ]}
            onPress={() => setShowMissedCalls(false)}
          >
            <Text style={styles.toggleText}>All Calls</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              showMissedCalls && styles.activeButton,
            ]}
            onPress={() => setShowMissedCalls(true)}
          >
            <Text style={styles.toggleText}>Missed Calls</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={displayedCalls}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.callItem}>
              <Text style={styles.callName}>{item.name}</Text>
              <Text style={styles.callType}>
                {item.type} - {item.status}
              </Text>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:60,
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#614385',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#734b6d',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  callItem: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    marginBottom: 8,
  },
  callName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  callType: {
    fontSize: 14,
    color: '#ddd',
  },
});
