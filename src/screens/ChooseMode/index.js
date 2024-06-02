import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, ImageBackground, Text } from 'react-native';
import styles from './styles';
import background_pen from '../../assets/images/background_pen.png';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';
import InstructModal from '../../components/InstructModal';
import Background from '../../components/Background';

function ChooseMode() {
    const instructRef = useRef();
    const [showInstruct, setShowInstruct] = useState(true);
    return (
        <Background>
            <View style={styles.container}>
                <ImageBackground source={background_pen} resizeMode='contain' style={styles.imagebackground}>
                    <TextGradient
                        style={{ fontSize: 55, fontFamily: 'VampiroOne-Regular',  textAlign: 'center', marginVertical: 15,}}
                        locations={[0,0.5, 1]}
                        colors={["#9333EA","#B557A6", "#DA47FF"]}
                        start={{ x: 0.3, y: 0 }}
                        end={{ x: 0.7, y: 0 }}
                        text="BDraw"
                    />
                </ImageBackground>
                {showInstruct && <InstructModal ref={instructRef} />}
            </View>
        </Background>
    );
}

export default ChooseMode;
