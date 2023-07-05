import React, { useCallback, useEffect } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Image,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar as StatusB,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { debounce } from "lodash";

import { StatusBar } from "expo-status-bar";
import { theme } from "../../theme";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { featchLocations, featchWeatherForescast } from "../../api/weather";
import { weatherImages, weatherPT } from "../../constants";

import * as Progress from "react-native-progress";
import { getData, storageData } from "../../storage/asyncStorage";

type Location = {
  name: string;
  country: string;
  cityName: string;
  region: string;
};

type Weather = {
  current: {
    temp_c: number;
    wind_kph: string;
    humidity: string;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    country: string;
    region: string;
  };
  forecast: {
    forecastday: [
      {
        date: string;
        day: {
          avgtemp_c: string;
          condition: {
            text: string;
          };
        };
        astro: {
          sunrise: string;
        };
      }
    ];
  };
};

export default function HomeScreen() {
  const [showSearch, toggleSearch] = React.useState(false);
  const [locations, setLocation] = React.useState([]);
  const [weather, setWeather] = React.useState<Weather>({} as Weather);
  const [loading, setLoading] = React.useState(true);

  const handleLocation = (item: Location) => {
    setLocation([]);
    toggleSearch(false);
    storageData("city", item.name);
    setLoading(true);
    featchWeatherForescast({
      cityName: item.name,
      days: "7",
    })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      featchLocations({ cityName: value }).then((data) => {
        setLocation(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = myCity ? myCity : "Recife";
    featchWeatherForescast({
      cityName: cityName,
      days: "7",
    }).then((data) => {
      setWeather(data);
    });
    setLoading(false);
  };

  const handleTextDebouce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location } = weather;

  return (
    <View
      className="flex-1"
      style={{
        position: "absolute",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
    >
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../../../assets/images/bg.png")}
        className="absolute w-full h-full"
      />

      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} color="#0bb3b2" size={100} />
        </View>
      ) : (
        <SafeAreaView
          className="flex flex-1 mt-4"
          style={{
            paddingTop: Platform.OS === "android" ? StatusB.currentHeight : 0,
          }}
        >
          <View style={{ height: "7%" }} className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite("0.2")
                  : "transparent",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={(text) => handleTextDebouce(text)}
                  placeholder="Procurar Cidade"
                  placeholderTextColor={"lightgray"}
                  className="pl-6 h-12 flex-1 text-base font-bold text-white"
                />
              ) : null}

              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={{ backgroundColor: theme.bgWhite("0.2") }}
                className="rounded-full p-3 m-1"
              >
                <MagnifyingGlassIcon size="25" color="white" />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((item: Location, index) => {
                  let showBorder =
                    index === locations.length - 1 ? false : true;
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(item as any)}
                      key={index}
                      className={
                        "flex-row items-center border-0 p-3 px-4 mb-1" +
                        (showBorder ? " border-b-2 border-b-gray-400" : "")
                      }
                    >
                      <MapPinIcon size="20" color="gray" />
                      <Text className="text-black text-lg ml-2">
                        {item?.name}, {item?.region}, {item?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          <View className="mx-4 flex justify-around flex-1 mb-2">
            <Text className="text-white text-center text-2xl font-bold">
              {location?.name},
              <Text className="text-lg font-semibold text-gray-300">
                {" " + location?.region}
              </Text>
              <Text className="text-lg font-semibold text-gray-300">
                {" " + location?.country}
              </Text>
            </Text>
            <View className="flex-row justify-center">
              <Image
                source={weatherImages[current?.condition?.text]}
                className="w-52 h-52"
              />
            </View>
            <View className="space-y-2">
              <Text className="text-center text-white font-bold text-6xl  ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center text-white text-xl  tracking-widest mb-8">
                {weatherPT[current?.condition?.text]}
              </Text>
              <View className="flex-row justify-between mx-4">
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../../../assets/icons/wind.png")}
                    className="h-6 w-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.wind_kph}km
                  </Text>
                </View>

                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../../../assets/icons/drop.png")}
                    className="h-6 w-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.humidity}%
                  </Text>
                </View>

                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../../../assets/icons/sun.png")}
                    className="h-6 w-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="mb-10 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <CalendarDaysIcon size="22" color="white" />
              <Text className="text-white text-base">Previsão diária</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            >
              {weather.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let options = { weekday: "long" };
                //@ts-ignore
                let dayName = date.toLocaleDateString("pt-BR", options);
                dayName = dayName.split(",")[0];

                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{ backgroundColor: theme.bgWhite("0.15") }}
                  >
                    <Image
                      source={weatherImages[item?.day?.condition?.text]}
                      className="w-11 h-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {" "}
                      {item?.day.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
