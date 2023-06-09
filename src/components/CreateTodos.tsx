import { useForm } from "react-hook-form";
import { ITodos, categories, todoState } from "../atom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

interface Iform {
  todo: string;
}
//interface를 사용해서 IForm의 각 변수들의 type을 typescript에게 알려준다

const CreateBox = styled.form`
  margin: 20px;
`;

const CreateInput = styled.input`
  text-align: center;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  position: relative;
  background-color: #aaaaaa5a;
  color: ${(props) => props.theme.subBgColor};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.subBgColor};
  }
`;

const Btn = styled.button`
  border: none;
  background-color: ${(props) => props.theme.accentColor};
  font-weight: 600;
  border-radius: 5px;
  margin-left: 5px;
  padding: 3px 5px;

  &:hover {
    background-color: ${(props) => props.theme.subBgColor};
    color: whitesmoke;
  }
`;

function CreateTodos() {
  const setTodos = useSetRecoilState(todoState);
  // useSetRecoilState을 사용하면 atom에 있는 변수의 value값을 수정할수 있다
  const { register, handleSubmit, setValue } = useForm<Iform>();
  // useForm을 사용하여 인풋을 더욱 편리하게 만들어준다
  // register은 인풋의 state값을 받아온다
  // handleSubmit은 onSubmit event를 사용할수있게 만들어준다
  // setValue는 state의 value값을 우리가 설정할수있게 한다
  const handleValid = ({ todo }: Iform) => {
    // handleSubmit에 들어갈 함수를 선언한다
    setTodos((pre) => [
      { text: todo, id: Date.now(), category: categories.TO_DO },
      ...pre,
    ]);
    // setTodos에 원래 있던 배열에 현재 작성한 변수를 추가한다
    setValue("todo", "");
    // todo input박스를 빈값으로 돌려놓는다
  };
  return (
    <CreateBox onSubmit={handleSubmit(handleValid)}>
      <CreateInput {...register("todo")} placeholder="Write here" />
      <Btn>ADD</Btn>
    </CreateBox>
  );
}

export default CreateTodos;
