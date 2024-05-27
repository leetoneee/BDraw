import { StyleSheet } from "react-native";

const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;

export const styles = StyleSheet.create({
    group: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    /** Placeholder */
    placeholder: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        height: 400,
        marginTop: 0,
        padding: 24,
        backgroundColor: 'transparent',
    },
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    /** Sheet */
    sheet: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    sheetHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    sheetHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    sheetBody: {
        padding: 24,
    },
    /** Profile */
    profile: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    profileText: {
        fontSize: 34,
        fontWeight: '600',
        color: 'white',
    },
    /** Circle */
    circle: {
        width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
        height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
        borderRadius: 9999,
        backgroundColor: 'white',
        borderWidth: CIRCLE_RING_SIZE,
        borderColor: 'transparent',
        marginRight: 8,
        marginBottom: 12,
    },
    circleInside: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: 9999,
        position: 'absolute',
        top: CIRCLE_RING_SIZE,
        left: CIRCLE_RING_SIZE,
    },
    /** Button */
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        padding: 14,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#000',
        marginBottom: 12,
    },
    btnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});