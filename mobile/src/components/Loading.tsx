import { ActivityIndicator, View } from 'react-native'

export default function Loading() {
  return (
    <View className='flex-1 justify-center items-center bg-background'>
      <ActivityIndicator color="#7c3aed" />
    </View>
  )
}