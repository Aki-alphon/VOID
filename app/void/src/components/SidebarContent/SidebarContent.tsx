import React, {useContext, useEffect, useState, useMemo, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Alert,
  SectionList,
  Pressable,
  Image,
  InteractionManager,
  Platform,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {observer} from 'mobx-react';
import {Divider, Drawer, Text} from 'react-native-paper';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {chatSessionStore, SessionMetaData} from '../../store';
import {Menu, RenameModal, Checkbox} from '..';
import {
  BenchmarkIcon,
  ChatIcon,
  EditIcon,
  ModelIcon,
  PalIcon,
  SettingsIcon,
  ShareIcon,
  StarIcon,
  TrashIcon,
  AppInfoIcon,
} from '../../assets/icons';
import {L10nContext} from '../../utils';
import {t} from '../../locales';
import {ROUTES} from '../../utils/navigationConstants';
import {exportChatSession} from '../../utils/exportUtils';

// Check if app is in debug mode
const isDebugMode = __DEV__;

// Session item props interface
interface SessionItemProps {
  session: SessionMetaData;
  isActive: boolean;
  isPinned: boolean;
  onPress: (sessionId: string) => void;
  onLongPress: (sessionId: string, event: any) => void;
  menuVisible: string | null;
  menuPosition: {x: number; y: number};
  onMenuDismiss: () => void;
  onPressPin: (sessionId: string) => void;
  onPressRename: (session: SessionMetaData) => void;
  onPressDelete: (sessionId: string) => void;
  onPressExport: (sessionId: string) => void;
  onPressSelect: (sessionId: string) => void;
  isSelectionMode: boolean;
  isSelected: boolean;
  onToggleSelection: (sessionId: string) => void;
  theme: any;
  styles: any;
  l10n: any;
}

// Memoized session item component
const SessionItem = React.memo<SessionItemProps>(
  ({
    session,
    isActive,
    isPinned,
    onPress,
    onLongPress,
    menuVisible,
    menuPosition,
    onMenuDismiss,
    onPressPin,
    onPressRename,
    onPressDelete,
    onPressExport,
    onPressSelect,
    isSelectionMode,
    isSelected,
    onToggleSelection,
    theme,
    styles,
    l10n,
  }) => {
    const handlePress = () => {
      if (isSelectionMode) {
        onToggleSelection(session.id);
      } else {
        onPress(session.id);
      }
    };

    const handleLongPress = (event: any) => {
      if (!isSelectionMode) {
        onLongPress(session.id, event);
      }
    };

    return (
      <View style={styles.sessionItemContainer}>
        {isSelectionMode && (
          <View style={styles.sessionCheckbox}>
            <Checkbox
              checked={isSelected}
              onPress={() => onToggleSelection(session.id)}
              testID={`checkbox-${session.id}`}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={handlePress}
          onLongPress={handleLongPress}
          style={styles.sessionTouchable}>
          <Drawer.Item
            active={isActive}
            label={session.title}
            style={styles.sessionDrawerItem}
            right={
              isPinned
                ? () => (
                    <StarIcon
                      width={14}
                      height={14}
                      fill={theme.colors.primary}
                    />
                  )
                : undefined
            }
          />
        </TouchableOpacity>
        {!isSelectionMode && (
          <Menu
            visible={menuVisible === session.id}
            onDismiss={onMenuDismiss}
            anchor={menuPosition}
            style={styles.menu}
            contentStyle={{}}
            anchorPosition="bottom">
            <Menu.Item
              testID={`session-pin-${session.id}`}
              onPress={() => {
                onPressPin(session.id);
                onMenuDismiss();
              }}
              label={
                isPinned
                  ? l10n.components.sidebarContent.unpin
                  : l10n.components.sidebarContent.pin
              }
              leadingIcon={() => (
                <StarIcon
                  width={20}
                  height={20}
                  // star.svg is stroke-only and .svgrrc binds that stroke to the
                  // fill prop, so fill='none' paints nothing. Omitting fill is
                  // what yields an outline; no test can catch this (svg is mocked).
                  {...(isPinned
                    ? {fill: theme.colors.primary}
                    : {stroke: theme.colors.primary})}
                />
              )}
            />
            <Divider style={styles.menuDivider} />
            <Menu.Item
              onPress={() => {
                onPressRename(session);
                onMenuDismiss();
              }}
              label={l10n.common.rename}
              leadingIcon={() => <EditIcon stroke={theme.colors.primary} />}
            />
            <Menu.Item
              onPress={() => {
                onPressExport(session.id);
                onMenuDismiss();
              }}
              label={l10n.common.export}
              leadingIcon={() => <ShareIcon stroke={theme.colors.primary} />}
            />
            <Menu.Item
              onPress={() => {
                onPressDelete(session.id);
                onMenuDismiss();
              }}
              label={l10n.common.delete}
              labelStyle={{color: theme.colors.error}}
              leadingIcon={() => <TrashIcon stroke={theme.colors.error} />}
            />
            <Divider style={styles.menuDivider} />
            <Menu.Item
              onPress={() => {
                onPressSelect(session.id);
                onMenuDismiss();
              }}
              label={`${l10n.components.sidebarContent.select}...`}
            />
          </Menu>
        )}
      </View>
    );
  },
);

SessionItem.displayName = 'SessionItem';

// Selection mode header component
interface SelectionModeHeaderProps {
  selectedCount: number;
  onCancel: () => void;
  onExport: () => void;
  onDelete: () => void;
  l10n: any;
  theme: any;
  styles: any;
}

const SelectionModeHeader: React.FC<SelectionModeHeaderProps> = ({
  selectedCount,
  onCancel,
  onExport,
  onDelete,
  l10n,
  theme,
  styles,
}) => {
  return (
    <View style={styles.selectionModeHeader}>
      <TouchableOpacity onPress={onCancel} testID="cancel-selection-button">
        <Text style={{color: theme.colors.primary}}>{l10n.common.cancel}</Text>
      </TouchableOpacity>

      <Text style={styles.selectedCountText}>
        {t(l10n.components.sidebarContent.nSelected, {
          count: selectedCount.toString(),
        })}
      </Text>

      <View style={styles.headerActions}>
        <TouchableOpacity
          onPress={onExport}
          disabled={selectedCount === 0}
          style={[
            styles.headerActionButton,
            selectedCount === 0 && styles.headerActionButtonDisabled,
          ]}
          testID="bulk-export-button">
          <ShareIcon
            stroke={
              selectedCount === 0
                ? theme.colors.onSurfaceDisabled
                : theme.colors.primary
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          disabled={selectedCount === 0}
          style={[
            styles.headerActionButton,
            selectedCount === 0 && styles.headerActionButtonDisabled,
          ]}
          testID="bulk-delete-button">
          <TrashIcon
            stroke={
              selectedCount === 0
                ? theme.colors.onSurfaceDisabled
                : theme.colors.error
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

SelectionModeHeader.displayName = 'SelectionModeHeader';

// Select all row component
interface SelectAllRowProps {
  allSelected: boolean;
  onToggle: () => void;
  l10n: any;
  styles: any;
}

const SelectAllRow: React.FC<SelectAllRowProps> = ({
  allSelected,
  onToggle,
  l10n,
  styles,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={styles.selectAllRow}
      testID="select-all-row">
      <View style={styles.selectAllCheckbox}>
        <Checkbox checked={allSelected} onPress={onToggle} />
      </View>
      <Text style={styles.selectAllText}>
        {l10n.components.sidebarContent.selectAll}
      </Text>
    </TouchableOpacity>
  );
};

SelectAllRow.displayName = 'SelectAllRow';

export const SidebarContent: React.FC<DrawerContentComponentProps> = observer(
  props => {
    const [menuVisible, setMenuVisible] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [sessionToRename, setSessionToRename] =
      useState<SessionMetaData | null>(null);

    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const l10n = useContext(L10nContext);
    const insets = useSafeAreaInsets();

    // Convert groupedSessions to SectionList format
    // observer() HOC handles MobX reactivity, transformation is cheap
    const sections = Object.entries(chatSessionStore.groupedSessions).map(
      ([dateLabel, sessions]) => ({
        title: dateLabel,
        data: sessions,
      }),
    );

    useEffect(() => {
      // Defer loading session list until after drawer open/close animation completes
      const interactionTask = InteractionManager.runAfterInteractions(() => {
        chatSessionStore.loadSessionList();
      });

      // Set localized date group names whenever the component mounts
      chatSessionStore.setDateGroupNames(
        l10n.components.sidebarContent.dateGroups,
      );

      return () => interactionTask.cancel();
    }, [l10n.components.sidebarContent.dateGroups]);

    const openMenu = React.useCallback((sessionId: string, event: any) => {
      const {nativeEvent} = event;
      setMenuPosition({x: nativeEvent.pageX, y: nativeEvent.pageY});
      setMenuVisible(sessionId);
    }, []);

    const closeMenu = React.useCallback(() => {
      setMenuVisible(null);
    }, []);

    const handleSessionPress = React.useCallback(
      async (sessionId: string) => {
        await chatSessionStore.setActiveSession(sessionId);
        props.navigation.navigate(ROUTES.CHAT);
      },
      [props.navigation],
    );

    const handleSessionLongPress = React.useCallback(
      (sessionId: string, event: any) => {
        openMenu(sessionId, event);
      },
      [openMenu],
    );

    const handlePressRename = React.useCallback(
      (session: SessionMetaData) => {
        setSessionToRename(session);
        closeMenu();
      },
      [closeMenu],
    );

    const onPressDelete = React.useCallback(
      (sessionId: string) => {
        if (sessionId) {
          Alert.alert(
            l10n.components.sidebarContent.deleteChatTitle,
            l10n.components.sidebarContent.deleteChatMessage,
            [
              {
                text: l10n.common.cancel,
                style: 'cancel',
              },
              {
                text: l10n.common.delete,
                style: 'destructive',
                onPress: async () => {
                  chatSessionStore.resetActiveSession();
                  await chatSessionStore.deleteSession(sessionId);
                  closeMenu();
                },
              },
            ],
          );
        }
      },
      [l10n, closeMenu],
    );

    const handlePressPin = React.useCallback(async (sessionId: string) => {
      await chatSessionStore.togglePinSession(sessionId);
    }, []);

    const handlePressExport = React.useCallback(
      async (sessionId: string) => {
        try {
          await exportChatSession(sessionId);
        } catch {
          Alert.alert(
            l10n.common.error,
            l10n.components.sidebarContent.exportError,
          );
        }
      },
      [l10n],
    );

    const handlePressSelect = React.useCallback(
      (sessionId: string) => {
        chatSessionStore.enterSelectionMode(sessionId);
        closeMenu();
      },
      [closeMenu],
    );

    const handleExitSelectionMode = React.useCallback(() => {
      chatSessionStore.exitSelectionMode();
    }, []);

    const handleToggleSelection = React.useCallback((sessionId: string) => {
      chatSessionStore.toggleSessionSelection(sessionId);
    }, []);

    const handleBulkDelete = React.useCallback(() => {
      const count = chatSessionStore.selectedCount;

      Alert.alert(
        l10n.components.sidebarContent.bulkDeleteTitle,
        t(l10n.components.sidebarContent.bulkDeleteMessage, {
          count: count.toString(),
        }),
        [
          {
            text: l10n.common.cancel,
            style: 'cancel',
          },
          {
            text: l10n.common.delete,
            style: 'destructive',
            onPress: async () => {
              try {
                await chatSessionStore.bulkDeleteSessions();
              } catch {
                Alert.alert(
                  l10n.common.error,
                  l10n.components.sidebarContent.bulkDeleteError,
                );
              }
            },
          },
        ],
      );
    }, [l10n]);

    const handleBulkExport = React.useCallback(async () => {
      try {
        await chatSessionStore.bulkExportSessions();
      } catch {
        Alert.alert(
          l10n.common.error,
          l10n.components.sidebarContent.bulkExportError,
        );
      }
    }, [l10n]);

    // Key extractor for SectionList
    const keyExtractor = React.useCallback(
      (item: SessionMetaData) => item.id,
      [],
    );

    // Render section header (date labels)
    const renderSectionHeader = React.useCallback(
      ({section}: {section: {title: string}}) => (
        <View style={styles.drawerSection}>
          <Text variant="bodySmall" style={styles.dateLabel}>
            {section.title}
          </Text>
        </View>
      ),
      [styles.drawerSection, styles.dateLabel],
    );

    // Render session item
    // observer() HOC handles MobX reactivity for chatSessionStore.activeSessionId
    const renderItem = React.useCallback(
      ({item}: {item: SessionMetaData}) => {
        const isActive = chatSessionStore.activeSessionId === item.id;
        const isSelected = chatSessionStore.selectedSessionIds.has(item.id);
        return (
          <SessionItem
            session={item}
            isActive={isActive}
            isPinned={item.pinned || false}
            onPress={handleSessionPress}
            onLongPress={handleSessionLongPress}
            menuVisible={menuVisible}
            menuPosition={menuPosition}
            onMenuDismiss={closeMenu}
            onPressPin={handlePressPin}
            onPressRename={handlePressRename}
            onPressDelete={onPressDelete}
            onPressExport={handlePressExport}
            onPressSelect={handlePressSelect}
            isSelectionMode={chatSessionStore.isSelectionMode}
            isSelected={isSelected}
            onToggleSelection={handleToggleSelection}
            theme={theme}
            styles={styles}
            l10n={l10n}
          />
        );
      },
      [
        handleSessionPress,
        handleSessionLongPress,
        menuVisible,
        menuPosition,
        closeMenu,
        handlePressPin,
        handlePressRename,
        onPressDelete,
        handlePressExport,
        handlePressSelect,
        handleToggleSelection,
        theme,
        styles,
        l10n,
      ],
    );

    // List header with main menu items formatted to match website mecha drawer
    const ListHeaderComponent = React.useMemo(
      () => (
        <View style={styles.menuContainer}>
          {/* Mecha Drawer Header with Original Panda Logo & Spec Badge */}
          <View style={styles.drawerHeader}>
            <View style={styles.drawerHeaderTop}>
              <View style={styles.pandaLogoBadge}>
                <Image
                  source={require('../../assets/images/void-icon.png')}
                  style={styles.pandaLogoImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.drawerHeaderTitle}>PROJECT VOID</Text>
              <View style={styles.specBadge}>
                <Text style={styles.specBadgeText}>WB-102</Text>
              </View>
            </View>
            <Text style={styles.drawerHeaderSub}>NEURAL OPERATIONS HUB</Text>
          </View>

          {/* Stencil 1-Column Menu List */}
          <View style={styles.mechaNavColumn}>
            {/* DAT-03: Chat (Stark White) */}
            <Pressable
              style={({pressed}) => [
                styles.mechaRow,
                styles.cardThemeWhite,
                pressed && styles.mechaRowPressed,
              ]}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight');
                props.navigation.navigate(ROUTES.CHAT);
              }}
              testID="drawer-item-chat">
              <View style={styles.rowCodeBadge}>
                <Text style={styles.rowCode}>DAT-03</Text>
              </View>
              <View style={styles.rowGlyphWrap}>
                <ChatIcon stroke="#FFFFFF" width={22} height={22} />
              </View>
              <Text style={styles.rowLabel}>
                {l10n.components.sidebarContent.menuItems.chat}
              </Text>
              <View style={styles.rowRivet} />
            </Pressable>

            {/* OPT-01: Pals / Optics (Cyber Mint) */}
            <Pressable
              style={({pressed}) => [
                styles.mechaRow,
                styles.cardThemeMint,
                pressed && styles.mechaRowPressed,
              ]}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight');
                props.navigation.navigate(ROUTES.PALS);
              }}
              testID="drawer-item-pals">
              <View style={styles.rowCodeBadge}>
                <Text style={styles.rowCode}>OPT-01</Text>
              </View>
              <View style={styles.rowGlyphWrap}>
                <PalIcon stroke="#36D6A8" width={22} height={22} />
              </View>
              <Text style={styles.rowLabel}>
                {l10n.components.sidebarContent.menuItems.pals}
              </Text>
              <View style={styles.rowRivet} />
            </Pressable>

            {/* TLM-05: Models (Signal Amber) */}
            <Pressable
              style={({pressed}) => [
                styles.mechaRow,
                styles.cardThemeAmber,
                pressed && styles.mechaRowPressed,
              ]}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight');
                props.navigation.navigate(ROUTES.MODELS);
              }}
              testID="drawer-item-models">
              <View style={styles.rowCodeBadge}>
                <Text style={styles.rowCode}>TLM-05</Text>
              </View>
              <View style={styles.rowGlyphWrap}>
                <ModelIcon stroke="#FFAA00" width={22} height={22} />
              </View>
              <Text style={styles.rowLabel}>
                {l10n.components.sidebarContent.menuItems.models}
              </Text>
              <View style={styles.rowRivet} />
            </Pressable>

            {/* NAV-04: Benchmark / Radar (Cobalt Blue) */}
            <Pressable
              style={({pressed}) => [
                styles.mechaRow,
                styles.cardThemeBlue,
                pressed && styles.mechaRowPressed,
              ]}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight');
                props.navigation.navigate(ROUTES.BENCHMARK);
              }}
              testID="drawer-item-benchmark">
              <View style={styles.rowCodeBadge}>
                <Text style={styles.rowCode}>NAV-04</Text>
              </View>
              <View style={styles.rowGlyphWrap}>
                <BenchmarkIcon stroke="#4D96FF" width={22} height={22} />
              </View>
              <Text style={styles.rowLabel}>
                {l10n.components.sidebarContent.menuItems.benchmark}
              </Text>
              <View style={styles.rowRivet} />
            </Pressable>

            {/* CFG-06: Settings (Crimson Red) */}
            <Pressable
              style={({pressed}) => [
                styles.mechaRow,
                styles.cardThemeRed,
                pressed && styles.mechaRowPressed,
              ]}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight');
                props.navigation.navigate(ROUTES.SETTINGS);
              }}
              testID="drawer-item-settings">
              <View style={styles.rowCodeBadge}>
                <Text style={styles.rowCode}>CFG-06</Text>
              </View>
              <View style={styles.rowGlyphWrap}>
                <SettingsIcon stroke="#FF2035" width={22} height={22} />
              </View>
              <Text style={styles.rowLabel}>
                {l10n.components.sidebarContent.menuItems.settings}
              </Text>
              <View style={styles.rowRivet} />
            </Pressable>

            {/* INF-00: App Info (Cyber Violet) */}
            <Pressable
              style={({pressed}) => [
                styles.mechaRow,
                styles.cardThemePurple,
                pressed && styles.mechaRowPressed,
              ]}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight');
                props.navigation.navigate(ROUTES.APP_INFO);
              }}
              testID="drawer-item-app-info">
              <View style={styles.rowCodeBadge}>
                <Text style={styles.rowCode}>INF-00</Text>
              </View>
              <View style={styles.rowGlyphWrap}>
                <AppInfoIcon stroke="#A78BFA" width={22} height={22} />
              </View>
              <Text style={styles.rowLabel}>
                {l10n.components.sidebarContent.menuItems.appInfo}
              </Text>
              <View style={styles.rowRivet} />
            </Pressable>

            {/* Only show Dev Tools in debug mode */}
            {isDebugMode && (
              <Pressable
                style={({pressed}) => [
                  styles.mechaRow,
                  styles.cardThemeAmber,
                  pressed && styles.mechaRowPressed,
                ]}
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('impactLight');
                  props.navigation.navigate(ROUTES.DEV_TOOLS);
                }}>
                <View style={styles.rowCodeBadge}>
                  <Text style={styles.rowCode}>DEV-99</Text>
                </View>
                <View style={styles.rowGlyphWrap}>
                  <SettingsIcon width={22} height={22} stroke="#FFAA00" />
                </View>
                <Text style={styles.rowLabel}>Dev Tools</Text>
                <View style={styles.rowRivet} />
              </Pressable>
            )}
          </View>
          <Divider style={styles.divider} />
        </View>
      ),
      [l10n, styles, props.navigation],
    );

    return (
      <View style={styles.sidebarContainer}>
        <View
          style={[
            styles.contentWrapper,
            {paddingTop: insets.top, paddingBottom: insets.bottom},
          ]}>
          {chatSessionStore.isSelectionMode ? (
            <>
              <SelectionModeHeader
                selectedCount={chatSessionStore.selectedCount}
                onCancel={handleExitSelectionMode}
                onExport={handleBulkExport}
                onDelete={handleBulkDelete}
                l10n={l10n}
                theme={theme}
                styles={styles}
              />
              <SelectAllRow
                allSelected={chatSessionStore.allSelected}
                onToggle={() =>
                  chatSessionStore.allSelected
                    ? chatSessionStore.deselectAllSessions()
                    : chatSessionStore.selectAllSessions()
                }
                l10n={l10n}
                styles={styles}
              />
              <Divider style={styles.selectAllDivider} />
              <SectionList
                sections={sections}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled={false}
                contentContainerStyle={styles.scrollViewContent}
                initialNumToRender={15}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={Platform.OS === 'android'}
              />
            </>
          ) : (
            <SectionList
              sections={sections}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              ListHeaderComponent={ListHeaderComponent}
              stickySectionHeadersEnabled={false}
              contentContainerStyle={styles.scrollViewContent}
              initialNumToRender={15}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews={Platform.OS === 'android'}
            />
          )}
        </View>
        <RenameModal
          visible={sessionToRename !== null}
          onClose={() => setSessionToRename(null)}
          session={sessionToRename}
        />
      </View>
    );
  },
);
