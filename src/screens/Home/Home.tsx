import { Typography } from '@/components/Typhography';
import { useGetSurah } from '@/libraries/api/quran/quran.api';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Sound from 'react-native-sound';
import { useRef, useState } from 'react';
Sound.setCategory('Playback');

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const soundRef = useRef<Sound | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0); // 0 - 1
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetSurah();
  const listJuz = data && (data as any);
  const startProgress = () => {
    stopProgress();

    intervalRef.current = setInterval(() => {
      if (soundRef.current) {
        soundRef.current.getCurrentTime(seconds => {
          if (duration > 0) {
            setProgress(seconds / duration);
          }
        });
      }
    }, 300);
  };

  const stopProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const playSound = (url?: string, index?: number) => {
    // 🔴 jika ada audio aktif & klik item berbeda → pause dulu
    setIsPlaying(true);
    setIsLoading(true);
    if (
      soundRef.current &&
      isPlaying &&
      currentIndex !== null &&
      currentIndex !== index
    ) {
      soundRef.current.pause();
      setIsPlaying(false);
      stopProgress();
    }

    // 🟡 jika klik surah yang sama → toggle play / pause
    if (soundRef.current && currentIndex === index) {
      if (isPlaying) {
        soundRef.current.pause();
        setIsPlaying(false);
        stopProgress();
      } else {
        soundRef.current.play();
        setIsPlaying(true);
        startProgress();
      }
      return;
    }

    // 🧹 stop & release audio lama (jika beda surah)
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
      soundRef.current = null;
    }

    if (!url || index === undefined) return;

    setCurrentIndex(index);

    const sound = new Sound(url, undefined, error => {
      if (error) {
        console.log('load error', error);
        setIsLoading(false);
        setCurrentIndex(null);
        return;
      }

      setDuration(sound.getDuration());
      sound.setCurrentTime(0);

      sound.play(() => {
        stopProgress();
        setIsPlaying(false);
        setProgress(0);
        setCurrentIndex(null);
      });

      soundRef.current = sound;
      setIsPlaying(true);
      setIsLoading(false);
      startProgress();
    });
  };
  return (
    <SafeAreaView>
      <View
        style={{
          // flex: 1,
          height: '100%',
        }}
      >
        <View style={{ padding: 16 }}>
          <Typography variant="title" weight="semiBold">
            Selamat Malam
          </Typography>
          <Typography style={{ color: 'rgba(0,0,0,0.7)' }} weight="semiBold">
            Tutup harimu dengan ketenangan dan lantunan ayat suci.
          </Typography>

          <View
            style={{
              height: 200,
              width: '100%',
              backgroundColor: 'red',
              marginTop: 10,
              borderRadius: 16,
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                height: 60,
                alignItems: 'center',
              }}
            >
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <View key={index} style={{ marginRight: 10 }}>
                    <Button
                      mode="outlined"
                      textColor="black"
                      style={{
                        borderColor: 'black',
                      }}
                      contentStyle={{
                        height: 40,
                        paddingHorizontal: 20,
                      }}
                    >
                      Login
                    </Button>
                  </View>
                ))}
            </ScrollView>
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
          >
            <View style={{ padding: 16 }}>
              {listJuz &&
                listJuz?.data?.map((e: any, i: number) => (
                  <View
                    key={i + 'key'}
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      gap: 10,
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      paddingLeft: 10,
                      paddingVertical: 5,
                      paddingRight: 7,
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Typography
                        variant="heading"
                        size={16}
                        style={{
                          color: '#0B721E',
                          flex: 1,
                          textAlign: 'left',
                        }}
                      >
                        {i + 1} - {e?.name_id}
                      </Typography>
                      <Typography
                        variant="heading"
                        size={16}
                        style={{
                          color: '#ababab',
                          flex: 1,
                          textAlign: 'right',
                        }}
                      >
                        {`(${e?.translation_id}) · ${e.number_of_verses} Ayat`}
                      </Typography>
                      <TouchableOpacity
                        onPress={() => playSound(e.audio_url, i)}
                        style={{
                          alignSelf: 'flex-start',
                          paddingVertical: 6,
                        }}
                      >
                        <Typography style={{ color: 'green', fontSize: 20 }}>
                          {currentIndex === i && isPlaying ? '⏸️' : '▶️'}
                        </Typography>
                      </TouchableOpacity>
                      {/* 
                      <View style={{ marginTop: 8 }}>
                        <View
                          style={{
                            height: 4,
                            backgroundColor: '#E0E0E0',
                            borderRadius: 4,
                            overflow: 'hidden',
                          }}
                        >
                          <View
                            style={{
                              height: 4,
                              width: `${progress * 100}%`,
                              backgroundColor: '#0B721E',
                            }}
                          />
                        </View>
                      </View> */}
                    </View>
                    <Typography
                      variant="heading"
                      size={16}
                      style={{
                        color: '#0B721E',
                        flex: 1,
                        textAlign: 'right',
                      }}
                    >
                      {e?.name_short}
                    </Typography>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
