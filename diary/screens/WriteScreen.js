import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import WriteHeader from '../components/WriteHeader';
import uuid from 'uuid/v1';

const { width, height } = Dimensions.get('window');

export default class WriteScreen extends React.Component {
    static navigationOptions = {
        tabBarOnPress:({navigation}) =>{ //Write 라는 이름으로 네비게이터 이동하게끔
            navigation.navigate('Write') //추가 옵션 준거임
        },
    }

    constructor(props){
        super(props)
        this.state = { //기억하고 있어야 할 것들 state 에 작성!!!! ★
            inputTitle: '',
            inputContent: '',
        }
    }
    
    _changeTitle = (value) =>{ //실시간으로 입력되는 text input 값을 onchangetext 에 대입해주는 함수
        this.setState({inputTitle: value})
    }

    _changeContent = (value) =>{
        this.setState({inputContent: value})
    }

    _getToday = () => { //오늘 날짜를 받아올 함수
        tyear = (new Date().getFullYear()).toString()
        tmonth = (new Date().getMonth()).toString()
        tday = (new Date().getDate()).toString()
    }

    _saveText = () => {
        if (this.state.inputTitle !== ''){
            const id = uuid()
            const date = this._getToday()
            const newpost = {
                id : id,
                title: this.state.inputTitle,
                content: this.state.inputContent,
                date: date,
            }
            this.setState(
                { inputTitle: '', inputContent: '', }
            )
        }
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style = {styles.contentContainer}>
                    <WriteHeader saveProps={this._saveText}/>
                    <TextInput
                        onChangeText= {this._changeTitle}
                        value = {this.state.inputTitle}

                        placeholder= "제목을 입력하세요"
                        style={styles.title}
                        returnKeyType="done" />
                    <TextInput
                        onChangeText= {this._changeContent}
                        value = {this.state.inputContent}

                        placeholder= "내용을 입력하세요"
                        multiline={true}
                        style={styles.content}
                        returnKeyType="done" />
                </View>
            </SafeAreaView>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 30,
  },
  contentContainer:{
      width: width - 60,
  },
  title:{
      marginVertical: 30,
      fontSize: 30,
      paddingBottom: 12,
      borderBottomWidth: 2,
  },
  content:{
    fontSize: 20,
  },
});