import React ,{useState , useEffect} from 'react';
import { View, Text ,StyleSheet ,FlatList ,Image ,ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from "@expo/vector-icons";

const RecipesDetailScreen = ({route}) => {
    const {recipes} = route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const checkFavorite =  async () => {
        try {
            const storedFavorite = await AsyncStorage.getItem("favorite");
            let favorite = storedFavorite ? JSON.parse(storedFavorite) : []
            const exits = favorite.some((fav) => fav.idMeal === recipes.idMeal);
            setIsFavorite(exits);
        } 
        catch(error) {
            console.log("Error Loading Favorite ",error)
        }
    }
    useEffect(() => { 
        checkFavorite();     
    }, [])
    
    const ingredientList = [];
    const renderIngredient = ({item}) => (
        <View style={styles.ingredientItem}>
            <MaterialIcons name="check-circle" size={18} color="#ff6f61"/>
            <Text style={styles.ingredientText}>{item}</Text>
        </View>
    );
    const toggleFavorite = async () => {
        try{
            const storedFavorite = await AsyncStorage.getItem("favorite")
            let favorite = storedFavorite ? JSON.parse(storedFavorite) : [] //ถ้ามีค่าให้นำไปใส่ storedFavoite ในรูปแบบ json ถ้าไม่มีให้เป็นค่าว่าง
            if (isFavorite) { 
                //Remove
                favorite = favorite.filter((fav) => fav.idMeal !== recipes.idMeal);
            }
            else { 
                // Add
                favorite.push(recipes)
            }
            await AsyncStorage.setItem("favorite",JSON.stringify(favorite))
            setIsFavorite(!isFavorite);
        }
        catch(error) {
            console.log("Error Saving Favorite ",error)
        }
    }

    for (let i = 0 ; i<=20 ; i++) {
        const ingredient = recipes[`strIngredient${i}`];
        const measure = recipes[`strMeasure${i}`];

        if(ingredient){
            ingredientList.push(`${measure} ${ingredient}`);
        }
    }
    return(
        /*
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <View style={styles.imagecontainer}>
                    <Image
                        style={styles.image}
                        source={{uri: recipes.strMealThumb}}
                    />
                    <Text style={styles.font}>{recipes.strMeal}</Text>
                </View>
                <View>
                    <FlatList
                        data={ingredientList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text>
                                {item.ingredient}  {item.measure} 
                            </Text>
                        )}
                    />
                </View>
            </View>
            <ScrollView>
                <Text>{recipes.strInstructions}</Text>
            </ScrollView>
        </View>
        */
        <FlatList
        data={ingredientList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderIngredient}
        ListHeaderComponent={
            <>
                <View style={styles.header}>
                    <Image style={styles.image} source={{uri : recipes.strMealThumb}}/>
                    <TouchableOpacity 
                        style={styles.favoriteButton}
                        onPress={toggleFavorite}
                    >
                        <MaterialIcons 
                            name = {isFavorite ? "favorite" : "favorite-border"}
                            size = {28}
                            color = {isFavorite ? "#ff6f61" : "#fff"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{recipes.strMeal}</Text>
                    <Text style={styles.category}>{recipes.strCategory}</Text>
                    <Text style={styles.sectionTitle}>ingredients::</Text>
                </View>
            </>
        }
        ListFooterComponent={
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Instructions::</Text>
                <Text style={styles.instructions}>{recipes.strInstructions}</Text>
            </View>
        }
        />
    )
}
const styles = StyleSheet.create({
    /*
    container:{
        flex:1,
        padding: 10,
        flexDirection:"column",
    },
    subcontainer:{
        flexDirection:"row",
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    imagecontainer:{
        flexDirection:"column",
    },
    image:{
        width:150,
        height:150,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'green',
    },
    font:{
        fontSize: 30 ,
        marginHorizontal:2 ,
        fontWeight:"bold"
    },
    content:{
        fontSize: 9 ,
        marginHorizontal:2 ,
    },
    */
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        position: "relative",
    },
    image: {
        width: "100%",
        height: 250,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    favoriteButton: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        padding: 10,
        borderRadius: 50,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    category: {
        fontSize: 16,
        color: "#777",
        textAlign: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
        color: "#ff6f61",
    },
    ingredientItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    ingredientText: {
        fontSize: 16,
        marginLeft: 8,
        color: "#333",
    },
    instructions: {
        fontSize: 16,
        color: "#555",
        marginTop: 5,
        lineHeight: 22,
    },
})
export default RecipesDetailScreen