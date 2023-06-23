import { Fontisto, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Gallery, Home, Settings } from "./View";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          activeTintColor: "#444",
          inactiveTintColor: "#222",
          tabBarShowLabel: false
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          tabBarShowLabel={false}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <Ionicons name="ios-camera-outline" size={size} color={color} />
              );
            }
          }}
        />
        <Tab.Screen
          name="Gallery"
          component={Gallery}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Fontisto name="photograph" size={24} color={color} />;
            }
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <SimpleLineIcons name="settings" size={24} color={color} />
              );
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
