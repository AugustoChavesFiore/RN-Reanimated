import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

export default function Index() {
  // Valores compartidos para las animaciones
  const titlePosition = useSharedValue(-50);
  const backgroundColor = useSharedValue(0);
  const titleOpacity = useSharedValue(1);

  // Configuración de la animacion de deslizamiento del título
  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(titlePosition.value, { duration: 2000, easing: Easing.out(Easing.exp) }) }],
      opacity: withTiming(titleOpacity.value, { duration: 1000 }),
    };
  });

  // Configuracion de la animacion de desvanecimiento del fondo
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value === 0 ? '#4682b4' : '#ff6347',
    };
  });

  // Efecto de carga inicial
  React.useEffect(() => {
    titlePosition.value = 0;
  }, []);

  // Funcion para manejar el evento de presionar el boton "Iniciar"
  const handleStartPress = () => {
    backgroundColor.value = backgroundColor.value === 0 ? 1 : 0;
    titleOpacity.value = 0;
  };

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <StatusBar style="auto" />
      <Animated.Text style={[styles.title, titleStyle]}>Bienvenido</Animated.Text>
      <TouchableOpacity style={styles.button} onPress={handleStartPress}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    position: 'absolute',
    top: '40%',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#4682b4',
  },
});