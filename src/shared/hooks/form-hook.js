import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  //state를 선택 관리할 reducer
  switch (action.type) {
    case "INPUT_CHANGE": //dispatch로 받은 action이 'INPUT_CHANGE'이면
      let formIsValid = true; //helper variable
      for (const inputId in state.inputs) {
        //젼역 유효성 검사를 위한 for in
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
          [action.inputId]: { value: action.value, isValid: action.isValid }, //[title]:
        },
        isValid: formIsValid,
      };
    case 'SET_DATA': 
      return {
        inputs: action.inputs,
        isValid : action.formIsValid
      }
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  //사용자지정함수
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  //! 주의할 점은 Input에서 onInput을 호출하고 정보를 전달할 때마다 titleInputHandler()를 트리거하기 때문에
  //NewPlace 컴포넌트의 상태를 바꾸거나 리렌더링한다면 새 titleInputHandler 함수가 생성된다. => 무한루프에 빠질 수 있음
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []); //재사용 inputHandler() 함수
  // 함수와 컴포넌트 함수가 리렌더링될 때마다 새로운 함수 객체가 생성되지 않기 위해 useCallback()을 이용해서 저장하여 재사용한다.
  // 대신 이 함수가 재사용되고 변경되지 않습니다

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({  
      type: "SET_DATA",
      inputs: inputData, //입력된 데이터 전
      formValid: formValidity, //form 유효성 확인
    });
  },[]); //의존성 지정을 하지 않았기에 재성성되지 않는다.

  return [formState, inputHandler, setFormData];
  //formData를 set하거나 이 action을 dispatch할 때마다 setFormData() 호출 가
};
