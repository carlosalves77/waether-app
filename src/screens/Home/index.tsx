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
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { theme } from "../../theme";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

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
      </SafeAreaView>
    </View>
  );
}
