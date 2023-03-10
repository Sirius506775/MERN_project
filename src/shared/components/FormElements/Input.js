import React, { useEffect, useReducer } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": //dispath가 change라면
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  //재사용 input 컴포넌트
  const [inputState, dispatch] = useReducer(inputReducer, {
    //사용자가 입력한 내용이 유효한지 아닌지도 관리
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  //dispatch가 TOUCH여도 useEffect가 발생할 수 있으므로 객체구조할당을 통해 의존성 입력

  const changeHandler = (event) => {
    //사용자가 뭔가를 입력할 때마다 트리거 , 실행되면 값을 저장하고, 유효성 검사를 실시
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? ( //props.element가 input의 값을 갖는다면 입력 요소를 저장 : 그렇지 않으면 textarea를 저장
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler} //사용자가 입력 요소에서 포커스를 잃었을 때(입력 창을 클릭한 다음 밖을 클릭하는 경우) 트리거
        value={inputState.value} //양방향 바인딩
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value} //양방향 바인딩
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`} // 입력 데이터의 유효성에 따라 추가되는 클래스
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
