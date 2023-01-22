import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function HabitsEmpty() {
  const { navigate } = useNavigation()
  return (

    <Text className='text-zinc-400 text-base'>
      Voce não está monitorando nenhum hábito.{' '}
      <Text
        className='text-violet-400 text-base underline active:text-violet-500'
        onPress={() => navigate('new')}
      >
        Que tal cadastrar um?
      </Text>
    </Text>

  )
}