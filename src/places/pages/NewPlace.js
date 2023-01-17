import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    //구조분해할당을 통해 사용자지정 훅에서 정보들은 반환
    {
      //useReducer같은 stateFull로직은 사용자 지정 hook내부에 존재
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  // React는 사용자 지정 훅(useForm) 안에서 상태를 업데이트하면
  // 사용자 지정 훅을 사용하는 컴포넌트(NewPlace)도 업데이트된다.
  const placeSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs); //send this to the backend
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]} //검증자 구성 객체가 반환
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="description"
        validators={[VALIDATOR_MINLENGTH(5)]} //검증자 구성 객체가 반환
        errorText="Please enter a valid description(at least 5 charactors)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="address"
        validators={[VALIDATOR_REQUIRE()]} //검증자 구성 객체가 반환
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
