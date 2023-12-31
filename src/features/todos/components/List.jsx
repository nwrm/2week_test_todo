import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleStatusTodo } from "../../../redux/modules/todos.js";
import { Link } from "react-router-dom";

const List = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const onDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const onToggleStatusTodo = (id, isDone) => {
    if (isDone) {
      // 이미 완료된 항목은 취소하기 버튼을 눌렀을 때 완료 상태를 취소로 변경하고 Redux 상태를 업데이트합니다.
      dispatch(toggleStatusTodo(id));
    } else {
      // 아직 완료되지 않은 항목은 완료하기 버튼을 눌렀을 때 완료 상태로 변경하고 Redux 상태를 업데이트합니다.
      dispatch(toggleStatusTodo(id));
    }
  };

  return (
    <StListContainer>
      <h2>Working.. 🔥</h2>
      <StListWrapper>
        {todos.map((todo) => {
          if (!todo.isDone) {
            return (
              <StTodoContainer key={todo.id}>
                <StLink to={`/${todo.id}`} key={todo.id}>
                  <div>상세보기</div>
                </StLink>
                <div>
                  <h2 className="todo-title">{todo.title}</h2>
                  <div>{todo.body}</div>
                </div>
                <StDialogFooter>
                  <StButton
                    borderColor="red"
                    onClick={() => onDeleteTodo(todo.id)}
                  >
                    삭제하기
                  </StButton>
                  <StButton
                    borderColor="green"
                    onClick={() => onToggleStatusTodo(todo.id)}
                  >
                    {todo.isDone ? "취소!" : "완료!"}
                  </StButton>
                </StDialogFooter>
              </StTodoContainer>
            );
          } else {
            return null;
          }
        })}
      </StListWrapper>
      <h2 className="list-title">Done..! 🎉</h2>
      <StListWrapper>
        {todos.map((todo, index) => {
          if (todo.isDone) {
            return (
              <StTodoContainer key={todo.id}>
                <StLink to={`/${index}`} key={todo.id}>
                  <div>상세보기</div>
                </StLink>
                <div>
                  <h2 className="todo-title">{todo.title}</h2>
                  <div>{todo.body}</div>
                </div>
                <StDialogFooter>
                  <StButton
                    borderColor="red"
                    onClick={() => onDeleteTodo(todo.id)}
                  >
                    삭제하기
                  </StButton>
                  <StButton
                    borderColor="green"
                    onClick={() => onToggleStatusTodo(todo.id, todo.isDone)}
                  >
                    {todo.isDone ? "취소!" : "완료!"}
                  </StButton>
                </StDialogFooter>
              </StTodoContainer>
            );
          } else {
            return null;
          }
        })}
      </StListWrapper>
    </StListContainer>
  );
};

export default List;

const StListContainer = styled.div`
  padding: 0 24px;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StTodoContainer = styled.div`
  width: 270px;
  border: 4px solid teal;
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
`;

const StLink = styled(Link)`
  text-decoration: none;
`;

const StDialogFooter = styled.footer`
  display: flex;
  justify-content: end;
  padding: 12px;
  gap: 12px;
`;

const StButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;
