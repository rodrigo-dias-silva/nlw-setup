import { useEffect, useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'

import { api } from '../lib/axios'
import { genarateProgressPercentage } from './../utils/generate-progress-percentage';

import BackBtn from '../components/BackBtn'
import ProgressBar from '../components/ProgressBar'
import CheckBox from '../components/CheckBox'
import Loading from '../components/Loading'
import HabitsEmpty from '../components/HabitsEmpty'
import clsx from 'clsx'

interface Params {
  date: string
}

interface DayInfoProps {
  completedHabits: string[],
  possibleHabits: {
    id: string,
    title: string,
  }[]
}

export default function Habit() {
  const [loadind, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabit, setCompletedHabit] = useState<string[]>([])

  const route = useRoute()
  const { date } = route.params as Params

  const parseDate = dayjs(date)
  const isDateInPast = parseDate.endOf('day').isBefore(new Date())
  const dayOfWeek = parseDate.format('dddd')
  const dayAndMonth = parseDate.format('DD/MM')

  const habitsProgress = dayInfo?.possibleHabits.length ? genarateProgressPercentage(dayInfo.possibleHabits.length, completedHabit.length) : 0

  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get('day', { params: { date } })

      setDayInfo(response.data)
      setCompletedHabit(response.data.completedHabits)

    } catch (error) {
      console.log(error);
      Alert.alert('Ops...', 'Não foi possivel carregar as informações.')
    }
    finally {
      setLoading(false)
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`)

      if (completedHabit.includes(habitId)) {
        setCompletedHabit(prevState => prevState.filter(habit => habit !== habitId))
      } else {
        setCompletedHabit(prevState => [...prevState, habitId])
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ops...', 'Não foi possivel carregar as informações dos hábitos.')
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loadind) {
    return (
      <Loading />
    )
  }

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

        <ProgressBar progress={habitsProgress} />

        <View className={clsx('mt-6', { ['opacity-50']: isDateInPast })}>
          {
            dayInfo?.possibleHabits ?
              dayInfo?.possibleHabits.map(habit => (
                <CheckBox
                  key={habit.id}
                  title={habit.title}
                  checked={completedHabit.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                  disabled={isDateInPast}
                />
              )) :
              <HabitsEmpty />
          }
        </View>

        {
          isDateInPast && (
            <Text className='text-white mt-10 text-center'>
              Você não pode editar um hábito em uma data passada.
            </Text>
          )
        }
      </ScrollView>
    </View>
  )
}