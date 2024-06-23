import React from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import styles from "./styles";

function getImageSource(name, elemental) {
  return images[elemental] && images[elemental][name] ? images[elemental][name] : null;
}

const images = {
  Earth: {
    Rayfiri: require('../../assets/images/chars/Earth/Rayfiri.png'),
    Volamence: require('../../assets/images/chars/Earth/Volamence.png'),
    Xeranair: require('../../assets/images/chars/Earth/Xeranair.png'),
  }
}

export default function AVT_Ingame({name, elemental, ingame}) {
  const imageSource  = getImageSource(name, elemental);
  return(
    <SafeAreaView style={styles.Container}>
      <View style={styles.ImageContainer}>
      {imageSource ? (
          <Image source={imageSource} resizeMode="contain" style={styles.ImageStyle} />
        ) : (
          <Text>Image not found</Text>
        )}
      </View>
      <View style={styles.NameContainer}>
        <Text style={styles.textStyle}>{ingame}</Text>
      </View>
    </SafeAreaView>
  )
}