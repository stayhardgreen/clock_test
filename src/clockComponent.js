import React, { useEffect, useState } from "react";
import "rsuite/dist/rsuite.min.css";
import { Tooltip, Whisper } from "rsuite";
import moment from 'moment';
import background from './images.png';

export default function ClockComponent() {
  const [curTime, setCurTime] = useState(new Date());
  const [timer, setTimer] = useState(null);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    if (timer == undefined) {
      const _timer = setInterval(() => {
        setCurTime(new Date());
        const _str = moment().format('hh:mm:ss');
        setTimeStr(_str);
      }, 1000);
      setTimer(_timer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return (
    <Whisper
      followCursor
      placement="topStart"
      speaker={<Tooltip>{timeStr}</Tooltip>}
    >
      <div className="clock">
        <div
          className="hour_hand"
          style={{
            transform: `rotateZ(${curTime.getHours() * 30 + curTime.getMinutes() / 2}deg)`,
          }}
        />
        <div
          className="minute_hand"
          style={{
            transform: `rotateZ(${curTime.getMinutes() * 6 + curTime.getSeconds()/10}deg)`,
          }}
        />
        <div
          className="second_hand"
          style={{
            transform: `rotateZ(${curTime.getSeconds() * 6}deg)`,
          }}
        />
      </div>
    </Whisper>
  );
}
