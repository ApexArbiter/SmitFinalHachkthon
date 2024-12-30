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
  Animated,
} from "react-native";
import { BlurView } from "expo-blur";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { getEvents } from "@/api/event";
import { useAuth } from "@/context/AuthContext";

const CATEGORIES = [
  { id: "1", name: "Music", icon: "music", gradient: ["#FF6B6B", "#FF8E8E"] },
  { id: "2", name: "Sports", icon: "futbol-o", gradient: ["#4FACFE", "#00F2FE"] },
  { id: "3", name: "Art", icon: "paint-brush", gradient: ["#FAD961", "#F76B1C"] },
  { id: "4", name: "Food", icon: "cutlery", gradient: ["#43E97B", "#38F9D7"] },
  { id: "5", name: "Tech", icon: "laptop", gradient: ["#FA709A", "#FEE140"] },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { onLogout } = useAuth
  ();

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

  const handleLogout = async () => {
    try {
      await onLogout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const filteredEvents = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-3xl overflow-hidden shadow-lg mb-6 mx-2"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
      onPress={() => router.push(`/events/${item._id}`)}
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-48 rounded-t-3xl"
        style={{ resizeMode: 'cover' }}
      />
      <View className="p-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm font-bold px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
            {item.category}
          </Text>
          <Text className="text-lg font-bold text-green-600">${item.price}</Text>
        </View>
        <Text className="text-xl font-bold text-gray-800 mb-2">
          {item.title}
        </Text>
        <View className="flex-row items-center mb-2">
          <FontAwesome name="calendar" size={14} color="#666" />
          <Text className="text-sm text-gray-600 ml-2 font-medium">{item.date}</Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesome name="map-marker" size={14} color="#666" />
          <Text className="text-sm text-gray-600 ml-2 font-medium">{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListHeaderComponent = () => (
    <>
      <View className="absolute top-6 right-6 flex-row space-x-4 z-10">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 p-4 rounded-full shadow-lg"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <FontAwesome name="sign-out" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => router.push("/events/userEvent")}
          className="bg-blue-500 p-4 rounded-full shadow-lg"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <AntDesign name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <BlurView
        intensity={80}
        tint="light"
        className="rounded-3xl overflow-hidden mb-8"
      >
        <View className="p-8">
          <Text className="text-4xl font-bold text-gray-800 mb-3">
            Discover Events
          </Text>
          <Text className="text-lg text-gray-600">
            Find amazing events happening around you
          </Text>
        </View>
      </BlurView>

      {loading && (
        <View className="bg-white/80 rounded-2xl p-4 mb-6">
          <Text className="text-center text-gray-600 font-medium">Loading amazing events...</Text>
        </View>
      )}

      <View className="mb-8">
        <View className="flex-row items-center bg-white/90 rounded-2xl px-5 shadow-lg">
          <FontAwesome name="search" size={20} color="#3b82f6" />
          <TextInput
            className="flex-1 p-5 ml-3 text-base font-medium"
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748b"
          />
        </View>
      </View>

      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-8"
        keyExtractor={(item) => item.id}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(category.name)}
            activeOpacity={0.7}
            className={`items-center justify-center ${
              selectedCategory === category.name
                ? "bg-blue-500"
                : "bg-white/90"
            } p-5 mr-4 rounded-2xl w-28 shadow-lg`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            <FontAwesome
              name={category.icon}
              size={28}
              color={selectedCategory === category.name ? "#fff" : "#3b82f6"}
            />
            <Text
              className={`mt-3 font-bold text-center ${
                selectedCategory === category.name
                  ? "text-white"
                  : "text-gray-800"
              }`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text className="text-2xl font-bold text-gray-800 mb-6">Featured Events</Text>
    </>
  );

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/7794361/pexels-photo-7794361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}
      className="flex-1"
    >
      <StatusBar style="light" />
      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{ padding: 24, paddingTop: 48 }}
      />
    </ImageBackground>
  );
};

export default HomeScreen;