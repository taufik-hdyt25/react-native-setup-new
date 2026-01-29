import { Typography } from '@/components/Typhography';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 16,
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Typography style={{ textAlign: 'center' }} variant="title">
          TH MoneyFlow
        </Typography>

        <View
          style={{
            backgroundColor: '#E8F6F4',
            padding: 20,
            borderRadius: 10,
            marginTop: 20,
            // iOS shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,

            // Android shadow
            elevation: 5,
          }}
        >
          <Typography style={{ textAlign: 'center' }} variant="heading">
            Sign Up
          </Typography>
          <View style={{ marginTop: 20, gap: 16 }}>
            <TextInput
              label="Email"
              value={''}
              mode="outlined"
              contentStyle={{ borderWidth: 0 }}
              //   onChangeText={text => setText(text)}
            />
            <TextInput
              label="Password"
              value={''}
              mode="outlined"
              //   onChangeText={text => setText(text)}
            />
          </View>

          <Button
            style={{ marginTop: 50, borderRadius: 10 }}
            buttonColor="#00674F"
            textColor="white"
            contentStyle={{ height: 50 }}
          >
            Login
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#ababab',
              height: 1,
              flex: 1,
            }}
          />
          <Typography style={{ paddingHorizontal: 5 }}>
            Or Login with
          </Typography>
          <View
            style={{
              backgroundColor: '#ababab',
              height: 1,
              flex: 1,
            }}
          />
        </View>

        <Button
          style={{
            marginTop: 20,
            borderColor: '#ababab',
            borderWidth: 1,
          }}
          textColor="black"
        >
          {' '}
          Login with Google
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
