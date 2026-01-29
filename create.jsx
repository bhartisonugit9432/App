
// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useCreateExpertProfile } from "../../hooks/useExpert";
// import { useAuth } from "../../context/AuthContext";

// export default function CreateExpertScreen() {
//   const { user } = useAuth();
//   const createMutation = useCreateExpertProfile();

//   const [formData, setFormData] = useState({
//     field: "",
//     experience: "",
//     photoUrl: "",
//     idDocumentUrl: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.field.trim()) newErrors.field = "Expert field is required";
//     if (!formData.experience.trim())
//       newErrors.experience = "Experience details are required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const pickImage = async (type) => {
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permissionResult.granted) {
//       Alert.alert(
//         "Permission required",
//         "Please allow access to your photo library.",
//       );
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       // In a real app, you would upload this to a server/CDN
//       // For now, we'll just use the local URI
//       if (type === "photo") {
//         setFormData((prev) => ({ ...prev, photoUrl: result.assets[0].uri }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           idDocumentUrl: result.assets[0].uri,
//         }));
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       const payload = {
//         ...formData,
//         userId: user._id,
//       };

//       const result = await createMutation.mutateAsync(payload);

//       if (result.success) {
//         Alert.alert(
//           "Application Submitted",
//           "Your expert profile has been submitted for review. You will be notified once approved.",
//           [
//             {
//               text: "OK",
//               onPress: () => router.replace("/expert/dashboard"),
//             },
//           ],
//         );
//       }
//     } catch (error) {
//       Alert.alert("Error", error.message || "Failed to submit application");
//     }
//   };

//   const updateField = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <View className="px-4 py-4 bg-white border-b border-gray-200 flex-row items-center">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#374151" />
//         </TouchableOpacity>
//         <Text className="text-xl font-bold text-gray-800 ml-4">
//           Become an Expert
//         </Text>
//       </View>

//       <ScrollView
//         className="flex-1"
//         contentContainerStyle={{ padding: 16 }}
//         showsVerticalScrollIndicator={false}
//       >
//         <View className="bg-white rounded-xl p-5 shadow-sm mb-6">
//           <View className="mb-6">
//             <Ionicons name="person-circle" size={48} color="#3b82f6" />
//             <Text className="text-2xl font-bold text-gray-800 mt-2">
//               Expert Application
//             </Text>
//             <Text className="text-gray-600 mt-1">
//               Apply to become an expert and connect with organizations
//             </Text>
//           </View>

//           {/* Field */}
//           <View className="mb-4">
//             <Text className="text-gray-700 font-medium mb-2">
//               Expertise Field *
//             </Text>
//             <TextInput
//               className={`border ${errors.field ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3`}
//               placeholder="e.g., Yoga Instructor, Music Teacher, Fitness Coach"
//               value={formData.field}
//               onChangeText={(value) => updateField("field", value)}
//             />
//             {errors.field && (
//               <Text className="text-red-500 text-sm mt-1">{errors.field}</Text>
//             )}
//           </View>

//           {/* Experience */}
//           <View className="mb-4">
//             <Text className="text-gray-700 font-medium mb-2">
//               Experience Details *
//             </Text>
//             <TextInput
//               className={`border ${errors.experience ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 h-32`}
//               placeholder="Describe your experience, qualifications, certifications..."
//               value={formData.experience}
//               onChangeText={(value) => updateField("experience", value)}
//               multiline
//               textAlignVertical="top"
//             />
//             {errors.experience && (
//               <Text className="text-red-500 text-sm mt-1">
//                 {errors.experience}
//               </Text>
//             )}
//           </View>

//           {/* Profile Photo */}
//           <View className="mb-4">
//             <Text className="text-gray-700 font-medium mb-2">
//               Profile Photo (Optional)
//             </Text>
//             <TouchableOpacity
//               className={`border border-dashed ${formData.photoUrl ? "border-blue-500 bg-blue-50" : "border-gray-300"} rounded-lg p-4 items-center`}
//               onPress={() => pickImage("photo")}
//             >
//               {formData.photoUrl ? (
//                 <>
//                   <Ionicons name="checkmark-circle" size={32} color="#10b981" />
//                   <Text className="text-green-600 font-medium mt-2">
//                     Photo Selected
//                   </Text>
//                 </>
//               ) : (
//                 <>
//                   <Ionicons name="camera" size={32} color="#6b7280" />
//                   <Text className="text-gray-600 mt-2">
//                     Tap to upload profile photo
//                   </Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>

//           {/* ID Document */}
//           <View className="mb-6">
//             <Text className="text-gray-700 font-medium mb-2">
//               ID Document (Optional)
//             </Text>
//             <TouchableOpacity
//               className={`border border-dashed ${formData.idDocumentUrl ? "border-blue-500 bg-blue-50" : "border-gray-300"} rounded-lg p-4 items-center`}
//               onPress={() => pickImage("document")}
//             >
//               {formData.idDocumentUrl ? (
//                 <>
//                   <Ionicons name="document-text" size={32} color="#10b981" />
//                   <Text className="text-green-600 font-medium mt-2">
//                     Document Uploaded
//                   </Text>
//                 </>
//               ) : (
//                 <>
//                   <Ionicons name="document-attach" size={32} color="#6b7280" />
//                   <Text className="text-gray-600 mt-2">
//                     Upload ID proof document
//                   </Text>
//                 </>
//               )}
//             </TouchableOpacity>
//             <Text className="text-gray-500 text-sm mt-2">
//               This helps in verification process (e.g., Aadhaar, PAN, Passport)
//             </Text>
//           </View>

//           {/* Submit Button */}
//           <TouchableOpacity
//             className={`bg-blue-500 py-4 rounded-lg flex-row justify-center items-center ${createMutation.isPending ? "opacity-70" : ""}`}
//             onPress={handleSubmit}
//             disabled={createMutation.isPending}
//           >
//             {createMutation.isPending ? (
//               <>
//                 <ActivityIndicator size="small" color="white" />
//                 <Text className="text-white font-semibold ml-2">
//                   Submitting...
//                 </Text>
//               </>
//             ) : (
//               <>
//                 <Ionicons name="send" size={20} color="white" />
//                 <Text className="text-white font-semibold ml-2">
//                   Submit Application
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* Requirements Card */}
//         <View className="bg-amber-50 rounded-xl p-4 mb-6">
//           <View className="flex-row items-start">
//             <Ionicons name="alert-circle" size={20} color="#f59e0b" />
//             <View className="ml-3 flex-1">
//               <Text className="text-amber-800 font-semibold">
//                 Application Requirements
//               </Text>
//               <Text className="text-amber-700 text-sm mt-1">
//                 • Your application will be reviewed by our team
//               </Text>
//               <Text className="text-amber-700 text-sm mt-1">
//                 • Approval typically takes 1-3 business days
//               </Text>
//               <Text className="text-amber-700 text-sm mt-1">
//                 • You ll receive email notification upon approval
//               </Text>
//               <Text className="text-amber-700 text-sm mt-1">
//                 • Approved experts can connect with organizations
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
