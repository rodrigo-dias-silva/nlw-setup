import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
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
            <View className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'>
              <Feather
                name='check'
                size={20}
                color={colors.white}
              />
            </View>
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