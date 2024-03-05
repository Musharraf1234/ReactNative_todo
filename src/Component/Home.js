import { Button, FlatList, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View , Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo } from '../Redux/slice'
import { Icon } from 'react-native-vector-icons/AntDesign'

export default function Home() {
    const [title ,setTitle] = useState('')
    const [text ,setText] = useState('')
    const  [showeditecon,setshoweditecon] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [deletemodalVisible, setDeletemodalVisible] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null); 
    const dispatch = useDispatch()

    const handleSubmit = () =>{
       setModalVisible(false)
        setDeletemodalVisible(false);
        if (editingItemId) {
            dispatch(editTodo({ id: editingItemId, title, text }));
            setEditingItemId(null);
        } else {
            if(title == 0){
              Alert.alert('Please Enter Title')
            } else if(text == 0){
                Alert.alert('Please Enter About')
            }
            
            else{
            dispatch(addTodo({ title, text }));
            }
        }
     
        setTitle('');
        setText('');
    }

    const handleEdit = (id, currentTitle, currentText) => {
        setTitle(currentTitle);
        setText(currentText);
        setEditingItemId(id);
        setModalVisible(true)
    
    }

    const handleDelete = (id) =>{
     setDeletemodalVisible(true)
        
    }
   
 const openeditecon = () =>{
    if(showeditecon == true){
        setshoweditecon(false)
    } else{
        setshoweditecon(true)
    }
 }
    const data = useSelector ((state)=>state.slice)

    return (
        <View style={styles.main}>
            
            <View style={{gap:10,flexDirection:"row",width:"100%",alignItems:'center',justifyContent:'center'}}>
                <View style={{width:"70%",gap:10}}>
                    <TextInput 
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Title..."
                        placeholderTextColor={"white"}
                    />
                    <TextInput 
                    
                        style={styles.input}
                        value={text}
                        onChangeText={setText}
                        placeholder="About..."
                        placeholderTextColor={"white"}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={{color:'#A35709',fontSize:40}}> +</Text></TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', marginBottom: 10,gap:20 }}>
                            <TextInput 
                                style={styles.input}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Title"
                            />
                            <TextInput 
                            multiline={true}
                            numberOfLines={8}
                                style={styles.inputmodel}
                                value={text}
                                onChangeText={setText}
                                placeholder="Text"
                            />
                        </View>
                       <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleSubmit()} style={styles.editButton}><Text>Submite</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.editButton}><Text>Close</Text></TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </Modal>
            
            <FlatList
            style={{width:"100%"}}
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <>
                    <TouchableOpacity onPress={()=>openeditecon()}>
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.cardTilte}>{item.title}</Text>
                            <Text style={styles.cardText}>{item.text}</Text>
                        </View>
                        
                         
                            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}><Text style={{color:'#A35709'}}>X</Text></TouchableOpacity>
                       
                        <Modal
        animationType="slide"
        transparent={true}
        visible={deletemodalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setDeletemodalVisible(!deletemodalVisible);
        }}>
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
                        <Text style={styles.modalText}>Delete this task?</Text>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => {
                            dispatch(deleteTodo(item.id)); 
                            setDeletemodalVisible(false);
                        }} style={styles.editButton}><Text>Delete</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setDeletemodalVisible(false)} style={styles.editButton}><Text>Cancel</Text></TouchableOpacity>
                   </View>
                    </View>
        </View>
      </Modal>
                    </View>
                    </TouchableOpacity>
                   {
                    showeditecon ?  <View style={{width:'100%',borderWidth:1,height:40}}>
                         <View style={styles.buttonContainerEdite}>
                        <TouchableOpacity onPress={() => handleEdit(item.id,item.title,item.text)} style={styles.editButton}><Text>Edite</Text></TouchableOpacity>
                       
                        </View>
                    </View> : <></>
                   }
                    </>
                )}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>No tasks</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        padding:20,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#1F1E1B'
    },
    input:{
        borderWidth:1,
        borderColor:'#A35709',
        width:'100%',
        color:'white',
        paddingHorizontal:15
        
    },
    button:{
        borderWidth:1,
        borderColor:'#A35709',
        height:'40%',
        width:'20%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    buttonmodel:{
        borderWidth:1,
        borderColor:'#A35709',
        height:'20%',
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    },
    card: {
       borderColor:'#A35709',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: '100%',
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    cardText: {
        fontSize: 18,
        marginBottom: 5,
        color:'white'
    },
    cardTilte: {
        fontSize: 18,
        marginBottom: 5,
        fontSize:30,
        color:'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width:'100%'
    },
    buttonContainerEdite: {
       
        
        alignItems:'flex-end',
        marginTop: 10,
        width:'100%'
    },
    editButton: {
        backgroundColor: 'lightblue',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    deleteButton: {
    
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'#A35709',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Position modal at the bottom
        alignItems: 'center',
    },
    centeredView:{
        flex: 1,
        justifyContent: 'center', // Position modal at the bottom
        alignItems: 'center',  
    },
    modalView: {
        backgroundColor: '#242320',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:'100%'
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginTop: 20,
        
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color:'white'
    },
    inputmodel:{
        color:'white',
        borderWidth:1,
        borderColor:'#A35709',
       
    },
})
