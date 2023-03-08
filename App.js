import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native"; // api에서 확인한 dimensions불러오기

// const { width } = Dimensions.get("window");
// console.log(window); // 실제 연결한 모바일 사이즈 확인

const { width: SCREEN_SIZE } = Dimensions.get("window");
// get()적용 => : SCREEN_SIZE
// const SCREEN_WIDTH = Dimensions.get("window").width;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        pagingEnabled // 스크롤시 끝까지 넘겨야 페이지가 넘어가게 만들어줌
        showsHorizontalScrollIndicator={false} //pagingEnabled적용시 생기는 indicator을 숨김
        horizontal
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny day</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny day</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny day</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny day</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    // backgroundColor: "red",
    justifyContent: "center",
    alignContent: "center",
  },
  cityName: {
    fontSize: 58,
    textAlign: "center",
  },
  weather: {
    // flex: 3,
  },
  day: {
    // flex: 1,
    width: SCREEN_SIZE, // 모든 day에 스크린 사이즈 적용
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 170,
  },
  description: {
    fontSize: 28,
  },
});
