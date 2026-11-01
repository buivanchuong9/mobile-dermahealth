import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@components/primitives';
import type { IconName } from '@components/primitives';
import type { OnboardingSlideId } from '../../onboardingSlides';

const content: Record<
  OnboardingSlideId,
  {
    icon: IconName;
    label: string;
    title: string;
    detail: string;
    accent: IconName;
  }
> = {
  booking: {
    icon: 'calendar-days',
    label: 'LỊCH KHÁM',
    title: 'Lịch hẹn của bạn',
    detail: 'Chọn thời gian phù hợp',
    accent: 'calendar-clock',
  },
  queue: {
    icon: 'ticket',
    label: 'LƯỢT KHÁM',
    title: 'Theo dõi lượt khám',
    detail: 'Chủ động từng bước',
    accent: 'clock',
  },
  records: {
    icon: 'file-text',
    label: 'HỒ SƠ SỨC KHỎE',
    title: 'Thông tin khám',
    detail: 'Lưu lại hành trình chăm sóc',
    accent: 'heart',
  },
  assessment: {
    icon: 'scan-face',
    label: 'HIỂU LÀN DA',
    title: 'Đánh giá tham khảo',
    detail: 'Bắt đầu từ điều bạn nhận thấy',
    accent: 'sparkles',
  },
};

/** Decorative product previews. Values are illustrative and contain no user data. */
export function OnboardingArtwork({
  id,
  height,
}: {
  readonly id: OnboardingSlideId;
  readonly height: number;
}) {
  const item = content[id];
  return (
    <View
      style={[styles.stage, { height }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.orbitOne} />
      <View style={styles.orbitTwo} />
      <View style={styles.topMark}>
        <Icon name={item.icon} size={18} color="#1D4ED8" />
      </View>
      <View style={styles.preview}>
        <View style={styles.previewHead}>
          <View style={styles.previewIcon}>
            <Icon name={item.icon} size={20} color="#2563EB" />
          </View>
          <View style={styles.headText}>
            <Text style={styles.eyebrow} maxFontSizeMultiplier={1}>
              {item.label}
            </Text>
            <Text style={styles.previewTitle} maxFontSizeMultiplier={1}>
              {item.title}
            </Text>
          </View>
        </View>
        {id === 'booking' ? (
          <BookingVisual />
        ) : id === 'queue' ? (
          <QueueVisual />
        ) : id === 'records' ? (
          <RecordsVisual />
        ) : (
          <AssessmentVisual />
        )}
      </View>
      <View style={styles.floating}>
        <View style={styles.floatingIcon}>
          <Icon name={item.accent} size={19} color="#1D4ED8" />
        </View>
        <View style={styles.floatingText}>
          <Text style={styles.floatTitle} maxFontSizeMultiplier={1}>
            DermaHealth
          </Text>
          <Text style={styles.floatDetail} maxFontSizeMultiplier={1}>
            {item.detail}
          </Text>
        </View>
      </View>
      <View style={styles.smallSpark}>
        <Icon name="sparkles" size={18} color="#2563EB" />
      </View>
    </View>
  );
}

function BookingVisual() {
  return (
    <View style={styles.visualBody}>
      <View style={styles.calendarHeader}>
        <Text style={styles.visualLabel} maxFontSizeMultiplier={1}>
          LỊCH CỦA BẠN
        </Text>
        <Icon name="chevron-right" size={15} color="#8A99AF" />
      </View>
      <View style={styles.calendarDays}>
        {['T2', 'T3', 'T4', 'T5', 'T6'].map((day, i) => (
          <View key={day} style={[styles.day, i === 2 && styles.selectedDay]}>
            <Text
              style={[styles.dayLabel, i === 2 && styles.selectedText]}
              maxFontSizeMultiplier={1}
            >
              {day}
            </Text>
            <Text
              style={[styles.dayNumber, i === 2 && styles.selectedText]}
              maxFontSizeMultiplier={1}
            >
              {12 + i}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.softLine}>
        <Icon name="clock" size={15} color="#2563EB" />
        <Text style={styles.softText} maxFontSizeMultiplier={1}>
          Chọn giờ khám
        </Text>
      </View>
    </View>
  );
}
function QueueVisual() {
  return (
    <View style={styles.visualBody}>
      <Text style={styles.visualLabel} maxFontSizeMultiplier={1}>
        SỐ THỨ TỰ MINH HỌA
      </Text>
      <View style={styles.queueRow}>
        <Text style={styles.queueNumber} maxFontSizeMultiplier={1}>
          A 012
        </Text>
        <View style={styles.queueBadge}>
          <Icon name="clock" size={14} color="#1D4ED8" />
          <Text style={styles.softText} maxFontSizeMultiplier={1}>
            Đang chờ
          </Text>
        </View>
      </View>
      <View style={styles.track}>
        <View style={styles.trackFill} />
      </View>
      <Text style={styles.mutedText} maxFontSizeMultiplier={1}>
        Theo dõi trạng thái ngay trong ứng dụng
      </Text>
    </View>
  );
}
function RecordsVisual() {
  return (
    <View style={styles.visualBody}>
      <Text style={styles.visualLabel} maxFontSizeMultiplier={1}>
        HÀNH TRÌNH CỦA BẠN
      </Text>
      {(['clipboard-list', 'pill', 'calendar-clock'] as const).map(
        (icon, i) => (
          <View key={icon} style={styles.recordRow}>
            <View style={styles.recordIcon}>
              <Icon name={icon} size={15} color="#2563EB" />
            </View>
            <View style={styles.skeletonGroup}>
              <View
                style={[
                  styles.line,
                  i === 1 ? styles.lineMedium : styles.lineLong,
                ]}
              />
              <View style={[styles.line, styles.lineShort]} />
            </View>
            <Icon name="chevron-right" size={15} color="#A8B5C5" />
          </View>
        ),
      )}
    </View>
  );
}
function AssessmentVisual() {
  return (
    <View style={styles.visualBody}>
      <View style={styles.scanRow}>
        <View style={styles.scanIcon}>
          <Icon name="scan-face" size={37} color="#2563EB" />
        </View>
        <View style={styles.skeletonGroup}>
          <Text style={styles.visualLabel} maxFontSizeMultiplier={1}>
            TÌNH TRẠNG DA
          </Text>
          <View style={[styles.line, styles.lineWide]} />
          <View style={[styles.line, styles.lineShort]} />
        </View>
      </View>
      <View style={styles.softLine}>
        <Icon name="info" size={15} color="#2563EB" />
        <Text style={styles.softText} maxFontSizeMultiplier={1}>
          Chỉ mang tính tham khảo
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#F1F6FF',
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  orbitOne: {
    position: 'absolute',
    width: 285,
    height: 285,
    borderRadius: 145,
    borderWidth: 1,
    borderColor: '#DCE8FA',
    top: -85,
    right: -70,
  },
  orbitTwo: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E3EDFC',
    left: -85,
    bottom: -70,
  },
  topMark: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: '78%',
    maxWidth: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 17,
    shadowColor: '#193F80',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 9 },
    elevation: 5,
  },
  previewHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E3EBF5',
  },
  previewIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EDF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: { flex: 1, gap: 3 },
  eyebrow: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#647A99',
  },
  previewTitle: { fontSize: 14, fontWeight: '700', color: '#17345D' },
  visualBody: { paddingTop: 14, gap: 10 },
  visualLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: '#7388A3',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
  },
  day: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 9,
    gap: 3,
  },
  selectedDay: { backgroundColor: '#2563EB' },
  dayLabel: { fontSize: 9, color: '#8293AA' },
  dayNumber: { fontSize: 13, fontWeight: '700', color: '#304766' },
  selectedText: { color: '#FFFFFF' },
  softLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#F2F7FF',
    borderRadius: 10,
    padding: 9,
  },
  softText: { fontSize: 10, color: '#315984', fontWeight: '600' },
  queueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  queueNumber: {
    fontSize: 29,
    fontWeight: '700',
    color: '#17345D',
    letterSpacing: -1,
  },
  queueBadge: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    backgroundColor: '#EDF4FF',
    padding: 7,
    borderRadius: 9,
  },
  track: { height: 5, backgroundColor: '#EAF0F7', borderRadius: 4 },
  trackFill: {
    width: '60%',
    height: 5,
    backgroundColor: '#568CF0',
    borderRadius: 4,
  },
  mutedText: { fontSize: 9, color: '#71849F' },
  recordRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  recordIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDF4FF',
  },
  skeletonGroup: { flex: 1, gap: 7 },
  line: { height: 6, borderRadius: 4, backgroundColor: '#DCE7F5' },
  lineShort: { width: '45%', backgroundColor: '#EDF2F8' },
  lineMedium: { width: '58%' },
  lineLong: { width: '78%' },
  lineWide: { width: '90%' },
  scanRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  scanIcon: {
    height: 64,
    width: 64,
    borderRadius: 18,
    backgroundColor: '#EDF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floating: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    maxWidth: '82%',
    shadowColor: '#193F80',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
  },
  floatingIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#EDF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingText: { flexShrink: 1, gap: 2 },
  floatTitle: { fontSize: 11, fontWeight: '700', color: '#17345D' },
  floatDetail: { fontSize: 10, color: '#627894' },
  smallSpark: { position: 'absolute', bottom: 36, left: 20 },
});
