import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const UserEvents = () => {
  const [userEvents, setUserEvents] = useState([]); // Pass user events data to this state
  const router = useRouter();

  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4"
      onPress={() => router.push(`/events/${item._id}`)} // Navigate to event details
    >
      <Image source={{ uri: item.image }} className="w-full h-40" />
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm font-semibold text-blue-500">
            {item.category}
          </Text>
          <Text className="text-sm font-bold text-green-500">${item.price}</Text>
        </View>
        <Text className="text-lg font-bold text-gray-800 mb-1">
          {item.title}
        </Text>
        <View className="flex-row items-center mb-1">
          <FontAwesome name="calendar" size={12} color="#666" />
          <Text className="text-sm text-gray-600 ml-2">{item.date}</Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome name="map-marker" size={12} color="#666" />
          <Text className="text-sm text-gray-600 ml-2">{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-6">
      <View className="absolute top-6 right-6 z-10 flex-row">
        <TouchableOpacity
          onPress={() => router.push("/events/new")} // Navigate to add a new event
          className="bg-blue-500 p-3 rounded-full shadow-lg"
        >
          <AntDesign name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Your Events
        </Text>
        {userEvents.length === 0 ? (
          <Text className="text-gray-600 text-center">
            No events created yet. Start by adding a new event.
          </Text>
        ) : (
          <FlatList
            data={userEvents} // Replace this with user events data
            renderItem={renderEventCard}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default UserEvents;
