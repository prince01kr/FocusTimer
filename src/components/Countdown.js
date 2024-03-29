import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formateTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ 
  minutes = 5, 
  isPaused, 
  onProgress, 
  onEnd
  }) => {

  const [millis, setMillis] = useState(null);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  const interval = React.useRef(null);
  
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const leftTime = time - 1000;
      return leftTime;
    });
  };

 useEffect(()=>{
   onProgress(millis/minutesToMillis(minutes));
   if(millis === 0){
     onEnd();
   }
 },[millis])  
  
 useEffect(()=>{
   setMillis(minutesToMillis(minutes));
 },[minutes])

  useEffect(()=>{
    if(isPaused)
    { 
      if(interval.current) clearInterval(interval.current)
      return;
    }
    interval.current = setInterval(countDown,1000);
    return ()=> clearInterval(interval.current);
  },[isPaused])
  


  return (
    <Text style={styles.text}>
      {formateTime(minute)}:{formateTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: 'white',
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
