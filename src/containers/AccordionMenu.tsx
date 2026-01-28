import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Text } from 'react-native-gesture-handler';
import { useAuth } from '@hooks/useAuth';
import { Authorizations } from '@app-types/rol/Authorizations';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { RouteNavigations } from '@app-types/common/RouteNavigations';
import { appColors } from '@styles/appColors';

export const AccordionMenu = () => {
  const { operations } = useAuth();
  const [sections, setSections] = useState([]);
  const { navigate } = useNavigation<RouteNavigations>();

  const getItemActive = sections => {
    return sections !== undefined && sections.length > 0
      ? operations[sections[0]]
      : null;
  };

  const updateSections = activeSections => {
    setSections(activeSections);
  };

  const renderHeader = (section: Authorizations) => {
    const item = getItemActive(sections);
    return section.operations.some(operation => operation.isVisible) ? (
      <View
        className={`${
          item?.module.id == section.module.id ? 'bg-sky-200' : 'bg-blue-100'
        } py-3 px-2 flex flex-row justify-between items-center`}
      >
        <Ionicons
          name={section.module.image}
          size={20}
          color={appColors.itemMenuText}
        />
        <Text className="text-blue-500 font-bold">{section.module.name}</Text>
        <Ionicons
          name={
            item?.module.id == section.module.id ? 'chevron-up' : 'chevron-down'
          }
          size={20}
          color={appColors.itemMenuText}
        />
      </View>
    ) : (
      <View></View>
    );
  };

  const renderContent = (section: Authorizations) => {
    return (
      <View className="bg-gray-100 py-3 px-2">
        {section.operations.map(operation => (
          <TouchableOpacity
            key={operation.id}
            className="py-2 flex flex-row"
            onPress={() => navigate(operation.path)}
          >
            <Ionicons
              name={operation.icon}
              size={20}
              color="black"
              style={{ marginLeft: 20 }}
            />
            <Text className="text-black" style={{ marginLeft: 20 }}>
              {operation.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Accordion
      sectionContainerStyle={{
        marginHorizontal: 10,
        borderRadius: 30,
        marginBottom: 2,
      }}
      sections={operations}
      activeSections={sections}
      renderSectionTitle={() => null}
      renderContent={renderContent}
      renderHeader={renderHeader}
      onChange={updateSections}
    />
  );
};
