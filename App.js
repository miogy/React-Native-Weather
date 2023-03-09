import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native"; // api에서 확인한 dimensions불러오기

// const { width } = Dimensions.get("window");
// console.log(window); // 실제 연결한 모바일 사이즈 확인

const { width: SCREEN_SIZE } = Dimensions.get("window");
// get()적용 => : SCREEN_SIZE
// const SCREEN_WIDTH = Dimensions.get("window").width;

const API_KEY = "";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);

  const ask = async () => {
    // 1. 위치검색 허가 : console에서 requestForegroundPermissionsAsync확인후 사용

    // const permission = await Location.requestForegroundPermissionsAsync();
    // console.log(permission);
    // 터미널에서 확인됨 {"canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    } // !granted 허가 받지 않으면 setOk(falst);

    // 2. 위치 가져오기 : 콘솔에서 getCurrentPositionAsync확인후 사용
    // const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // console.log(location);
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: 5,
    });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    // console.log(location);
    setCity(location[0].city);
    fetch(
      `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
    );
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
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
