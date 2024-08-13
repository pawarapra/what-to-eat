import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Linking, Share, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Button, Text, Icon } from '@rneui/themed';

export default function ExploreDetailScreen({ route, navigation }) {
    const { id } = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
                headers: {
                    Authorization: 'Bearer QHrW80chhE2MK6GR538fmh3VqF8dKP8Eha9xg-7f0L-HdJv78T2LmpwzFh1ivqUV9nVrAeagxdy13xSwo9GyhGe8Y8M9mWNXpeBWXGJOfSurT2QJuUJKu9mGAZwIZnYx',
                },
            });
            setRestaurant(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleExplorePress = () => {
        // Open Yelp URL in default browser
        Linking.openURL(restaurant.url);
    };

    const handleSharePress = async () => {
        try {
            await Share.share({
                message: `Check out this awesome food: ${restaurant.name} - ${restaurant.url}`,
            });
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    if (!restaurant) {
        return (
            <View style={styles.container}>
                <Text>No restaurant found with the provided ID</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image style={styles.Imagemain} source={{ uri: restaurant.image_url }}/>

            <View style={styles.textst}>
                <View style={styles.header}>
                    <View>
                        <Text h2>{restaurant.name}</Text>
                        <Text style={styles.texttype}>{restaurant.categories.length > 0 ? restaurant.categories[0].title : 'No Category'}</Text>
                    </View>
                    <View style={styles.iconmain}>
                    {/* <Icon
                        type='ionicon'
                        name={isFavorite ? 'add-circle' : 'add-circle-outline'}
                        size={25}
                        color={isFavorite ? '#cc0000' : '#ffffff'}
                        onPress={() => toggleFav()}
                    /> */}

                         {/* <Icon type='ionicon' name='add'
                            size={25}
                            color='#ff724c'
                            style={styles.iconadd}
                        /> */}
                        <TouchableOpacity onPress={handleSharePress}>
                            <Icon type='ionicon' name='arrow-redo'
                                size={15}
                                color='#fff'
                                style={styles.iconarrow}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                


                <View style={styles.textsub}>
                    <Text style={styles.textrate}>{restaurant.rating}</Text>
                    <Text>{restaurant.price}</Text>
                </View>
                <View style={styles.textloca}>
                    <Icon type='ionicon' name='location' style={styles.iconloca} />
                    <Text style={styles.locatext}>{restaurant.location.address1}</Text>
                </View>
            </View>
            <Button
                title="EXPLORE"
                raised={true}
                onPress={handleExplorePress}
                buttonStyle={styles.customButton}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    Imagemain: {
        width: '100%',
        height: 280,
    },
    textst:{
        width:"100%",
        paddingHorizontal:16,
        alignItems:'flex-start',
    },
    texttype:{
        fontSize: 15,
        fontFamily: 'RobotoCondensed_400Regular',
        marginTop:-3,
        marginBottom: 10,
    },
    textsub:{
        flexDirection:'row',
    },
    textrate:{
        backgroundColor:'#ff724c',
        paddingVertical:1,
        paddingHorizontal:8,
        borderRadius:5,
        color:'white',
    },
    header:{
        width:"100%",
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    
    iconmain:{
                flexDirection:'row',
            },
        
            iconadd:{
                backgroundColor:'#fff',
                borderRadius:30,
                marginRight:10,
                borderColor:'#ff724c',
                borderWidth: 2,
            },
            iconarrow:{
                backgroundColor:'#ff724c',
                borderRadius:8,
                paddingHorizontal:9,
                paddingVertical:7,
            },

    textloca:{
        flexDirection:'row',
        marginTop:15,
    },
    iconloca:{
        marginLeft:5,
        marginRight:5,
    },
    locatext:{
        fontSize: 18,
        fontFamily: 'RobotoCondensed_400Regular',
        letterSpacing: 1,
    },
    customButton:{
        marginVertical: 10, 
        marginHorizontal:20,
        backgroundColor:'#ff724c', 
        width:350
    },
});







// import { StyleSheet, View, Image, Linking, Share, TouchableOpacity } from 'react-native';
// import { Button, Text, Icon } from '@rneui/themed';

// export default function ExploreDetailScreen({ route, navigation }) {

//     navigation.setOptions({
//         headerStyle: {
//         backgroundColor:'#f5c94a',}
//       });

//     const { foodData } = route.params;

//     const handleExplorePress = () => {
//         Linking.openURL(foodData.url);
//     };

//     const handleSharePress = async () => {
//         try {
//             await Share.share({
//                 message: `Check out this awesome food: ${foodData.name} - ${foodData.url}`,
//             });
//         } catch (error) {
//             console.error('Error sharing:', error.message);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Image style={styles.Imagemain} source={{ uri: foodData.image }}/>

//             <View style={styles.textst}>
//                 <View style={styles.header}>
//                     <View>
//                         <Text h2 >{foodData.name}</Text>
//                         <Text style={styles.texttype}> {foodData.type}</Text>
//                     </View>
//                     <View style={styles.iconmain}>
//                         <Icon type='ionicon' name='add'
//                             size={25}
//                             color='#ff724c'
//                             style={styles.iconadd}
//                         />
//                         <TouchableOpacity onPress={handleSharePress}>
//                             <Icon type='ionicon' name='arrow-redo'
//                                 size={15}
//                                 color='#fff'
//                                 style={styles.iconarrow}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={styles.textsub}>
//                     <Text style={styles.textrate}>{foodData.rating}</Text>
//                     <Text>{foodData.price}</Text>
//                 </View>
//                 <View style={styles.textloca}>
//                     <Icon type='ionicon' name='location'
//                             style={styles.iconloca}
//                         />
//                     <Text style={styles.locatext}>{foodData.location}</Text>
//                 </View>
//             </View>

//             <Button
//                 title="EXPLORE"
//                 raised={true}
//                 onPress={handleExplorePress}
//                 buttonStyle={styles.customButton}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//     },

//     Imagemain: {
//         width: '100%',
//         height: 280,
//     },
//     textst:{
//         width:"100%",
//         paddingHorizontal:16,
//         alignItems:'flex-start',
//     },
//     texttype:{
//         fontSize: 15,
//         fontFamily: 'RobotoCondensed_400Regular',
//         marginTop:-3,
//         marginBottom: 10,
//     },

//     textsub:{
//         flexDirection:'row',
//     },
//     textrate:{
//         backgroundColor:'#ff724c',
//         paddingVertical:1,
//         paddingHorizontal:8,
//         borderRadius:5,
//         color:'white',
//     },


//     header:{
//         width:"100%",
//         flexDirection:'row',
//         justifyContent: 'space-between',
//         alignItems:'center',
//     },

//     iconmain:{
//         flexDirection:'row',
//     },

//     iconadd:{
//         backgroundColor:'#fff',
//         borderRadius:30,
//         marginRight:10,
//         borderColor:'#ff724c',
//         borderWidth: 2,
//     },
//     iconarrow:{
//         backgroundColor:'#ff724c',
//         borderRadius:8,
//         paddingHorizontal:9,
//         paddingVertical:7,
//     },

//     textloca:{
//         flexDirection:'row',
//         marginTop:15,
//     },
//     iconloca:{
//         marginLeft:5,
//         marginRight:5,
//     },
//     locatext:{
//         fontSize: 18,
//         fontFamily: 'RobotoCondensed_400Regular',
//         letterSpacing: 1,
//     },
//     Imagemap:{
//         width: '90%',
//         height: 180,
//     },
//     customButton:{
//         marginVertical: 10, 
//         marginHorizontal:20,
//         backgroundColor:'#ff724c', 
//         width:350
//     },

// });
