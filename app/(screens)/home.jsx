import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router"; 
import { getEvents } from "@/api/event";

const CATEGORIES = [
  { id: "1", name: "Music", icon: "music" },
  { id: "2", name: "Sports", icon: "futbol-o" },
  { id: "3", name: "Art", icon: "paint-brush" },
  { id: "4", name: "Food", icon: "cutlery" },
  { id: "5", name: "Tech", icon: "laptop" },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await getEvents();
        setEvents(data); 
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

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
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/7794361/pexels-photo-7794361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}
      className="flex-1"
    >
      <StatusBar style="light" />
      <ScrollView className="flex-1">
        <View className="p-6 pt-12">
          <TouchableOpacity
            onPress={() => router.push("/events/userEvent")}
            className="absolute top-6 right-6 bg-blue-500 p-3 rounded-full shadow-lg z-10"
          >
            <AntDesign name="plus" size={24} color="#fff" />
          </TouchableOpacity>

          <BlurView
            intensity={60}
            tint="light"
            className="rounded-3xl overflow-hidden mb-6"
          >
            <View className="p-6">
              <Text className="text-3xl font-bold text-gray-800 mb-2">
                Discover Events
              </Text>
              <Text className="text-gray-600">
                Find amazing events happening around you
              </Text>
            </View>
          </BlurView>

          {loading && (
            <Text className="text-center text-gray-600">Loading events...</Text>
          )}

          <View className="mb-6">
            <View className="flex-row items-center bg-white rounded-xl px-4 shadow-sm">
              <FontAwesome name="search" size={20} color="#3b82f6" />
              <TextInput
                className="flex-1 p-4 ml-2"
                placeholder="Search events..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.name)}
                activeOpacity={0.7}
                className={`items-center ${
                  selectedCategory === category.name
                    ? "bg-blue-500"
                    : "bg-white"
                } p-4 mr-3 rounded-xl w-24 shadow-sm`}
              >
                <FontAwesome
                  name={category.icon}
                  size={24}
                  color={
                    selectedCategory === category.name ? "#fff" : "#3b82f6"
                  }
                />
                <Text
                  className={`mt-2 font-semibold text-center ${
                    selectedCategory === category.name
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">Events</Text>
            <FlatList
              data={filteredEvents}
              renderItem={renderEventCard}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
