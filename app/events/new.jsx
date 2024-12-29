import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { addEvent } from "@/api/event";

const CATEGORIES = [
  { id: "1", name: "Music", icon: "music" },
  { id: "2", name: "Sports", icon: "futbol-o" },
  { id: "3", name: "Art", icon: "paint-brush" },
  { id: "4", name: "Food", icon: "cutlery" },
  { id: "5", name: "Tech", icon: "laptop" },
];

export default function AddEventScreen() {
  const router = useRouter();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: new Date(),
    location: "",
    category: "",
    price: "",
    capacity: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQRdcr_utcQZIHUoPAlVJbTeTBvoEo5HbyNB0vKeVVMO17zJ8QTmpKYwBANSUTNpoXPno&usqp=CAU",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setEventData({ ...eventData, image: result.assets[0].uri });
    }
    console.log("result", result);
  };

  const handleSubmit = async () => {
    try {
      if (
        !eventData.title ||
        !eventData.description ||
        !eventData.date ||
        !eventData.time ||
        !eventData.location ||
        !eventData.category ||
        !eventData.image ||
        !eventData.price ||
        !eventData.slots
      ) {
        console.log(eventData);
        return alert("Fill all fields");
      }

      let imageUrl = "";

      if (eventData.image) {
        const data = new FormData();
        data.append("file", {
          uri: eventData.image,
          type: "image/jpeg",
          name: "event-image.jpg",
        });
        data.append("upload_preset", "first-Time");
        data.append("cloud_name", "dtesdhvro");

        console.log("Uploading image...");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dtesdhvro/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const result = await response.json();
        console.log("Cloudinary response:", result);

        if (result.secure_url) {
          imageUrl = result.secure_url;
          console.log("Image uploaded successfully. URL:", imageUrl);
        } else {
          console.error(
            "Failed to retrieve secure_url from Cloudinary response:",
            result
          );
          return;
        }

        await addEvent(eventData);
      }
    } catch (err) {
      alert("Failed to create event. Please try again.");
      console.error("Error during submission:", err);
    }
  };



  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1557683311-eac922347aa1",
      }}
      className="flex-1"
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <View className="p-6 pt-12">
            <BlurView
              intensity={60}
              tint="light"
              className="rounded-3xl overflow-hidden"
            >
              <View className="p-6">
                <View className="mb-6">
                  <Text className="text-3xl font-bold text-gray-800">
                    Create Event
                  </Text>
                  <Text className="text-gray-600 mt-2">
                    Fill in the details for your event
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={pickImage}
                  className="h-48 bg-gray-100 rounded-xl mb-6 items-center justify-center"
                >
                  {eventData.image ? (
                    <Image
                      source={{ uri: eventData.image }}
                      className="w-full h-full rounded-xl"
                    />
                  ) : (
                    <View className="items-center">
                      <FontAwesome name="camera" size={40} color="#3b82f6" />
                      <Text className="text-gray-600 mt-2">
                        Add Event Image
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                <View className="space-y-4">
                  <View>
                    <Text className="text-gray-700 mb-2 font-semibold">
                      Event Title *
                    </Text>
                    <TextInput
                      className="w-full p-4 bg-white rounded-xl"
                      value={eventData.title}
                      onChangeText={(text) =>
                        setEventData({ ...eventData, title: text })
                      }
                      placeholder="Enter event title"
                    />
                  </View>

                  <View>
                    <Text className="text-gray-700 mb-2 font-semibold">
                      Description *
                    </Text>
                    <TextInput
                      className="w-full p-4 bg-white rounded-xl"
                      value={eventData.description}
                      onChangeText={(text) =>
                        setEventData({ ...eventData, description: text })
                      }
                      placeholder="Enter event description"
                      multiline
                      numberOfLines={4}
                    />
                  </View>

                  <View className="flex-row space-x-4">
                    <View className="flex-1">
                      <Text className="text-gray-700 mb-2 font-semibold">
                        Date *
                      </Text>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className="p-4 bg-white rounded-xl"
                      >
                        <Text>{eventData.date.toLocaleDateString()}</Text>
                      </TouchableOpacity>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-700 mb-2 font-semibold">
                        Time *
                      </Text>
                      <TouchableOpacity
                        onPress={() => setShowTimePicker(true)}
                        className="p-4 bg-white rounded-xl"
                      >
                        <Text>{eventData.time.toLocaleTimeString()}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    <Text className="text-gray-700 mb-2 font-semibold">
                      Location *
                    </Text>
                    <TextInput
                      className="w-full p-4 bg-white rounded-xl"
                      value={eventData.location}
                      onChangeText={(text) =>
                        setEventData({ ...eventData, location: text })
                      }
                      placeholder="Enter event location"
                    />
                  </View>

                  <View>
                    <Text className="text-gray-700 mb-2 font-semibold">
                      Category *
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <View className="flex-row space-x-4">
                        {CATEGORIES.map((category) => (
                          <TouchableOpacity
                            key={category.id}
                            onPress={() =>
                              setEventData({
                                ...eventData,
                                category: category.name,
                              })
                            }
                            className={`p-4 rounded-xl ${eventData.category === category.name
                              ? "bg-blue-500"
                              : "bg-white"
                              }`}
                          >
                            <FontAwesome
                              name={category.icon}
                              size={24}
                              color={
                                eventData.category === category.name
                                  ? "#fff"
                                  : "#3b82f6"
                              }
                            />
                            <Text
                              className={`mt-2 ${eventData.category === category.name
                                ? "text-white"
                                : "text-gray-800"
                                }`}
                            >
                              {category.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  <View className="flex-row space-x-4">
                    <View className="flex-1">
                      <Text className="text-gray-700 mb-2 font-semibold">
                        Price
                      </Text>
                      <TextInput
                        className="w-full p-4 bg-white rounded-xl"
                        value={eventData.price}
                        onChangeText={(text) =>
                          setEventData({ ...eventData, price: text })
                        }
                        placeholder="Enter price"
                        keyboardType="numeric"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-700 mb-2 font-semibold">
                        Capacity
                      </Text>
                      <TextInput
                        className="w-full p-4 bg-white rounded-xl"
                        value={eventData.slots}
                        onChangeText={(text) =>
                          setEventData({ ...eventData, slots: text })
                        }
                        placeholder="Enter capacity"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-blue-500 p-4 rounded-xl mt-6"
                  >
                    <Text className="text-white text-center font-semibold text-lg">
                      Create Event
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </View>
        </ScrollView>

        {showDatePicker && (
          <DateTimePicker
            value={eventData.date}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setEventData({ ...eventData, date: selectedDate });
              }
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={eventData.time}
            mode="time"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                setEventData({ ...eventData, time: selectedTime });
              }
            }}
          />
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
