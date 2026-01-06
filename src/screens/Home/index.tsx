import { showLocalNotification } from '@/utils/notifications';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.title}>HomeScreen</Text>

      <Button
        buttonColor="red"
        style={{ marginTop: 20, marginHorizontal: 20 }}
        onPress={showLocalNotification}
      >
        <Text style={{ color: 'white' }}>Test Notification</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
