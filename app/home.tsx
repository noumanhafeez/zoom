import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'


const Home = () => {
    const route = useRoute();
    const { email } = route.params;
  return (
    <View style={{top:300}}>
      <Text>{email}</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})