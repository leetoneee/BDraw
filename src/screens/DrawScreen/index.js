import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import ViewShot from "react-native-view-shot";
import styles from './styles';
import { captureRef } from 'react-native-view-shot';
import { debounce } from '../../hooks/debounce';
import AwesomeButton from "react-native-really-awesome-button";
import { Icon } from 'react-native-paper';
import { displayTime } from '../../utils/displayTime';

const { height, width } = Dimensions.get('window');

export default DrawScreen = ({ keyword, onRoundEnd }) => {
    const ref = useRef()
    const [timer, setTimer] = useState(5);

    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [isClearButtonClicked, setIsClearButtonClicked] = useState(false);
    const [label, setLabel] = useState('');
    const [encodeImage, setEncodeImage] = useState('');

    // Reset timer whenever the keyword changes
    // useEffect(() => {
    //     setTimer(5);
    // }, [keyword]);

    // Countdown timer logic
    // useEffect(() => {
    //     if (timer > 0) {
    //         const interval = setInterval(() => {
    //             setTimer(timer - 1);
    //         }, 1000);

    //         return () => clearInterval(interval);
    //     } else {
    //         onRoundEnd();  // Callback to notify the parent component that the round has ended
    //     }
    // }, [timer]);

    const requestAPI = useMemo(() => {
        return debounce((data) => {
            fetch(
                "https://api-inference.huggingface.co/models/kmewhort/beit-sketch-classifier",
                {
                    headers: { Authorization: `Bearer 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` },
                    method: "POST",
                    body: JSON.stringify({ inputs: data }),
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    if (res && res.length > 0) {
                        console.log("🚀 ~ query ~ result:", res)
                        setLabel(res[0].label);
                    }
                })
                .catch((err) => {
                    console.log("🚀 ~ ERR:", err);
                })
        }, 500);
    }, []);

    const handleExport = useMemo(() => {
        return debounce(async () => {
            console.log("🚀 ~ handleClearButtonClick ~ encodeImage: no")
            await captureRef(ref, {
                result: 'base64'
            }).then(
                result => {
                    console.log("🚀 ~ handleClearButtonClick ~ encodeImage: yes")
                    setEncodeImage(result)
                }
            ).catch((err) => {
                console.log("🚀 ~ handleClearButtonClick ~ err:", err)
            })
        }, 500);
    }, []);


    // useEffect(() => {
    //     if (paths)
    //         handleExport();
    // }, [currentPath])

    // useEffect(() => {
    //     if (paths)
    //         requestAPI(encodeImage)
    // }, [encodeImage])

    const onTouchMove = (event) => {
        setIsClearButtonClicked(false);
        const newPath = [...currentPath];

        //get current user touches position
        const locationX = event.nativeEvent.locationX;
        const locationY = event.nativeEvent.locationY;

        // create new point
        const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(0,)},${locationY.toFixed(0)} `;

        // add the point to older points
        newPath.push(newPoint);
        setCurrentPath(newPath);
    };

    const onTouchEnd = () => {
        const currentPaths = [...paths];
        const newPath = [...currentPath];

        // Add newPath to currentPaths
        currentPaths.push(newPath);

        // Reset currentPath
        setCurrentPath([]);

        // Update paths
        setPaths(currentPaths);
    };

    const handleClearButtonClick = async () => {
        setPaths([]);
        setCurrentPath([]);
        setIsClearButtonClicked(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={{ flex: 1 }}>
                    <AwesomeButton
                        backgroundColor='#D3CCBD'
                        backgroundDarker='#B8B09C'
                        textFontFamily='verdana'
                        raiseLevel={5}
                        width={50}
                        borderRadius={10}
                        paddingHorizontal={10}
                    >
                        <Icon
                            source="close"
                            color={'#fff'}
                            size={30}
                        />
                    </AwesomeButton>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                    <Text style={styles.drawText}>Draw: {keyword}</Text>
                    <View style={[styles.timeBg, styles.shadowProp]}>
                        <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 18 }}>{displayTime(timer)}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <AwesomeButton
                        backgroundColor='#D3CCBD'
                        backgroundDarker='#B8B09C'
                        textFontFamily='verdana'
                        raiseLevel={5}
                        width={50}
                        borderRadius={10}
                        paddingHorizontal={10}
                    >
                        <Icon
                            source="forward"
                            color={'#fff'}
                            size={30}
                        />
                    </AwesomeButton>
                </View>

            </View>
            <View style={styles.resultContainer}>
                <Text>fff</Text>
            </View>
            <View style={styles.drawContainer}>
                <Text>fff</Text>

            </View>
            <View style={styles.bottomContainer}>
                <Text>fff</Text>

            </View>
            {/* <ViewShot ref={ref} >
                <View
                    style={styles.svgContainer}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}>
                    <Svg>
                        <Path
                            d={currentPath.join('')}
                            stroke={'red'}
                            fill={'transparent'}
                            strokeWidth={2}
                            strokeLinejoin={'round'}
                            strokeLinecap={'round'}
                        />

                        {paths.length > 0 &&
                            paths.map((item, index) => (
                                <Path
                                    key={`path-${index}`}
                                    d={item.join('')}
                                    stroke={'red'}
                                    fill={'transparent'}
                                    strokeWidth={2}
                                    strokeLinejoin={'round'}
                                    strokeLinecap={'round'}
                                />
                            ))}
                    </Svg>
                </View>
            </ViewShot>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
                <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            {label ? (
                <Text
                    style={{
                        marginTop: 20,
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'black',
                    }}
                >
                    {label}
                </Text>
            ) : null} */}
        </View>
    );
};
