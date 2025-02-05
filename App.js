import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Task from './src/screens/Task'

const { width } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Today's activities
        </Text>
        <Text>
          <Task/>
        </Text>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: "30%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.07, // Maior tamanho para o título
    fontWeight: "bold",
    color: "#1A73E8", // Azul vibrante
    marginBottom: "3%",}
});
