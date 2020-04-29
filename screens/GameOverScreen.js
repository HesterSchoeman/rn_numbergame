import React, {useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Button,
    Alert 
} from 'react-native';

const GameOverScreen = props => {
    return <View style={styles.screen}>
        <Text>The Game is Over!</Text>
        <Text>Number of rounds: {props.roundsNumber}</Text>
        <Text>The number was: {props.userNumber}</Text>
        <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'

    }
});

export default GameOverScreen;