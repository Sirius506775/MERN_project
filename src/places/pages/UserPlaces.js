import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  //주소 더미데이터
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  //useParams hook은 콜론(:)과 함께 부호화한 동적 세그먼트, 즉 매개변수에 액세스할 수 있게 해줌
  const userId = useParams().userId; //부호화된 userId 정보를 액세스
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId); //등록한 장소데이터의 creator가 userId와 같은 데이터로 필터링
  return <PlaceList items={loadedPlaces} />; //items이라는 프로퍼티로 PlaceList 컴포넌트로 전달
};

export default UserPlaces;
