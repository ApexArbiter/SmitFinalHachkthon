import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { onRegister } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  handleRegister = async () => {
    if (!formData.fullname || !formData.email || !formData.password) {
      return alert("Fill all fields");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    const response = await onRegister(
      formData.fullname,
      formData.email,
      formData.password
    );

    if (response.error) {
      alert(response.msg);
      return;
    }

    alert("Account registered successfully");
    router.push("/(auth)/login");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1557683311-eac922347aa1",
      }}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <StatusBar style="light" />
        <ScrollView className="flex-1">
          <View className="flex-1 p-6 justify-center min-h-screen">
            <BlurView
              intensity={60}
              tint="light"
              className="rounded-3xl overflow-hidden"
            >
              <View className="p-8 bg-white bg-opacity-20">
                <View className="items-center mb-8">
                  <View className="w-20 h-20 bg-white rounded-full items-center justify-center mb-4">
                    <FontAwesome name="user-plus" size={32} color="#3b82f6" />
                  </View>
                  <Text className="text-3xl font-bold text-gray-800">
                    Create Account
                  </Text>
                  <Text className="text-gray-600 mt-2 text-center">
                    Join us and start your journey
                  </Text>
                </View>

                <View className="gap-3">
                  <View>
                    <View className="flex-row items-center bg-gray-100 bg-opacity-80 rounded-xl px-4">
                      <FontAwesome name="user" size={20} color="#3b82f6" />
                      <TextInput
                        className="flex-1 p-4 ml-2"
                        placeholder="Enter your full name"
                        value={formData.fullname}
                        onChangeText={(text) =>
                          setFormData({ ...formData, fullname: text })
                        }
                        placeholderTextColor="#64748b"
                      />
                    </View>
                  </View>

                  <View>
                    <View className="flex-row items-center bg-gray-100 bg-opacity-80 rounded-xl px-4">
                      <FontAwesome name="envelope" size={20} color="#3b82f6" />
                      <TextInput
                        className="flex-1 p-4 ml-2"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={formData.email}
                        onChangeText={(text) =>
                          setFormData({ ...formData, email: text })
                        }
                        placeholderTextColor="#64748b"
                      />
                    </View>
                  </View>

                  <View>
                    <View className="flex-row items-center bg-gray-100 bg-opacity-80 rounded-xl px-4">
                      <FontAwesome name="lock" size={20} color="#3b82f6" />
                      <TextInput
                        className="flex-1 p-4 ml-2"
                        placeholder="Enter your password"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(text) =>
                          setFormData({ ...formData, password: text })
                        }
                        placeholderTextColor="#64748b"
                      />
                    </View>
                  </View>

                  <View>
                    <View className="flex-row items-center bg-gray-100 bg-opacity-80 rounded-xl px-4">
                      <FontAwesome name="lock" size={20} color="#3b82f6" />
                      <TextInput
                        className="flex-1 p-4 ml-2 "
                        placeholder="Confirm your password"
                        secureTextEntry
                        value={formData.confirmPassword}
                        onChangeText={(text) =>
                          setFormData({ ...formData, confirmPassword: text })
                        }
                        placeholderTextColor="#64748b"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleRegister()}
                    className="bg-blue-500 p-4 rounded-xl mt-6 shadow-lg"
                  >
                    <Text className="text-white text-center font-semibold text-lg">
                      Create Account
                    </Text>
                  </TouchableOpacity>

                  <View className="flex-row justify-center mt-4">
                    <Text className="text-gray-600">
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("(auth)/login")}
                    >
                      <Text className="text-blue-500 font-semibold">
                        <Link href={"/login"}>Sign In</Link>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </BlurView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
