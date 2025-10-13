import { Button } from '@/components/ui/button'
import React from 'react'
import { useUsersStore } from '@/store/useUsersStore'

const Details = () => {
  const { getTeacherById } = useUsersStore()

  const fetchTeacher = async () => {
    try {
      const teacher = await getTeacherById(3)
      console.log(teacher)
    } catch (error) {
      console.error('Failed to fetch teacher:', error)
    }
  }

  return (
    <div>
      <Button onClick={fetchTeacher}>
        Fetch Teacher
      </Button>
    </div>
  )
}

export default Details
