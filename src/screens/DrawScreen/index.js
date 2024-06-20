import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import ViewShot from "react-native-view-shot";
import styles from './styles';
import { captureRef } from 'react-native-view-shot';
import { debounce } from '../../hooks/debounce';
import AwesomeButton from "react-native-really-awesome-button";
import { Icon } from 'react-native-paper';
import { displayTime } from '../../utils/displayTime';
import { Dialog, Portal, Button } from 'react-native-paper';
import ColorPicker from '../../components/ColorPicker';
import { colors, timeLimit, strokeWidthPath } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { reset, setEncodeImages, setScoreTable } from '../../redux/drawSlice/drawSlice';
import Tts from 'react-native-tts';
import { throttle } from '../../hooks/throttle';


export default DrawScreen = ({ props, round, onRoundEnd }) => {
    const viewShotRef = useRef()
    const colorPickerRef = useRef();
    const isMounted = useRef(true); // Biến ref để theo dõi trạng thái mount của component
    const intervalRef = useRef(null);
    const dispatch = useDispatch();

    const currentColor = useSelector((state) => state.multiPlayer.currentColor);
    const scoreTable = useSelector((state) => state.draw.scoreTable);
    const keywords = useSelector((state) => state.multiPlayer.keywords);
    const encodeImages = useSelector((state) => state.draw.encodeImages);

    const [endRound, setEndRound] = useState(false);
    const [timer, setTimer] = useState(timeLimit);

    const [visible, setVisible] = useState(false);

    const [allResults, setAllResults] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [isClearButtonClicked, setIsClearButtonClicked] = useState(false);
    const [label, setLabel] = useState('');
    const [encodeImage, setEncodeImage] = useState('');

    const hideDialog = async () => setVisible(false);
    const showDialog = () => setVisible(true);

    const handleVoice = (script) => {
        Tts.setDefaultLanguage('en-US');
        Tts.speak(script);
    };

    useEffect(() => {
        // Khi component mount, đặt isMounted.current là true
        isMounted.current = true;

        // Khi component unmount, đặt isMounted.current là false
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Reset timer whenever the keyword changes
    useEffect(() => {
        setTimer(timeLimit);
    }, [round]);

    // Countdown timer logic
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            if (timer === 0) {
                setEndRound(true);
                setLabel("Sorry, I couldn't guess it.");
                handleVoice("Sorry, I couldn't guess it.")
                handleStoreEncodeImage();
                setTimeout(() => {
                    onRoundEnd();  // Callback to notify the parent component that the round has ended
                }, 2000)
            }
        }
    }, [timer]);


    // handle win game
    useEffect(() => {
        console.log("🚀 ~ useEffect ~ scoreTable:", scoreTable)

        if (scoreTable[round])
            return;

        if (label === keywords[round]) {
            let currentScoreTable = [...scoreTable];
            console.log("🚀 ~ useEffect ~ currentScoreTable:", currentScoreTable)
            currentScoreTable[round] = true;
            console.log("🚀 ~ useEffect ~ currentScoreTable:", currentScoreTable)
            dispatch(setScoreTable(currentScoreTable));

            setLabel(`Oh I know, It's ${keywords[round]}`);
            handleVoice(`Oh I know, It's ${keywords[round]}`);
            handleStoreEncodeImage();

            const timeout = setTimeout(() => {
                handleClearButtonClick();
                onRoundEnd();
            }, 2000);
            console.log("🚀 ~ timeout ~ timeout:", timeout)
        }
        if (label && label !== keywords[round] && !endRound) {
            handleVoice(`or ${label}`);
        }

    }, [label, scoreTable, endRound])

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (scoreTable[round] || endRound)
            return;

        intervalRef.current = setInterval(() => {
            const match = allResults.find(result => result.label === keywords[round]);
            if (match) {
                setLabel(match.label);
                clearInterval(intervalRef.current);
                console.log("🚀 ~ interval ~ allResults:", allResults)
            } else if (allResults.length > 0) {
                if (currentIndex === allResults.length) {
                    setLabel('...');
                    return;
                }
                setLabel(allResults[currentIndex].label);
                setCurrentIndex((prevIndex) => (prevIndex + 1));
            }
        }, 1500);
        console.log("🚀 ~ interval ~ interval:", intervalRef.current)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

    }, [allResults, currentIndex, scoreTable, endRound]);

    useEffect(() => {
        if (paths.length > 0)
            handleExport();
    }, [currentPath, paths])

    useEffect(() => {
        if (paths.length > 0)
            requestAPI(encodeImage)
    }, [encodeImage, paths])

    const handleExport = useMemo(() => {
        return debounce(async () => {
            console.log("🚀 ~ handleExport ~ encodeImage: no");
            if (!isMounted.current) {
                console.log("🚀 ~ returndebounce ~ isMounted.current:", isMounted.current)
                return;
            }
            await captureRef(viewShotRef, {
                result: 'base64'
            }).then(
                result => {
                    console.log("🚀 ~ handleExport ~ encodeImage: yes")
                    setEncodeImage(result)
                }
            ).catch((err) => {
                console.log("🚀 ~ handleExport ~ err:", err)
            })
        }, 500);
    }, []);

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
                        handleApiResponse(res);
                    }
                })
                .catch((err) => {
                    console.log("🚀 ~ ERR:", err);
                })
        }, 1000);
    }, []);

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

    const handleClearButtonClick = () => {
        setPaths([]);
        setCurrentPath([]);
        setAllResults([]);
        setLabel('...');
        setIsClearButtonClicked(true);
    }

    const handleNextRound = () => {
        handleStoreEncodeImage();
        handleClearButtonClick();
        onRoundEnd();
    }

    const hanldeQuit = () => {
        setVisible(false);
        handleClearButtonClick();
        dispatch(reset());
        onRoundEnd('BottomTabs');
    }

    const handleShowColorPicker = () => {
        colorPickerRef.current.show()
    }

    const handleStoreEncodeImage = () => {
        const currentEncodeImage = encodeImage;
        const newEncodeImages = [...encodeImages];
        newEncodeImages.push(currentEncodeImage);
        dispatch(setEncodeImages(newEncodeImages));
        console.log("🚀 ~ encodeImages:", encodeImages.length)
    }

    const handleApiResponse = (apiResponse) => {
        const newResults = [];
        for (let i = 0; i < apiResponse.length; i++) {
            if (!allResults.some(result => result.label === apiResponse[i].label)) {
                newResults.push(apiResponse[i]);
                if (newResults.length >= 5) {
                    break;
                }
            }
        }

        setAllResults(prevResults => [...prevResults, ...newResults]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 'auto', width: 'auto', alignSelf: 'flex-start' }}>
                        <AwesomeButton
                            backgroundColor='#D3CCBD'
                            backgroundDarker='#B8B09C'
                            textFontFamily='verdana'
                            raiseLevel={5}
                            width={50}
                            borderRadius={10}
                            paddingHorizontal={10}
                            onPress={showDialog}
                        >
                            <Icon
                                source="close"
                                color={'#fff'}
                                size={30}
                            />
                        </AwesomeButton>
                    </View>
                </View>
                <View style={{ flex: 3, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                    <Text style={styles.drawText}>Draw: {keywords[round]}</Text>
                    <View style={[styles.timeBg, styles.shadowProp]}>
                        <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 20 }}>{displayTime(timer)}</Text>
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
                        onPress={handleNextRound}
                    >
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#fff"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            className="size-6"
                            viewBox="0 0 24 24"
                            {...props}
                        >
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69Zm9.75 0c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                            />
                        </Svg>
                    </AwesomeButton>
                </View>

            </View>
            <View style={[styles.resultContainer, styles.shadowProp]}>
                <Text style={{ fontSize: 25 }}>{label}</Text>
            </View>
            <View style={styles.drawContainer}>
                <ViewShot ref={viewShotRef} >
                    <View
                        style={styles.svgContainer}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}>
                        <Svg>
                            <Path
                                d={currentPath.join('')}
                                stroke={colors[currentColor]}
                                fill={'transparent'}
                                strokeWidth={strokeWidthPath}
                                strokeLinejoin={'round'}
                                strokeLinecap={'round'}
                            />

                            {paths.length > 0 &&
                                paths.map((item, index) => (
                                    <Path
                                        key={`path-${index}`}
                                        d={item.join('')}
                                        stroke={colors[currentColor]}
                                        fill={'transparent'}
                                        strokeWidth={strokeWidthPath}
                                        strokeLinejoin={'round'}
                                        strokeLinecap={'round'}
                                    />
                                ))}
                        </Svg>
                    </View>
                </ViewShot>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={colors[currentColor]}
                        stroke="black"
                        strokeWidth={1}
                        width={50}
                        height={50}
                        className="size-6"
                        viewBox="0 0 24 24"
                        {...props}
                    >
                        <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                        />
                    </Svg>
                    <AwesomeButton
                        backgroundColor='#D3CCBD'
                        backgroundDarker='#B8B09C'
                        textFontFamily='verdana'
                        raiseLevel={5}
                        width={70}
                        height={50}
                        borderRadius={10}
                        paddingHorizontal={10}
                        onPress={handleShowColorPicker}
                    >
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../../assets/images/paint-palette_2272364.png')} />
                    </AwesomeButton>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <AwesomeButton
                        backgroundColor='#D3CCBD'
                        backgroundDarker='#B8B09C'
                        textFontFamily='verdana'
                        raiseLevel={5}
                        width={60}
                        height={40}
                        borderRadius={10}
                        paddingHorizontal={10}
                        onPress={handleClearButtonClick}
                    >
                        <Icon
                            source="delete"
                            color={'red'}
                            size={30}
                            backgroundColor={'red'}
                        />
                    </AwesomeButton>
                </View>
            </View>

            <ColorPicker ref={colorPickerRef} />

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}  >
                    <Dialog.Icon icon="alert" color='#FFD139' size={30} />
                    <Dialog.Title style={{ fontFamily: 'VampiroOne-Regular' }}>Are you sure you want to Quit?</Dialog.Title>
                    <Dialog.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <AwesomeButton
                                backgroundColor='#FFD139'
                                backgroundDarker='#E2B537'
                                textFontFamily='verdana'
                                raiseLevel={5}
                                width={100}
                                height={40}
                                paddingHorizontal={10}
                                onPress={hideDialog}
                            >
                                <Text style={{
                                    fontFamily: 'RobotoMono-Regular', color: '#fff'
                                }}>Cancel</Text>
                            </AwesomeButton>
                            <AwesomeButton
                                backgroundColor='#FFD139'
                                backgroundDarker='#E2B537'
                                textFontFamily='verdana'
                                raiseLevel={5}
                                width={100}
                                height={40}
                                paddingHorizontal={10}
                                onPress={hanldeQuit}
                            >
                                <Text style={{
                                    fontFamily: 'RobotoMono-Regular', color: '#fff'
                                }}>Quit</Text>
                            </AwesomeButton>
                        </View>
                    </Dialog.Content>
                </Dialog>
            </Portal>

        </View>
    );
};
