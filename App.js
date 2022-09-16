import { StatusBar } from 'expo-status-bar';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList} from 'react-native';
import { useState } from 'react';

// Functional component... Course card
function ListItem(props){
  return(
    <View style = {styles.listItem}>
      <Text style = {{fontSize:18}}>{props.name}</Text>
    </View>
  );
}

export default function App() {

  // Data inputs
  const [inputText, setInputText] = useState('');
  const [inputText2, setInputText2] = useState('');
  
  // Setting courses
  const [courseList, setCourseList] = useState([]);

  // Set Total credits
  const [previousVal, setPreviousVal] = useState(0);
  function totCredits(){
    const creditVal = Number(inputText2);
    //setPreviousVal(0)
    const tot = creditVal + previousVal;
    setPreviousVal(tot);
    //tot =0
    return tot;
  }
  
  // Set Total amount
  function totAmount(){
    const credits = totCredits();
    const amount = credits * 3500;
    return amount
  }
  
  // Set total courses
  function totCourses(){
    const count = (courseList.length/2)+1;
    return count;
  }

  // adding course function
  function addText(text1, text2) {
    if (inputText && inputText2 !== ""){
    setCourseList(prev => {
      return [
        ...prev,
        text1,
        text2
      ]
    });
    setInputText();
    setInputText2();
    }
    else{
      alert("input field is empty")
    }
    
  }

  function clear(){
    setCourseList([]);
    setCR(0);
    setTC(0);
    setAM(0);
  }
  
//console.log(courseList)

  // Button function
  const [CR, setCR] = useState(0);
  const [AM, setAM] = useState(0);
  const [TC, setTC] = useState(0);
  function pressHandler(){
    addText(inputText, inputText2);
    setCR(totCredits());
    setAM(totAmount());
    setTC(totCourses());
  }
  

  return (
    <View style = {styles.container}>
      <View style = {styles.headContainer}>
        <Text style = {styles.head}>OUSL Credit Cal</Text>
      </View>

      {/* Bottom bar */}
      <View style = {styles.bottomStatus}>
        <View style = {styles.stat}>
          <Text style = {{fontSize: 16}}>Total credits</Text>
          <Text style = {{fontSize: 16}}>{CR}</Text>
        </View>
        <View style = {styles.stat}>
          <Text style = {{fontSize: 16}}>Total amount</Text>
          <Text style = {{fontSize: 16}}>{AM}</Text>
        </View>
        <View style = {styles.stat}>
          <Text style = {{fontSize: 16}}>Total courses</Text>
          <Text style = {{fontSize: 16}}>{TC}</Text>
        </View>
      </View>

      {/* Content pane */}
      <ScrollView style = {{padding:5, margin: 5}}>
        <FlatList style = {{}}
          data = {courseList}
          renderItem = {({item}) => <ListItem name = {item}/>}
        />
      </ScrollView>

      {/* Data adding bar */}
      <View style = {styles.inputContainer}>
        <TextInput
          multiline
          style = {styles.inputs}
          placeholder='Enter course'
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TextInput
          keyboardType='numeric'
          style = {styles.inputs}
          placeholder='Enter credit amount'
          value={inputText2}
          onChangeText={(text) => setInputText2(text)}
        />
        <TouchableOpacity style = {styles.button} onPress = {() => pressHandler()}>
          <Text style = {{fontSize:18, color:'#fff'}}>Enter</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => clear()} style = {{marginLeft: 310, marginTop:-20}}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    margin: 10,
    marginTop:50
  },
  head:{
    backgroundColor:'#C5B3FF',
    padding:10,
    width: Dimensions.get('window').width,
    textAlign:'center',
    fontSize:20,
    fontWeight:'700'
  },
  headContainer:{
    alignItems:'center'
  },
  bottomStatus:{
    flexDirection:'row',
    backgroundColor:'#C5B3FF',
    borderRadius: 20,
    margin:5
  },
  stat:{
    margin:15,
  },
  inputs:{
    margin:2,
    fontSize:15,
    borderColor:'#C5B3FF',
    borderWidth:2,
    borderRadius:20,
    width: 280,
    height: 40,
    paddingHorizontal: 10
  },
  inputContainer:{
    alignItems:'flex-start',
    marginBottom:20
  },
  button:{
    position:'absolute',
    backgroundColor:'#5E577C',
    marginLeft: 300,
    padding: 10,
    marginTop: 15,
    borderRadius: 15
  },
  listItem:{
    backgroundColor:'#C5B3FF',
    margin:0,
    padding:3,
    
  }
});
