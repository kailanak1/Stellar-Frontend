import React from 'react'
import 'react-event-calendar'

const EventCalendar = (props) => {

    const events = [
        {
            start: '2020-04-12',
            end: '2020-04-20',
            eventClasses: 'optionalEvent',
            title: 'Amazing meteor shower',
            description: 'Stars be falling from the sky',
        },
        {
            start: '2020-05-01',
            end: '2020-05-01',
            title: 'Explosion',
            description: 'Ready for a supernova?',
            data: 'maybe there are some random details you want to use later. invite yo\' friends.',
        },
    ];
    
    return (
        <div className='calendar'>
            month={4}
            year={2020}
            events={events} 
            onEventClick={(target, eventData, day) => console.log(eventData) }
        </div>
        )
}

export default EventCalendar;