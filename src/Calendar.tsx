import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import firebase from './lib/firebase'
import 'firebase/firestore'
import * as Types from './Types/main'

const Calendar: React.FC = () => {
  useEffect(() => {
    async function getInitData() {
      const db = firebase.firestore()
      const ref = db.collection('/data/')
      const qs = await ref.get()
      const tmp: any = qs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))
      setEvents(tmp)
    }

    getInitData()
  }, [])

  const [events, setEvents] = useState<Types.event[] | undefined>(undefined)

  return (
    <CalendarDiv>
      <FullCalendar
        locale='ja'
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        slotDuration='00:30:00'
        selectable={true}
        weekends={true}
        allDaySlot={false}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '0:00',
          endTime: '24:00',
        }}
        titleFormat={{
          year: 'numeric',
          month: 'short',
          day: "numeric",
        }}
        headerToolbar={{
          start: 'title',
          center: 'prev next',
          end: 'dayGridMonth timeGridWeek',
        }}
        events={events}
      />
    </CalendarDiv>
  )
}

const CalendarDiv = styled.div`
  margin: 10px 100px;
`

export default Calendar