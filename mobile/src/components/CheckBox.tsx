import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

interface Props extends TouchableOpacityProps {
  checked?: boolean
  title: String
}

export default function CheckBox({ title, checked = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={.7}
      className='flex-row mb-2 items-center'
      {...rest}
    >
      {
        checked ?
          (
            <Animated.View
              className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'
              entering={ZoomIn}
              exiting={ZoomOut}
            >
              <Feather
                name='check'
                size={20}
                color={colors.white}
              />
            </Animated.View>
          ) : (
            <View className='h-8 w-8 bg-zinc-800 rounded-lg items-center justify-center' />
          )
      }

      <Text className='text-white ml-3 font-semibold'>
        {title}
      </Text>
    </TouchableOpacity>
  )
}