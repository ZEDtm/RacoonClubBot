import React, { useEffect, useState } from 'react';

import Skeleton from '../../../components/ui/Skeletons/Home/HomeSkeleton'
import EventCard from './components/EventCard/EventCard';

import './ViewEventsPage.css'
import Icons from "../../../components/ui/Icons/Icons";

export default function Home() {
    const [events, setEvents] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const _events = [
            {
                _id: '66927ed2b80f846fdb2cb718',
                name: 'Поездка в Крым',
                img: '/image_1.jpg',
                time: '10:00',
                duration: '1д 2ч',
                subscribe_count: 12,
                price: 100,
                date: "12.06.2024",
                editor: 'Александр',
                description: "Мы рады объявить о нашем следующем захватывающем мероприятии. Приглашаем вас стать частью этого удивительного путешествия, где каждый день будет наполнен новыми впечатлениями и воспоминаниями, которые останутся с вами на всю жизнь.",
            },{
                _id: "qweqweqweqwe",
                name: "Экскурсия в Санкт-Петербург",
                img: "/image_2.jpg",
                time: "09:30",
                duration: "2д 1ч",
                subscribe_count: 8,
                price: 150,
                date: "18.07.2024",
                editor: "Елена",
                description: "Приглашаем вас на увлекательную экскурсию по культурной столице России – Санкт-Петербургу. Посетите Эрмитаж, Петропавловскую крепость и многие другие достопримечательности."
            },
            {
                _id: "zxczxczxczxc",
                name: "Поход в горы Кавказа",
                img: "/image_3.jpg",
                time: "08:00",
                duration: "3д 4ч",
                subscribe_count: 15,
                price: 200,
                date: "25.08.2024",
                editor: "Михаил",
                description: "Присоединяйтесь к нам в поход по живописным горам Кавказа. Насладитесь чистым воздухом, великолепными видами и природными водопадами."
            },
            {
                _id: "rtyrtyrtyrty",
                name: "Круиз по Волге",
                img: "/image_4.jpg",
                time: "11:00",
                duration: "4д 3ч",
                subscribe_count: 20,
                price: 250,
                date: "02.09.2024",
                editor: "Анна",
                description: "Отправляйтесь в незабываемое путешествие по великой русской реке Волге. Познакомьтесь с историей и культурой городов, расположенных на её берегах."
            },
            {
                _id: "fghfghfghfgh",
                name: "Фестиваль в Сочи",
                img: "/image_5.jpg",
                time: "12:00",
                duration: "1д 5ч",
                subscribe_count: 10,
                price: 120,
                date: "10.10.2024",
                editor: "Дмитрий",
                description: "Приглашаем вас на яркий и веселый фестиваль в Сочи. Участвуйте в концертах, мастер-классах и других мероприятиях, которые подарят вам множество положительных эмоций."
            },
            {
                _id: "vbnvbnvbnvbn",
                name: "Экскурсия в Казань",
                img: "/image_6.jpg",
                time: "10:30",
                duration: "2д 2ч",
                subscribe_count: 18,
                price: 180,
                date: "15.11.2024",
                editor: "Ольга",
                description: "Откройте для себя уникальную атмосферу города Казань. Посетите главные достопримечательности, такие как Кремль, мечеть Кул-Шариф и многое другое."
            }
    ]
         setEvents(_events)
         setTimeout(1000)
         setLoad(false)
    }, []);

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
            <div className="text-xl text-center font-bold text-[--color-heading]">МЕРОПРИЯТИЯ</div>
            <div className="mr-4 ml-4">
                <div className="flex sm:max-w-md bg-[--custom-input-back] m-4 rounded-tl-2xl rounded-br-2xl space-x-2">
                    <div className="w-8 flex select-none items-center pl-3 sm:text-sm">
                        <Icons type="search" width="1.5rem" height="1.5rem" color="var(--color-text)"/>
                    </div>
                    {/*<img src="/search-icon.svg" className="" alt="asd"></img>*/}
                    <input type="text" name="username" id="username" autoComplete="username"
                           className="focus:ring-0 block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none text-base"
                           placeholder="поиск.."/>
                </div>
            </div>
            {events.map(event => (
                <EventCard event={event} key={event._id}/>
            ))}
        </div>
    );
}