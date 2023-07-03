import React from "react";
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

import { StatusBar } from "expo-status-bar";
import { theme } from "../../theme";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = React.useState(false);
  const [location, setLocation] = React.useState([1, 2, 3]);

  function LocationHandler(item: number) {
    console.log("Location: ", item);
  }

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../../../assets/images/bg.png")}
        className="absolute w-full h-full"
      />
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
          {location.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {location.map((item, index) => {
                let showBorder = index === location.length - 1 ? false : true;
                return (
                  <TouchableOpacity
                    onPress={() => LocationHandler(item)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1" +
                      (showBorder ? " border-b-2 border-b-gray-400" : "")
                    }
                  >
                    <MapPinIcon size="20" color="gray" />
                    <Text className="text-black text-lg ml-2">
                      Recife, Pernambuco
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        <View className="mx-4 flex justify-around flex-1 mb-4">
          <Text className="text-white text-center text-2xl font-bold">
            Recife,
            <Text className="text-lg font-semibold text-gray-300">
              Pernambuco
            </Text>
          </Text>
          <View className="flex-row justify-center">
            <Image
              source={require("../../../assets/images/partlycloudy.png")}
              className="w-52 h-52"
            />
          </View>
          <View className="space-y-2">
            <Text className="text-center text-white font-bold text-6xl  ml-5">
              23&#176;
            </Text>
            <Text className="text-center text-white text-xl  tracking-widest mb-8">
              Partly cloudy
            </Text>
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../../../assets/icons/wind.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">22km</Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../../../assets/icons/drop.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">22%</Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../../../assets/icons/sun.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  6:05 AM
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="mb-10 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size="22" color="white" />
            <Text className="text-white text-base">Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite("0.15") }}
            >
              <Image
                source={require("../../../assets/images/heavyrain.png")}
                className="w-11 h-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                13&#176;
              </Text>
            </View>

            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite("0.15") }}
            >
              <Image
                source={require("../../../assets/images/heavyrain.png")}
                className="w-11 h-11"
              />
              <Text className="text-white">Tuesday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                13&#176;
              </Text>
            </View>

            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite("0.15") }}
            >
              <Image
                source={require("../../../assets/images/heavyrain.png")}
                className="w-11 h-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                13&#176;
              </Text>
            </View>

            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite("0.15") }}
            >
              <Image
                source={require("../../../assets/images/heavyrain.png")}
                className="w-11 h-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                13&#176;
              </Text>
            </View>

            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite("0.15") }}
            >
              <Image
                source={require("../../../assets/images/heavyrain.png")}
                className="w-11 h-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                13&#176;
              </Text>
            </View>

            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite("0.15") }}
            >
              <Image
                source={require("../../../assets/images/heavyrain.png")}
                className="w-11 h-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                13&#176;
              </Text>
            </View>

            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite("0.15") }}
            >
              <Image
                source={require("../../../assets/images/heavyrain.png")}
                className="w-11 h-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">
                {" "}
                13&#176;
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
