import { StyleSheet, View, Image } from 'react-native';
import { Button } from '@rneui/themed';

export default function LandingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.pic}>
                <Image style={styles.titleImage} source={require('../assets/iconpic.png')} />
                <Image style={styles.nameImage} source={require('../assets/iconname.png')} />
            </View>

            <View style={styles.landingnav}>
                <Button
                    title="LET START"


                    icon={{
                        name:'arrow-forward-circle-outline',
                        type:'ionicon',
                        size: 25,
                        color: '#333',
                    }}
                    iconPosition='right'
                    raised={true}
                    onPress={() => navigation.navigate('Home')}
                    buttonStyle={styles.customButton}
                    titleStyle={styles.customButtonText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe175',
    },
    pic: {
        alignItems: 'center',
        marginVertical: 50,
    },
    titleImage: {
        height: 333,
        width: 300,
        marginBottom:3,
    },
    nameImage: {
        
        height: 230,
        width: 300,
    },
    landingnav: {
        alignItems: 'flex-end',
        marginRight: 10, 
    },
    customButton: {
        backgroundColor: 'transparent',
    },
    customButtonText: {
        color: '#1e1e1e', 
    },
});
