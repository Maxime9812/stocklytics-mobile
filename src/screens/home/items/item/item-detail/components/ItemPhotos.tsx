import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { styled } from 'nativewind';
import * as ImagePicker from 'expo-image-picker';
import { Portal } from '@gorhom/portal';
import { useModal } from '../../../../../../hooks/use-modal';
import Button from '../../../../../../components/buttons/Button';
import ThemedBottomSheet from '../../../../../../components/bottom-sheet/ThemedBottomSheet';
import CameraPermission from '../../../../../../components/camera/camera-permission/CameraPermission';
import { MediaLibraryPermission } from '../../../../../../components/media-library/MediaLibraryPermission';
import Card from '../../../../../../components/cards/Card';
import { useAppDispatch } from '../../../../../../store-hooks';

type Props = {
  itemId: string;
  image?: string;
  deleteImage: () => void;
  addImage: (imagePath: string) => Promise<void>;
};

export default function ItemPhotos({
  itemId,
  image,
  deleteImage,
  addImage,
}: Props) {
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {
    isOpen,
    open: openMediaLibrary,
    close: closeMediaLibrary,
  } = useModal();

  const handleGetImage = async () => {
    bottomSheetRef.current?.close();
    const image = await getImage();
    if (!image) return;
    await addImage(image.uri);
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
    bottomSheetRef.current?.close();
    const image = await takePhoto();
    if (!image) return;
    await addImage(image.uri);
  };

  const takePhoto = async () => {
    const picker = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!picker.assets) return;
    return picker.assets[0];
  };

  const handleDeleteImage = () => {
    bottomSheetRef.current?.close();
    deleteImage();
  };

  return (
    <>
      {image && <ImageView image={image} openMediaLibrary={openMediaLibrary} />}
      {!image && <NoImageView openMediaLibrary={openMediaLibrary} />}
      {isOpen && (
        <Portal>
          <ThemedBottomSheet
            ref={bottomSheetRef}
            enablePanDownToClose
            enableDynamicSizing
            onClose={closeMediaLibrary}
            withOverlay
          >
            <BottomSheetView>
              <MediaLibraryBottomSheet
                hasImage={!!image}
                takePhoto={handleTakePhoto}
                getImage={handleGetImage}
                deleteImage={handleDeleteImage}
              />
            </BottomSheetView>
          </ThemedBottomSheet>
        </Portal>
      )}
    </>
  );
}

const PhotoIconThemed = styled(Feather, 'text-black dark:text-white');

const ImageView = ({
  image,
  openMediaLibrary,
}: {
  image: string;
  openMediaLibrary: () => void;
}) => {
  return (
    <View className="h-72 bg-neutral-200 dark:bg-neutral-700">
      <View className="flex-row justify-center self-end absolute z-10 p-2">
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
      <Image source={{ uri: image }} className="w-full h-full" />
    </View>
  );
};

const NoImageView = ({
  openMediaLibrary,
}: {
  openMediaLibrary: () => void;
}) => {
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
    </>
  );
};

type MediaLibraryBottomSheetProps = {
  hasImage: boolean;
  takePhoto: () => void;
  getImage: () => void;
  deleteImage: () => void;
};

const MediaLibraryBottomSheet = ({
  hasImage,
  getImage,
  takePhoto,
  deleteImage,
}: MediaLibraryBottomSheetProps) => {
  const device = useCameraDevice('back');

  if (device == null) return <View></View>;

  return (
    <View className="p-4 pt-0 space-y-4 mb-4">
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
      <View className="space-y-2">
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
        {hasImage && (
          <Card type="secondary" className="p-1">
            <Button
              variant="ghost"
              type="secondary"
              onPress={deleteImage}
              className="p-3"
            >
              <Button.Icon className="text-red-500">
                <Feather name="trash" size={20} />
              </Button.Icon>
              <Button.Text className="text-red-500">Delete image</Button.Text>
            </Button>
          </Card>
        )}
      </View>
    </View>
  );
};
