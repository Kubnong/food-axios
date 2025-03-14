import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image ,TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Card = ({onPress,recipes}) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const checkFavorite = async () => {
        try {
            const storedFavorite = await AsyncStorage.getItem("favorite");
            let favorite = storedFavorite ? JSON.parse(storedFavorite) : [];
            const exists = favorite.some((fav) => fav.idMeal === recipes.idMeal);
            setIsFavorite(exists);
        } catch (error) {
            console.log("Error Loading Favorite ", error);
        }
    };
    useEffect(() => {
        checkFavorite();
    }, []);
    return(
        <TouchableOpacity style={styles.container}
            onPress = {onPress}
        >
            <Image
                style={styles.image}
                source={{uri: recipes.strMealThumb}}
            />
            <View style={styles.textContainer}>
                <Text style={styles.font}>{recipes.strMeal} {isFavorite ? "❤️" : ""}</Text>
                <View style={styles.footer}>
                    <Text style={styles.font}>{recipes.strCategory}</Text>
                    <MaterialIcons name="arrow-forward-ios" size={24} />
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        borderRadius: 1,
        marginHorizontal: 5,
        marginVertical: 6,
        padding: 11,
        shadowColor: '#000',
        shadowOffset: {width: 0 , height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        height:90
    },
    image:{
        width:70,
        height:70,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'green'
    },
    font:{
        fontSize: 16 ,
        marginHorizontal:2 ,
        fontWeight:"bold"
    },
    textContainer:{
        flex: 1,
        paddingLeft: 4,
        justifyContent:'center'
    },
    footer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    }
})
export default Card;