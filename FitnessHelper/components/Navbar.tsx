import React, { ReactNode } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Colors from '../constants/Colors';
import HomeIcon from '../assets/icons/home.svg';
import WorkoutIcon from '../assets/icons/workout.svg';
import CaloriesIcon from '../assets/icons/calories.svg';
import UserIcon from '../assets/icons/user.svg';

interface NavItem {
  id: string;
  icon: ReactNode;
  push: string;
}

interface BottomNavBarProps {
  items?: NavItem[];
  onTabPress?: (itemId: string) => void;
  backgroundColor?: string;
}

const defaultItems: NavItem[] = [
  {
    id: 'home',
    icon: <HomeIcon width={24} height={24} />,
    push: '/Dashboard',
  },
  {
    id: 'workout',
    icon: <WorkoutIcon width={24} height={24} />,
    push: '/Workout',
  },
  {
    id: 'calories',
    icon: <CaloriesIcon width={24} height={24} />,
    push: '/Calories',
  },
  {
    id: 'profile',
    icon: <UserIcon width={24} height={24} />,
    push: '/Profile',
  },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  items = defaultItems,
  onTabPress,
  backgroundColor = Colors.background,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleTabPress = (push: string, itemId: string) => {
    if (pathname !== push) {
      onTabPress?.(itemId);
      router.replace(push);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.navBar]}>
        {items.map((item) => {
          const isActive = pathname === item.push;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => handleTabPress(item.push, item.id)}
              activeOpacity={0.7}
            >
              <View style={{ opacity: isActive ? 1 : 0.5 }}>
                {item.icon}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navBar: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default BottomNavBar;
