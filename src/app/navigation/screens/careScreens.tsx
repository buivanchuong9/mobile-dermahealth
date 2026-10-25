import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatScreen, ConversationListScreen } from '@modules/chat';
import { RecordDetailScreen } from '@modules/medical-records';
import {
  AssessmentHistoryScreen,
  SkinAssessmentFlowScreen,
} from '@modules/skin-assessment';
import { useAppServices } from '../../providers/AppServicesProvider';
import type { RootStackParamList } from '../types';
import { useRootNavigation } from '../useRootNavigation';

export function SkinAssessmentRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <SkinAssessmentFlowScreen
      service={services.assessmentService}
      history={services.assessmentHistory}
      onExit={navigation.goBack}
      onBookAppointment={specialtyId =>
        navigation.navigate('BookAppointment', {
          mode: { type: 'new', specialtyId },
        })
      }
      onViewHistory={() => navigation.navigate('AssessmentHistory')}
    />
  );
}

export function AssessmentHistoryRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <AssessmentHistoryScreen
      repository={services.assessmentHistory}
      onBack={navigation.goBack}
      onStartAssessment={() => navigation.replace('SkinAssessment')}
    />
  );
}

export function RecordDetailRoute({
  route,
}: NativeStackScreenProps<RootStackParamList, 'RecordDetail'>) {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <RecordDetailScreen
      repository={services.records}
      recordId={route.params.recordId}
      onBack={navigation.goBack}
      onBookFollowUp={visit => {
        navigation.navigate('BookAppointment', {
          mode: {
            type: 'new',
            followUp: {
              visitId: visit.id,
              specialtyId: visit.followUp?.specialtyId,
              doctorId: visit.followUp?.doctorId,
            },
          },
        });
      }}
      onBookVisit={() =>
        navigation.navigate('BookAppointment', { mode: { type: 'new' } })
      }
    />
  );
}

export function ConversationListRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <ConversationListScreen
      repository={services.chat}
      onOpenConversation={conversationId =>
        navigation.navigate('Chat', { conversationId })
      }
      onBack={navigation.goBack}
    />
  );
}

export function ChatRoute({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Chat'>) {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <ChatScreen
      repository={services.chat}
      conversationId={route.params.conversationId}
      onBack={navigation.goBack}
    />
  );
}
