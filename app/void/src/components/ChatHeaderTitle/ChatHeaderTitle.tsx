import React, {useContext} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {Text} from 'react-native-paper';

import {styles} from './styles';
import {chatSessionStore, modelStore} from '../../store';
import {L10nContext} from '../../utils';

export const ChatHeaderTitle: React.FC = observer(() => {
  const l10n = useContext(L10nContext);
  const activeSessionId = chatSessionStore.activeSessionId;
  const activeSession = chatSessionStore.sessions.find(
    session => session.id === activeSessionId,
  );
  const activeModel = modelStore.activeModel;

  return (
    <View style={styles.container}>
      <Text
        numberOfLines={1}
        variant="titleSmall"
        style={{fontFamily: 'Inter-Bold', color: '#FFFFFF', letterSpacing: 0.8}}>
        {activeSession?.title || l10n.components.chatHeaderTitle.defaultTitle}
      </Text>
      {activeModel?.name && (
        <Text
          numberOfLines={1}
          variant="bodySmall"
          style={{fontFamily: 'Ndot-57', color: '#A0A5AE', fontSize: 10, letterSpacing: 0.6}}>
          {activeModel?.name}
        </Text>
      )}
    </View>
  );
});
