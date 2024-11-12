import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const Callid = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Hide the tab bar when the screen is focused
    navigation.setOptions({ tabBarStyle: { display: 'none' } });

    // Reset tab bar visibility when leaving the screen
    return () => navigation.setOptions({ tabBarStyle: { display: 'flex' } });
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#42275a', '#734b6d']}
      style={[tw`flex-1`]}
    >
      <View style={styles.container}>
        <Text>Join Call</Text>
      </View>
    </LinearGradient>
  );
};

export default Callid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
