import React ,{useState , useEffect} from 'react';
import { View, Text ,StyleSheet ,TextInput ,FlatList ,Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import Card from '../components/Card';

const HomeScreen = ({navigation}) => {
    const [search , setSearch] = useState("");
    const [recipes , setRecipes] = useState([])
    
    useEffect(() => {
        fetchRecipes();
    }, []);
    
    const fetchRecipes = async() =>{
        try{
            const response = await axios.get(
                "https://www.themealdb.com/api/json/v1/1/search.php?s"
            );
            setRecipes(response.data.meals);
        } catch (error) {
            console.error('Cannot fetching data!!',error);
        }
    };
    return (
        <View style={styles.container}>
            <View>
                <SearchBox
                    placeholder = "Enter your name..."
                    value={search}
                    onChangeText={(value) => setSearch(value)}
                />
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => navigation.navigate("FavoriteScreen" , { recipes: recipes } )}
                >
                    <Text style={styles.buttonText}>Favorite Screen</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={recipes.filter((recipe) => 
                    recipe.strMeal.toLowerCase().includes(search.toLowerCase())
                )}
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold'
    },
    button: {
        borderRadius: 20,
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#41644A'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default HomeScreen;