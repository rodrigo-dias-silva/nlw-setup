import { View, Text } from 'react-native'
import React from 'react'

interface Props {
  progress?: number
}

export default function ProgressBar({ progress = 0 }: Props) {
  return (
    <View className='w-full h-3 rounded-xl bg-zinc-700 mt-4'>
      <View
        className='h-3 rounded-xl bg-violet-600'
        style={{ width: `${progress}%` }}
      />
    </View>
  )
}