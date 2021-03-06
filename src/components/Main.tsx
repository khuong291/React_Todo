import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './App';
import Todo from '../models/Todo';
import TodoCard from './TodoCard';
import FilterBar from './FilterBar';
import AddTodoForm from './AddTodoForm';

interface Props {
  todoList: Todo[];
  filterStatus: string;
}

class Main extends React.Component<Props> {
  getTodoList() {
    const { filterStatus, todoList } = this.props;
    switch (filterStatus) {
      case 'SHOW_COMPLETED':
        return todoList.filter(todo => todo.completed);
      case 'SHOW_INCOMPLETED':
        return todoList.filter(todo => !todo.completed);
      default:
        return todoList;
    }
  }

  render() {
    return (
      <div>
        <AddTodoForm />
        <FilterBar />
        {this.getTodoList().map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    todoList: state.todoList,
    filterStatus: state.filterStatus,
  };
}

export default connect(mapStateToProps)(Main);
