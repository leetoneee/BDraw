import { Platform } from "react-native";
import { io } from "socket.io-client";

export const BaseUrl =
  Platform.OS === "android" ? "http://10.0.2.2:4000/" : "http://localhost:4000";

export const socket = io("http://localhost:3107/");
