import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { styled } from 'nativewind';
import * as ImagePicker from 'expo-image-picker';
import { FullWindowOverlay } from 'react-native-screens';
import { Portal } from '@gorhom/portal';
import { useModal } from '../../../../../../hooks/use-modal';
import Button from '../../../../../../components/buttons/Button';
import ThemedBottomSheet from '../../../../../../components/bottom-sheet/ThemedBottomSheet';
import CameraPermission from '../../../../../../components/camera/camera-permission/CameraPermission';
import { MediaLibraryPermission } from '../../../../../../components/media-library/MediaLibraryPermission';
import Card from '../../../../../../components/cards/Card';

export default function ItemPhotos() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {
    isOpen,
    open: openMediaLibrary,
    close: closeMediaLibrary,
  } = useModal();

  const handleGetImage = async () => {
    closeMediaLibrary();
    const image = await getImage();
    console.log(image);
  };
  const getImage = async () => {
    const picker = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!picker.assets) return;
    return picker.assets[0];
  };

  const handleTakePhoto = async () => {
    closeMediaLibrary();
    const image = await takePhoto();
    console.log(image);
  };

  const takePhoto = async () => {
    const picker = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!picker.assets) return;
    return picker.assets[0];
  };

  return (
    <>
      <View className="h-72 bg-neutral-200 dark:bg-neutral-700 justify-center items-center">
        <View className="space-y-2 p-10">
          <Text className="text-center dark:text-white text-lg">
            Enhance visibility with great image
          </Text>
          <Text className="text-center text-neutral-500 dark:text-neutral-400">
            Upload a image, with a limit of 10 MB. Supported formats JPG and PNG
          </Text>

          <View className="flex-row justify-center">
            <Button
              variant="ghost"
              className="p-4 bg bg-white dark:bg-neutral-800 rounded-full"
              onPress={openMediaLibrary}
            >
              <Button.Icon>
                <Feather name="image" size={20} />
              </Button.Icon>
            </Button>
          </View>
        </View>
      </View>
      {isOpen && (
        <Portal>
          <FullWindowOverlay>
            <TouchableWithoutFeedback
              onPress={() => bottomSheetRef.current?.close()}
            >
              <View className="flex-1 bg-black opacity-40"></View>
            </TouchableWithoutFeedback>
            <ThemedBottomSheet
              ref={bottomSheetRef}
              snapPoints={['25%', '25%']}
              enablePanDownToClose
              onClose={closeMediaLibrary}
            >
              <BottomSheetView>
                <MediaLibraryBottomSheet
                  takePhoto={handleTakePhoto}
                  getImage={handleGetImage}
                />
              </BottomSheetView>
            </ThemedBottomSheet>
          </FullWindowOverlay>
        </Portal>
      )}
    </>
  );
}

const PhotoIconThemed = styled(Feather, 'text-black dark:text-white');

type MediaLibraryBottomSheetProps = {
  takePhoto: () => void;
  getImage: () => void;
};

const MediaLibraryBottomSheet = ({
  getImage,
  takePhoto,
}: MediaLibraryBottomSheetProps) => {
  const device = useCameraDevice('back');

  if (device == null) return <View></View>;

  return (
    <View className="p-4 pt-0 space-y-4">
      <CameraPermission
        accessDenied={
          <View className="w-24 h-24 rounded-xl bg-white dark:bg-black">
            <View className="m-auto">
              <PhotoIconThemed name="camera" size={24} />
            </View>
          </View>
        }
      >
        <TouchableWithoutFeedback onPress={takePhoto}>
          <View className="w-24 h-24 rounded-xl overflow-hidden">
            <Camera isActive={true} device={device} style={{ flex: 1 }}>
              <View className="m-auto">
                <Ionicons name="camera" size={24} color="white" />
              </View>
            </Camera>
          </View>
        </TouchableWithoutFeedback>
      </CameraPermission>
      <View>
        <MediaLibraryPermission alwaysRender>
          {(hasAccess) => (
            <Card type="secondary" className="p-1">
              <Button
                variant="ghost"
                type="secondary"
                onPress={getImage}
                className="p-3"
                disabled={!hasAccess}
              >
                <Button.Icon className="text-royal-blue-500">
                  <Feather name="image" size={20} />
                </Button.Icon>
                <Button.Text className="text-royal-blue-500">
                  Choose from media
                </Button.Text>
              </Button>
            </Card>
          )}
        </MediaLibraryPermission>
      </View>
    </View>
  );
};
