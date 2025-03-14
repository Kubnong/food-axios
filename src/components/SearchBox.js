import React from "react";
import { View, Text ,StyleSheet ,TextInput} from 'react-native';
import Feather from "@expo/vector-icons/Feather";

const SearchBox = ({placeholder , value , onChangeText}) => {
    return (
        <View style={styles.container}>
            <Feather name="search" size={26} color="#888" style={styles.icon}/>
            <TextInput
                style={StyleSheet.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin:10,
        flexDirection:"row",
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        padding: 3,
        marginLeft:10
    },
    input:{
        flex: 1,
        padding:10,
        fontSize: 18,
        color:'#333'
    }
})

export default SearchBox;