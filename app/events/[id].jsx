import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { getEventById } from "@/api/event";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const data = await getEventById(id);
        setEventDetails(data);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-4">Loading event details...</Text>
      </View>
    );
  }

  if (!eventDetails) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Image
        source={{ uri: eventDetails.image }}
        className="w-full h-60"
      />
      <View className="p-6 bg-white rounded-t-3xl -mt-8 shadow-lg">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {eventDetails.title}
        </Text>
        <View className="flex-row items-center mb-4">
          <Text className="text-sm font-semibold text-blue-500 mr-4">
            {eventDetails.category}
          </Text>
          <Text className="text-sm font-semibold text-green-500">
            ${eventDetails.price}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-600">
            <Text className="font-bold">Date:</Text> {eventDetails.date}
          </Text>
        </View>
        <View className="flex-row items-center mb-4">
          <Text className="text-gray-600">
            <Text className="font-bold">Location:</Text> {eventDetails.location}
          </Text>
        </View>
        <Text className="text-gray-700 mb-6">{eventDetails.description}</Text>
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-lg"
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-bold text-lg">
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
