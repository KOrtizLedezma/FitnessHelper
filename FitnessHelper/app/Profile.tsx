import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import BottomNavBar from '../components/Navbar';
import Colors from '../constants/Colors';

interface UserProfile {
  height: string;
  weight: string;
  trainingFocus: string;
}

interface DropdownItem {
  label: string;
  value: string;
}

const heightOptions: DropdownItem[] = (() => {
  const options: DropdownItem[] = [];
  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches < 12; inches++) {
      if (feet === 7 && inches > 6) break;
      const totalInches = feet * 12 + inches;
      const label = inches === 0 ? `${feet}'0"` : `${feet}'${inches}"`;
      options.push({
        label,
        value: totalInches.toString(),
      });
    }
  }
  return options;
})();

const weightOptions: DropdownItem[] = Array.from({ length: 301 }, (_, i) => ({
  label: `${80 + i} lb`,
  value: `${80 + i}`,
}));

const trainingOptions: DropdownItem[] = [
  { label: 'Weight Loss', value: 'weight_loss' },
  { label: 'Muscle Gain', value: 'muscle_gain' },
  { label: 'Strength Training', value: 'strength_training' },
  { label: 'Endurance', value: 'endurance' },
  { label: 'General Fitness', value: 'general_fitness' },
  { label: 'Flexibility', value: 'flexibility' },
];

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownItem[];
  onSelect: (value: string) => void;
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onSelect,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsVisible(false);
  };

  return (
    <View style={styles.inputSection}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dropdownText,
            !selectedOption && styles.placeholderText,
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              style={styles.optionsList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === value && styles.selectedOptionItem,
                  ]}
                  onPress={() => handleSelect(item.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionItemText,
                      item.value === value && styles.selectedOptionItemText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile>({
    height: '',
    weight: '',
    trainingFocus: '',
  });

  const isFormComplete =
    profile.height && profile.weight && profile.trainingFocus;

  const handleSaveProfile = () => {
    if (!isFormComplete) {
      Alert.alert('Incomplete Profile', 'Please fill in all fields');
      return;
    }

    const heightLabel = heightOptions.find(
      (h) => h.value === profile.height
    )?.label;
    const weightLabel = weightOptions.find(
      (w) => w.value === profile.weight
    )?.label;
    const focusLabel = trainingOptions.find(
      (t) => t.value === profile.trainingFocus
    )?.label;

    Alert.alert(
      'Profile Saved',
      `Height: ${heightLabel}\nWeight: ${weightLabel}\nFocus: ${focusLabel}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Complete Your Profile</Text>

        <Dropdown
          label="Height"
          value={profile.height}
          options={heightOptions}
          onSelect={(value) =>
            setProfile((prev) => ({ ...prev, height: value }))
          }
          placeholder="Select your height"
        />

        <Dropdown
          label="Weight"
          value={profile.weight}
          options={weightOptions}
          onSelect={(value) =>
            setProfile((prev) => ({ ...prev, weight: value }))
          }
          placeholder="Select your weight"
        />

        <Dropdown
          label="Training Focus"
          value={profile.trainingFocus}
          options={trainingOptions}
          onSelect={(value) =>
            setProfile((prev) => ({ ...prev, trainingFocus: value }))
          }
          placeholder="Choose your training focus"
        />

        <TouchableOpacity
          style={[styles.saveButton, !isFormComplete && styles.disabledButton]}
          onPress={handleSaveProfile}
          activeOpacity={0.8}
          disabled={!isFormComplete}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.primary,
    flex: 1,
  },
  placeholderText: {
    color: Colors.placeholder,
  },
  dropdownArrow: {
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    maxHeight: '70%',
    width: '85%',
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: Colors.secondary,
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  selectedOptionItem: {
    backgroundColor: Colors.primary + '10',
  },
  optionItemText: {
    fontSize: 16,
    color: Colors.primary,
    flex: 1,
  },
  selectedOptionItemText: {
    fontWeight: '600',
    color: Colors.primary,
  },
  checkmark: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: Colors.secondary,
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
