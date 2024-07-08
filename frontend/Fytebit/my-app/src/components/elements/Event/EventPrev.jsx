import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom';

import styles from './EventPreview.module.css'
import './EventPrev.css';
import Icon from "../../ui/Icons/Icons";


export default function EventPrev({ event }) {
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);
  const [isSwipedRight, setIsSwipedRight] = useState(false);

  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const navigate = useNavigate()

  const bind = useDrag(({ down, movement: [mx] }) => {
    const threshold = 80; // порог для определения, было ли перемещение достаточно сильным
    const maxDistance = 20; // максимальное расстояние, на которое можно перетащить элемент
    if (mx < -threshold && !isSwipedRight) {
      mx = -threshold
      setIsSwipedLeft(true);
      setIsSwipedRight(false);
    }else if (mx > threshold && !isSwipedLeft) {
      mx = threshold
      setIsSwipedLeft(false);
      setIsSwipedRight(true);
    }else if (isSwipedLeft || isSwipedRight ){
      setIsSwipedLeft(false);
      setIsSwipedRight(false);
    }
    api.start({ x: down ? mx : 0 });
  },
  {
    axis: 'x',
    from: () => [x.get()],
  });

  const handleClick = (event_id) => {
    setIsSwipedLeft(false);
    setIsSwipedRight(false);
    api.start({ x: 0 });
    navigate(`/event/${event_id}`)

  };

  return (
    <div className={styles.block}>
      <animated.div {...bind()}  className="relative" style={{ x, touchAction: 'none' }}>
        <div
            className={`shadow-xl event-prev-card ${isSwipedLeft ? 'swiped left' : isSwipedRight ? 'swiped right' : ''}`}
            onDoubleClick={() => handleClick(event._id)}>

          <div>
            <div className={styles.name}>{event.name}</div>
            <img className={styles.image} src={event.img} alt="Event Image"/>
          </div>

          <div className={styles.container1}>
            <div className={styles.svgTextContainer}>
              <Icon type="calendar" width="1rem" height="1rem"/>
              <div className={styles.text}>{event.date}</div>
            </div>

            <div className={styles.svgTextContainer}>
              <Icon type="clock" width="1rem" height="1rem"/>
              <div className={styles.text}>{event.time}</div>
            </div>

            <div className={styles.svgTextContainer}>
              <Icon type="duration" width="1rem" height="1rem"/>
              <div className={styles.text}>{event.duration}</div>
            </div>
        </div>

        <div className={styles.description}>{event.description}</div>

          <div className={styles.container2}>
            <div className={styles.svgTextContainer}>
              <Icon type="person" width="1rem" height="1rem"/>
              <div className={styles.text}>{event.editor}</div>
            </div>
          </div>

        </div>
      </animated.div>
      {/*<div className="absolute flex inset-0 z-[-1] event-prev-card">*/}
      {/*  <div className="w-1/2 bg-red-700">*/}
      {/*    */}
      {/*    <p>Иконка удалить</p> */}
      {/*  </div>*/}
      {/*  <div className="w-1/2 bg-lime-600">*/}
      {/*   <p>Иконка редактировать</p> */}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}