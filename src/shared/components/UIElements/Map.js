import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef(); //포인터에 대한 참조을 얻기 위함
  
  const { center, zoom } = props;

  useEffect(() => { //첫번째 인자는 실행될 함수, 두번째는 의존성 배열
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });
  
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]); //의존성이 변경될 때 로직 실행

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
