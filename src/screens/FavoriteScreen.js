import React ,{useState , useEffect} from 'react';
import { View, Text , StyleSheet , FlatList} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';

const FavoriteScreen = ({navigation}) => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    const getFavorites = async () => {
        try {
          const storedFavorite = await AsyncStorage.getItem("favorite");
          const favorites = storedFavorite ? JSON.parse(storedFavorite) : [];
          setFavoriteRecipes(favorites);
        } catch (error) {
          console.log("Error loading favorites", error);
        }
      };

    useEffect(() => { 
        getFavorites();     
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteRecipes}
                keyExtractor={(item) => item.idMeal}
                renderItem={({item}) => {
                    return (
                        <Card
                            recipes = {item}
                            onPress = {() => navigation.navigate("RecipesDetailScreen" , {recipes: item})}
                        />
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default FavoriteScreen