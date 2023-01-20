import { View, Text, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'

import BackBtn from '../components/BackBtn'
import ProgressBar from '../components/ProgressBar'
import CheckBox from '../components/CheckBox'

interface Params {
  date: string
}

export default function Habit() {
  const route = useRoute()
  const { date } = route.params as Params

  const parseDate = dayjs(date)
  const dayOfWeek = parseDate.format('dddd')
  const dayAndMonth = parseDate.format('DD/MM')

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackBtn />

        <Text className='text-zinc-400 mt-6 font-semibold text-base lowercase'>
          {dayOfWeek}
        </Text>

        <Text className='text-white font-extrabold text-3xl'>
          {dayAndMonth}
        </Text>

        <Text className='text-white'>
          Habit
        </Text>

        <ProgressBar progress={30} />

        <View className='mt-6'>
          <CheckBox title={'Beber 2L de água'}
            checked={false}
          />
          <CheckBox title={'Beber 2L de água'}
            checked={true}
          />
        </View>
      </ScrollView>
    </View>
  )
}