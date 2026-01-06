import { Typography } from '@/components/Typhography';
import { showLocalNotification } from '@/utils/notifications';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <View>
      <Typography weight="semiBold">HomaScreen</Typography>

      <Button
        buttonColor="red"
        style={{ marginTop: 20, marginHorizontal: 20 }}
        onPress={showLocalNotification}
      >
        <Text style={{ color: 'white', fontFamily: 'Poppins-Regular' }}>
          Test Notification
        </Text>
      </Button>
    </View>
  );
};

export default HomeScreen;
