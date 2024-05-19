import {
    Canvas,
    Path,
    SkImage,
    SkPath,
    Skia,
    TouchInfo,
    makeImageFromView,
    useTouchHandler,
} from "@shopify/react-native-skia";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { throttle } from "../../hooks/throttle";
import styles from "./styles";

type PathWithColorAndWidth = {
    path: SkPath;
    color: Color;
    strokeWidth: number;
};

export const DrawScreen = () => {
    const [paths, setPaths] = useState<PathWithColorAndWidth[]>([]);
    const [color, setColor] = useState<Color>(Colors[0]);
    const [strokeWidth, setStrokeWidth] = useState(strokes[0]);

    const [label, setLabel] = useState('');

    const handleExport = async () => {
        // Take the snapshot of the view
        const snapshot = await makeImageFromView(ref);
        console.log("🚀 ~ handleExport ~ type of snapshot:", typeof snapshot)
        setImage(snapshot);
        if (snapshot)
            requestAPI(snapshot.encodeToBase64());
    };

    const throttled = useRef(throttle(handleExport, 500))

    useEffect(() => {
        if (paths.length > 0) {
            throttled.current();
        }
    }, [paths]);

    const requestAPI = useMemo(() => {
        return throttle((data: any) => {
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
        }, 1000);
    }, []);



    const onDrawingStart = useCallback(
        (touchInfo: TouchInfo) => {
            setPaths((currentPaths) => {
                const { x, y } = touchInfo;
                const newPath = Skia.Path.Make();
                newPath.moveTo(x, y);
                return [
                    ...currentPaths,
                    {
                        path: newPath,
                        color,
                        strokeWidth,
                    },
                ];
            });
        },
        [color, strokeWidth]
    );

    const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
        setPaths((currentPaths) => {
            const { x, y } = touchInfo;
            const currentPath = currentPaths[currentPaths.length - 1];
            const lastPoint = currentPath.path.getLastPt();
            const xMid = (lastPoint.x + x) / 2;
            const yMid = (lastPoint.y + y) / 2;

            currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
            return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
        });
    }, []);

    const touchHandler = useTouchHandler(
        {
            onActive: onDrawingActive,
            onStart: onDrawingStart,
        },
        [onDrawingActive, onDrawingStart]
    );
    const handleClear = () => {
        setPaths([]);
    };

    // Create a ref for the view you'd like to take a snapshot of
    const ref = useRef<View>(null);
    // Create a state variable to store the snapshot
    const [image, setImage] = useState<SkImage | null>(null);


    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Toolbar
                    color={color}
                    strokeWidth={strokeWidth}
                    setColor={setColor}
                    setStrokeWidth={setStrokeWidth}
                    handleClear={handleClear}
                />
                <View style={{ height: 350, width: 350, marginVertical: 10, marginHorizontal: 10, borderWidth: 1, borderColor: 'black' }}
                    ref={ref}
                    collapsable={false}>
                    <Canvas style={styles.container} onTouch={touchHandler}>
                        {paths.map((path, index) => (
                            <Path
                                key={index}
                                path={path.path}
                                color={path.color}
                                style={"stroke"}
                                strokeWidth={path.strokeWidth}
                            />
                        ))}
                    </Canvas>
                </View>
            </View>

            <View style={styles.bottomContainer}>
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
        </View>
    );
};

const Colors = ["black", "red", "blue", "green", "yellow", "white"] as const;

type Color = (typeof Colors)[number];

type ToolbarProps = {
    color: Color;
    strokeWidth: number;
    setColor: (color: Color) => void;
    setStrokeWidth: (strokeWidth: number) => void;
    handleClear: () => void;
};

const strokes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

const Toolbar = ({
    color,
    strokeWidth,
    setColor,
    setStrokeWidth,
    handleClear
}: ToolbarProps) => {
    const [showStrokes, setShowStrokes] = useState(false);

    const handleStrokeWidthChange = (stroke: number) => {
        setStrokeWidth(stroke);
        setShowStrokes(false);
    };

    const handleChangeColor = (color: Color) => {
        setColor(color);
    };

    return (
        <>
            {showStrokes && (
                <View style={[styles.toolbar, styles.strokeToolbar]}>
                    {strokes.map((stroke) => (
                        <TouchableOpacity
                            onPress={() => handleStrokeWidthChange(stroke)}
                            key={stroke}
                        >
                            <Text style={styles.strokeOption}>{stroke}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <View style={[styles.toolbar]}>
                <Pressable
                    style={styles.currentStroke}
                    onPress={() => setShowStrokes(!showStrokes)}
                >
                    <Text>{strokeWidth}</Text>
                </Pressable>
                <View style={styles.separator} />
                {Colors.map((item) => (
                    <ColorButton
                        isSelected={item === color}
                        key={item}
                        color={item}
                        onPress={() => handleChangeColor(item)}
                    />
                ))}
                <ClearButton onPress={handleClear} />
            </View>
        </>
    );
};

type ColorButtonProps = {
    color: Color;
    isSelected: boolean;
    onPress: () => void;
};

const ColorButton = ({ color, onPress, isSelected }: ColorButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.colorButton,
                { backgroundColor: color },
                isSelected && {
                    borderWidth: 2,
                    borderColor: "black",
                },
            ]}
        />
    );
};

type ClearButtonProps = {
    onPress: () => void;
};

const ClearButton = ({ onPress }: ClearButtonProps) => {
    return (
        <Pressable onPress={onPress} style={[styles.colorButton, { backgroundColor: "red" }]}>
            <Text style={styles.clearButtonText}>Clear</Text>
        </Pressable>
    );
};

