import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewPlace.css";

const formReducer = (state, action) => { //state를 선택 관리할 reducer
  switch (action.type) {
    case 'INPUT_CHANGE': //dispatch로 받은 action이 'INPUT_CHANGE'이면
      let formIsValid = true; //helper variable
      for (const inputId in state.inputs) { //젼역 유효성 검사를 위한 for in
        if (inputId === action.inputId) { 
          formIsValid = formIsValid && action.isValid; 
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid } //[title]:
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, { 
    inputs: { //중첩 객체
      title: { 
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });


  //! 주의할 점은 Input에서 onInput을 호출하고 정보를 전달할 때마다 titleInputHandler()를 트리거하기 때문에
  //NewPlace 컴포넌트의 상태를 바꾸거나 리렌더링한다면 새 titleInputHandler 함수가 생성된다. => 무한루프에 빠질 수 있음
  const titleInputHandler = useCallback((id, isValid, value) => {}, []); //전체 양식의 전반적 유효성과 값을 관리
  const descriptionInputHandler = useCallback((id, isValid, value) => {}, []); //전체 양식의 전반적 유효성과 값을 관리

  // 함수와 컴포넌트 함수가 리렌더링될 때마다 새로운 함수 객체가 생성되지 않기 위해 useCallback()을 이용해서 저장하여 재사용한다.
  // 대신 이 함수가 재사용되고 변경되지 않습니다

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]} //검증자 구성 객체가 반환
        errorText="Please enter a valid title."
        onInput={titleInputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="description"
        validators={[VALIDATOR_MINLENGTH(5)]} //검증자 구성 객체가 반환
        errorText="Please enter a valid description(at least 5 charactors)."
        onInput={descriptionInputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
