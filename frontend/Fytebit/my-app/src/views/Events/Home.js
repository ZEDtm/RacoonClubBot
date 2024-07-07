import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { getEvents } from '../../api/Client';

import Skeleton from '../../components/ui/Skeletons/Home/HomeSkeleton'
import EventPrev from '../../components/elements/Event/EventPrev';

export default function Home() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [load, setLoad] = useState(true);

    const [filteredEvents, setFilteredEvents] = useState([]);
    const [sortBy, setSortBy] = useState('date');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            getEvents(token)
                .then(data => {
                    if (data.events) {
                        setEvents(data.events);
                        setFilteredEvents(data.events);
                    }
                })
                .catch(error => {
                    console.error('Error fetching events:', error);
                })
                .finally(() => {
                    setLoad(false);
                });
        } else {
            setLoad(false);
        }
    }, []);

    useEffect(() => {
        let sortedEvents = [...events];
        if (sortBy === 'date') {
            sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortBy === 'name') {
            sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
        }
        setFilteredEvents(sortedEvents);
    }, [sortBy, events]);

    useEffect(() => {
        const filtered = events.filter(event => 
            event.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEvents(filtered);
    }, [searchTerm, events]);

    if (load) {
        return (
        <>
            <h2>Events</h2>
            <Skeleton />
            <Skeleton />
        </>);
    }

    return (
        <div className='block'>
            
            <h2>Events</h2>
            <div>
            <input 
                    type="text" 
                    placeholder="Search by name" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                />
                <label>
                    Sort by:
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="name">Name</option>
                    </select>
                </label>
                </div>
            {filteredEvents.map(event => (
                <EventPrev event={event} key={event._id}/>
            ))}
        </div>
    );
}