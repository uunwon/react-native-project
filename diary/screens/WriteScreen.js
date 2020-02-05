import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import WriteHeader from '../components/WriteHeader';

const { width, height } = Dimensions.get('window');

export default class WriteScreen extends React.Component {
    static navigationOptions = {
        tabBarOnPress:({navigation}) =>{ //Write 라는 이름으로 네비게이터 이동하게끔
            navigation.navigate('Write') //추가 옵션 준거임
        },
    }
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style = {styles.contentContainer}>
                    <WriteHeader/>
                    <TextInput
                        placeholder= "제목을 입력하세요"
                        style={styles.title}
                        returnKeyType="done" />
                    <TextInput
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