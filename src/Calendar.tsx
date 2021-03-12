import React, { useState } from 'react';
import { Button, Modal, Input } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components';
import firebase from './lib/firebase'
import 'firebase/firestore'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

// とりあえず form で登録しているが、今後discordのchatから登録させるようにする
const Calendar: React.FC = () => {
  const event = [
    {
      title: 'Lunch',
      start: '2021-03-20T13:00:00',
      constraint: 'business'
    },
    {
      title: 'Lunch33',
      start: '2021-03-25T09:00:00',
      constraint: 'business'
    },
  ]
  const classes = useStyles();
  const [events, setEvents] = useState(event)
  const [opened, setOpened] = useState<boolean>(false)

  const [title, setTitle] = useState("")
  const [start, setStart] = useState("")
  const [constraint, setConstraint] = useState("")

  const add = () => {
    setOpened(true)
  }

  const setData = () => {
    const newD = {
      title,
      start,
      constraint
    }
    console.log(newD)
    const tmp = events
    tmp.push(newD)
    console.log(tmp)
    setEvents(tmp)
  }

  return (
    <CalendarDiv>
      <Button onClick={add}>追加する</Button>
      <Modal className={classes.modal} open={opened} onClose={() => setOpened(false)}>
        <Fade in={opened}>
          <div className={classes.paper}>
            <Input onChange={(event: React.ChangeEvent<any>) => setTitle(event.target.value)}></Input>
            <Input type="date" onChange={(event: React.ChangeEvent<any>) => setStart(event.target.value)}></Input>
            <Input onChange={(event: React.ChangeEvent<any>) => setConstraint(event.target.value)}></Input>
            <Button onClick={setData}>追加する</Button>
          </div>
        </Fade>
      </Modal>
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