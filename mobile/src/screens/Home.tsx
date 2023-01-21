import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'

import Header from '../components/Header'
import HabitDay, { DAY_SIZE } from '../components/HabitDay'
import Loading from '../components/Loading';
import { api } from './../lib/axios';
import dayjs from 'dayjs';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minSummaryDatesSize - datesFromYearStart.length

type SummaryProps = Array<{
  id: string,
  date: string,
  amount: number,
  completed: number,
}>

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('summary')
      setSummary(response.data)

    } catch (error) {
      Alert.alert('Ops, algo deu errado...', 'Não foi possível carregar o sumário de hábitos.')
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }


  return (
    <View className='bg-background flex-1 px-8 pt-16'>
      <Header />
      <View className='flex-row mt-6 mb-2'>
        {
          weekDays.map((weekDay, i) => (
            <Text
              key={`${weekDay}-${i}`}
              className='text-zinc-400 text-xl font-bold text-center mx-1'
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          ))
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {
          summary &&
          <View className='flex-row flex-wrap'>
            {
              datesFromYearStart.map(date => {
                const dayWithHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                })
                return (
                  <HabitDay
                    date={date}
                    amount={dayWithHabits?.amount}
                    completed={dayWithHabits?.completed}
                    key={date.toISOString()}
                    onPress={() => navigate('habit', { date: date.toISOString() })}
                  />
                )
              })
            }

            {
              amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                <View
                  key={i}
                  className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-60'
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))
            }
          </View>
        }
      </ScrollView>

    </View>
  )
}