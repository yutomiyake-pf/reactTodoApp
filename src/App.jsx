import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/inputTodo";
import { InCompleteTodos } from "./components/inCompleteTodos";
import { CompleteTodos } from "./components/completeTodos";

export const App = () => {
  const [todoText, setTodoText] = useState(""); //form

  const [incompleteTodos, setIncompleteTodos] = useState([]); //未完了

  const [completeTodos, setCompleteTodos] = useState([]); //完了

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  //追加
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  //削除
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  //完了
  const onClickComplete = (index) => {
    const newInCompleteTodos = [...incompleteTodos];
    newInCompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //戻す
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newInCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodoは5個までです。</p>
      )}

      <InCompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
