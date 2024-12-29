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
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { onLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      return alert("Fill all fields");
    }

    const response = await onLogin(formData.email, formData.password);

    if (!response.error) {
      setAuthState({ token: response.token, authenticated: true });
    } else {
      return alert(response.msg);
    }

    router.replace("(screens)/home");
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
                    <FontAwesome name="user" size={32} color="#3b82f6" />
                  </View>
                  <Text className="text-3xl font-bold text-gray-800">
                    Welcome Back
                  </Text>
                  <Text className="text-gray-600 mt-2 text-center">
                    Sign in to continue
                  </Text>
                </View>

                <View className="">
                  <View>
                    <View className="flex-row mb-10 items-center bg-gray-200 bg-opacity-80 rounded-xl px-4">
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
                    <View className="flex-row mb-2 items-center bg-gray-200 bg-opacity-80 rounded-xl px-4">
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

                  <TouchableOpacity className="items-end">
                    <Text className="text-blue-500 text-xs font-semibold">
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleLogin}
                    className="bg-blue-500 p-4 rounded-xl mt-6 shadow-lg"
                  >
                    <Text className="text-white text-center font-semibold text-lg">
                      Sign In
                    </Text>
                  </TouchableOpacity>

                  <View className="flex-row justify-center mt-4">
                    <Text className="text-gray-600 text-xs">
                      Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("(auth)/register")}
                    >
                      <Text className="text-blue-500 text-sm font-semibold">
                        Sign Up
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
