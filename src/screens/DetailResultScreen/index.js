import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react'
import { Button, Text, View, Image, PermissionsAndroid, Alert, Platform } from 'react-native';
import Background from '../../components/Background';
import styles from './styles';
import AwesomeButton from "react-native-really-awesome-button";
import { Icon } from 'react-native-paper';
import Svg, { Path } from "react-native-svg"
import { useSelector } from 'react-redux';
import ViewShot, { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";

function DetailResultScreen({ props, route }) {
    const navigation = useNavigation();
    const viewShotRef = useRef()

    const { index } = route.params;

    const scoreTable = useSelector((state) => state.draw.scoreTable);
    const keywords = useSelector((state) => state.draw.keywords);
    const encodeImages = useSelector((state) => state.draw.encodeImages);
    console.log("🚀 ~ DetailResultScreen ~ encodeImages:", encodeImages[index]);

    const [imageUri, setImageUri] = useState('');


    const handleGoBack = () => {
        // const popAction = StackActions.pop(1);
        // navigation.dispatch(popAction);
        navigation.goBack();
    };

    console.log("🚀 ~ DetailResultScreen ~ index:", index)


    const handleShare = async () => {
        const uri = await captureRef(viewShotRef, {
            format: "png",
            quality: 1,
        }).then(
            (uri) => {
                console.log("Image saved to", uri);
                return uri;
            },
            (error) => console.error("Oops, snapshot failed", error)
        );


        Share.open({ url: uri })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    // get permission on android
    const getPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                {
                    title: 'Image Download Permission',
                    message: 'Your permission is required to save images to your device',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
            Alert.alert(
                '',
                'Your permission is required to save images to your device',
                [{ text: 'OK', onPress: () => { } }],
                { cancelable: false },
            );
        } catch (err) {
            // handle error as you please
            console.log('err', err);
        }
    };

    // download image
    // const downloadImage = async () => {
    //     try {
    //         // react-native-view-shot caputures component
    //         const uri = await captureRef(viewShotRef, {
    //             format: 'png',
    //             quality: 1,
    //         });

    //         if (Platform.OS === 'android') {
    //             const granted = await getPermissionAndroid();
    //             if (!granted) {
    //                 return;
    //             }
    //         }

    //         // cameraroll saves image
    //         const image = CameraRoll.save(uri, 'photo');
    //         if (image) {
    //             Alert.alert(
    //                 '',
    //                 'Image saved successfully.',
    //                 [{ text: 'OK', onPress: () => { } }],
    //                 { cancelable: false },
    //             );
    //         }
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // };



    return (
        <Background>
            <View style={styles.container}>
                <View style={{ marginHorizontal: 10, marginVertical: 10, alignSelf: 'flex-start' }}>
                    <View style={styles.aweBtnView}>
                        <AwesomeButton
                            backgroundColor='#D3CCBD'
                            backgroundDarker='#B8B09C'
                            textFontFamily='verdana'
                            raiseLevel={5}
                            width={130}
                            borderRadius={10}
                            paddingHorizontal={10}
                            onPress={handleGoBack}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, paddingHorizontal: 10 }}>
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="white"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    width={30}
                                    height={30}
                                    className="size-6"
                                    {...props}
                                >
                                    <Path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                    />
                                </Svg>
                                <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 25, color: '#fff', }}>Back</Text>

                            </View>


                        </AwesomeButton>
                    </View>
                </View>

                <View style={styles.topContainer}>
                    <Text style={styles.modalText}>You were asked to draw {keywords[index]}</Text>
                    {scoreTable[index] ?
                        <Text style={styles.shareText}>You drew this, and the neural net recognized it.</Text>
                        : <Text style={styles.shareText}>You drew this, and the neural net didn't recognize it.</Text>
                    }
                </View>

                <View style={styles.midContainer}>
                    <ViewShot ref={viewShotRef}>
                        <View style={{ width: 'auto', height: 'auto', backgroundColor: '#FFD139', borderRadius: 20 }}>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', }}>
                                {scoreTable[index] ?
                                    <Icon
                                        source='check'
                                        size={50}
                                        color='green'
                                    />
                                    : <Icon
                                        source='close'
                                        size={50}
                                        color='red'
                                    />
                                }
                                <Text style={[styles.modalText, { fontSize: 40 }]}>{keywords[index]}</Text>
                            </View>
                            <View style={[styles.svgContainer, styles.shadowProp]}>
                                <Image
                                    style={{ width: '100%', height: '100%', resizeMode: 'contain', }}
                                    source={{
                                        uri: `data:image/png;base64,${encodeImages[index]}`,
                                    }}
                                />
                            </View>
                        </View>
                    </ViewShot>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <View style={styles.aweBtnView}>
                                <AwesomeButton
                                    backgroundColor='#5CA8DD'
                                    backgroundDarker='#397EA9'
                                    textFontFamily='verdana'
                                    raiseLevel={5}
                                    width={150}
                                    borderRadius={10}
                                    paddingHorizontal={10}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, paddingHorizontal: 10 }}>
                                        <Svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="white"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="black"
                                            width={30}
                                            height={30}
                                            className="size-6"
                                            {...props}
                                        >
                                            <Path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                            />
                                        </Svg>
                                        <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 20, color: '#fff', }}>Download</Text>

                                    </View>


                                </AwesomeButton>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <View style={styles.aweBtnView}>
                                    <AwesomeButton
                                        backgroundColor='#3665A6'
                                        backgroundDarker='#264973'
                                        textFontFamily='verdana'
                                        raiseLevel={5}
                                        width={150}
                                        borderRadius={10}
                                        paddingHorizontal={10}
                                        onPress={handleShare}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, paddingHorizontal: 10 }}>
                                            <Svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 48"
                                                strokeWidth={1.5}
                                                width={30}
                                                height={30}
                                                {...props}
                                            >
                                                <Path d="M35.484 5.984a1.5 1.5 0 00-1.045 2.577L36.88 11H35.5C23.643 11 14 20.643 14 32.5a1.5 1.5 0 103 0C17 22.265 25.265 14 35.5 14h1.379l-2.44 2.44a1.5 1.5 0 102.122 2.12l4.87-4.87a1.5 1.5 0 00-.007-2.387L36.56 6.439a1.5 1.5 0 00-1.077-.455zM12.5 6C8.928 6 6 8.928 6 12.5v23c0 3.572 2.928 6.5 6.5 6.5h23c3.572 0 6.5-2.928 6.5-6.5v-8a1.5 1.5 0 10-3 0v8c0 1.95-1.55 3.5-3.5 3.5h-23C10.55 39 9 37.45 9 35.5v-23C9 10.55 10.55 9 12.5 9h8a1.5 1.5 0 100-3h-8z" />
                                            </Svg>
                                            <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 20, color: '#fff', }}>Share</Text>

                                        </View>


                                    </AwesomeButton>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Background >
    )
}

export default DetailResultScreen