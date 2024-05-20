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
import { throttle } from '../../hooks/throttle';

const { height, width } = Dimensions.get('window');

export default DrawScreen = () => {
    const ref = useRef()
    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [isClearButtonClicked, setIsClearButtonClicked] = useState(false);
    const [label, setLabel] = useState('');

    const requestAPI = useMemo(() => {
        return throttle((data) => {
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
        }, 2000);
    }, []);

    const handleExport = async () => {
        // Take the snapshot of the view

        console.log("🚀 ~ handleClearButtonClick ~ encodeImage: no")
        const encodeImage = await captureRef(ref, {
            result: 'base64'
        }).then(
            result => {
                return result
            }
        ).catch((err) => {
            console.log("🚀 ~ handleClearButtonClick ~ err:", err)
        })
        if (encodeImage) {
            console.log("🚀 ~ handleClearButtonClick ~ encodeImage: yes")
            requestAPI(encodeImage);
        }
    };

    const throttled = useRef(throttle(handleExport, 1000))

    useEffect(() => {
        if (currentPath)
            throttled.current();
    }, [currentPath])

    const onTouchMove = (event) => {
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
            <ViewShot ref={ref} >
                <View
                    style={styles.svgContainer}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}>
                    <Svg height={height * 0.7} width={width}>
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
            ) : null}
        </View>
    );
};
