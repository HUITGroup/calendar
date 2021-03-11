import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCZ5JxkktT46Lh_baJu3IsNZcJkQ9-dzsk",
  authDomain: "huit-calendar.firebaseapp.com",
  databaseURL: "https://huit-calendar-default-rtdb.firebaseio.com",
  projectId: "huit-calendar",
  storageBucket: "huit-calendar.appspot.com",
  messagingSenderId: "505724746503",
  appId: "1:505724746503:web:6f35c07882c086e2d823a2",
  measurementId: "G-VN8JPQVHKR"
};

let fbEvents:Object[];

firebase.initializeApp(firebaseConfig);

// let eventRef=firebase.database().ref('/2021');
// eventRef.on('value', (snapshot)=>{
//   let obj = snapshot.val();
//   let keys = Object.keys(obj)
//   console.log(keys)
//   for (let i=0; i <= keys.length; i++){
//     let k = keys[i]
//     let data = obj[k]
//     console.log(data)
//     fbEvents[i]=data
//   }
// });

const Calendar: React.FC = () => {
  return (
    <div>
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
          // events={              }
        />
      </CalendarDiv>
    </div>
  )
}

const CalendarDiv = styled.div`
  margin: 10px 100px;
`

export default Calendar