import React from 'react'
import { width, height } from '../../constants'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

function Loading() {
  return (
    <View style={{ width: width, height: height, backgroundColor: '#00000099', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={true} color={'#fff'} size={'large'} />
    </View>
  )
}

export default Loading