import React, {useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button,
    // For IOS to get out of the keypad after entry
    TouchableWithoutFeedback,
    // Keyboard API     
    Keyboard,
    Alert
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {
    const [enteredValue,setEnteredValue] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
     
    const numberInputHandler = inputText => {
        // input validation = replace non numericals with empty string
        setEnteredValue(inputText.replace(/[^0-9]/g,''));  
    };

    const resetInputHandler = () => {
        setEnteredValue("");  
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        // return if invalid value or negative is entered
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be 1 and 99',
                [{text: 'Okay',style: 'destructive', onPress: resetInputHandler}]);
            return;
        }

        setConfirmed(true);
        setEnteredValue('');
        // note enteredValue will still be the actual value the user entered, 
        // until the form has been rendered. Only then will the
        // entered value be set to '', therefore we can use and save the 
        // set the setSelectedNumber = enteredValue BELOW the setEnteredValue = ''
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={()=> props.onStartGame(selectedNumber)} />
            </Card>
    );
    } 

    return(
        // Add Touchablewithoutfeedback for IOS to close
        // the keyboard if tapped outside of numeric input
        // field. Done automatically in Android
        <TouchableWithoutFeedback 
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input 
                    style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    keyboardType="number-pad" 
                    maxLength={2}
                    onChangeText={numberInputHandler} 
                    value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button 
                            title="Reset" 
                            onPress={resetInputHandler} 
                            color={Colors.primary} 
                        />
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title="Confirm" 
                            onPress= {confirmInputHandler}
                            color={Colors.accent}
                        />
                    </View> 
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center'
        // Not needed because it is the default
        // justifyContent: 'flex-start'  
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 90
    },
    input: {
        width:50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;   
