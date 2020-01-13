import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Header from './app/components/Header';
import Subtitle from './app/components/Subtitle';
import Input from './app/components/Input';
import Listitem from './app/components/Listitem';

export default class App extends React.Component { //function은 state를 다루지 못하기에 class로 !
  constructor(props) { //생성자
    super(props); //React.Component가 초기에 가진 성질을 App이라는 Class component 로 그대로 가져와라
    this.state = { //[{} <- object 모양 //초기 state
      inputValue: '',
      todos: []
    }
  }

  _makeTodoItem = ({ item, index }) => { //method 선언
    return (
      <Listitem
        name={item.title}
        isComplete={item.iscomplete}
        changeComplete={() => { //변경 사항을 나타내기 위한 함수 (익명함수에 화살표함수)
          const newTodo = [...this.state.todos]
          newTodo[index].iscomplete = !newTodo[index].iscomplete
          this.setState({ todos: newTodo })
        }}
        deleteItem={() => {
          const newTodo = [...this.state.todos]
          newTodo.splice(index, 1) //삭제가 실행되면 자기 자신의 index를 splice (자름)
          this.setState({ todos: newTodo })
        }}  />
    );
  }

  _changeText = (value) => {
    this.setState({ inputValue: value });
  } //텍스트가 변경되면 그 value 값을 받아서 inputValue 값을 바꿈!

  _addTodoItem = () => {
    if (this.state.inputValue !== "") {
      const prevTodo = this.state.todos;
      const newTodo = { title: this.state.inputValue, iscomplete: false };

      this.setState({
        inputValue: '',
        todos: prevTodo.concat(newTodo)
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headercenter}>
          <Header />
        </View>

        <View style={styles.subtitleposi}>
          <Subtitle title="To-Do 입력" />
          <Input
            value={this.state.inputValue}
            changeText={this._changeText}
            addTodoItem={this._addTodoItem} />
        </View>

        <View style={styles.subtitleposi}>
          <Subtitle title="해야 할 일 목록" />
          <FlatList
            data={this.state.todos}
            renderItem={this._makeTodoItem}
            keyExtractor={(item, index) => { return `${index}` }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({ //JSX 에서 스타일 지정하는 기법
  container: {
    flex: 1, // <View> 가 우리 화면을 어떻게 유동적으로 가지는지
    backgroundColor: '#fff',
    //alignItems: 'center', => 행 기준 정렬 / justifyContent: 'center', => 열 기준 정렬
  },
  headercenter: {
    alignItems: 'center',
  },
  subtitleposi: {
    marginLeft: 50,
  },
});
