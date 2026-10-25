import { DEMO_CLINIC } from '@core/demo';
import { addDays, toDateKey } from '@shared/utilities/localDateTime';
import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type { RecordEntry } from '../../domain/entities/RecordEntry';

/**
 * Fictional records relative to the demo "today". Medication and test names are
 * deliberately generic placeholders, not real prescriptions or results.
 */
export function createSeedRecords(now: LocalDateTime): RecordEntry[] {
  const today = toDateKey(now);
  const at = (offset: number, time: string): LocalDateTime =>
    `${addDays(today, offset)}T${time}`;

  return [
    {
      kind: 'visit',
      id: 'visit-2026-09-12',
      source: 'clinician_confirmed',
      date: at(-44, '09:00'),
      doctorName: 'BS. Trần Thu Lan',
      clinicName: DEMO_CLINIC.name,
      reason: 'Mụn viêm vùng má kéo dài',
      diagnoses: [{ label: 'Mụn trứng cá mức độ nhẹ đến vừa' }],
      prescriptions: [
        {
          name: 'Thuốc bôi chống viêm A (minh họa)',
          instructions: 'Bôi mỏng vào buổi tối lên vùng da có tổn thương.',
        },
        {
          name: 'Sữa rửa mặt dịu nhẹ (minh họa)',
          instructions: 'Dùng 2 lần mỗi ngày, sáng và tối.',
        },
      ],
      careInstructions: [
        'Dùng kem chống nắng mỗi sáng.',
        'Không tự nặn mụn.',
        'Tái khám để bác sĩ đánh giá đáp ứng điều trị.',
      ],
      tests: [],
      procedures: [],
      followUp: {
        withinDays: 21,
        note: 'Đánh giá lại tổn thương và điều chỉnh chăm sóc nếu cần.',
        specialtyId: 'general',
        doctorId: 'doctor-lan',
      },
    },
    {
      kind: 'self_report',
      id: 'self-report-1',
      source: 'patient_reported',
      date: at(-30, '20:15'),
      title: 'Da khô và ngứa nhẹ sau khi đổi sữa rửa mặt',
      summary: 'Bạn ghi nhận da khô, ngứa nhẹ quanh má trong 3 ngày.',
      symptoms: ['Khô da', 'Ngứa nhẹ'],
    },
    {
      kind: 'ai_assessment',
      id: 'ai-assessment-1',
      source: 'ai_generated',
      date: at(-10, '21:00'),
      title: 'Gợi ý tham khảo (mô phỏng): dấu hiệu da khô',
      summary:
        'Kết quả mô phỏng dựa trên câu trả lời của bạn, mức phù hợp trung bình. Nên trao đổi với bác sĩ.',
    },
    {
      kind: 'visit',
      id: 'visit-2026-07-03',
      source: 'clinician_confirmed',
      date: at(-115, '15:30'),
      doctorName: 'BS. Nguyễn Hoàng Minh',
      clinicName: DEMO_CLINIC.name,
      reason: 'Sẹo sau mụn',
      diagnoses: [{ label: 'Sẹo lõm nhẹ sau mụn' }],
      prescriptions: [
        {
          name: 'Kem dưỡng phục hồi B (minh họa)',
          instructions: 'Thoa buổi tối sau khi rửa mặt.',
        },
      ],
      careInstructions: [
        'Tránh nắng trực tiếp và đội mũ rộng vành khi ra ngoài.',
        'Hạn chế chà xát mạnh lên vùng da có sẹo.',
      ],
      tests: [
        {
          name: 'Soi da (minh họa)',
          summary: 'Không ghi nhận dấu hiệu bất thường khác.',
          status: 'normal',
        },
      ],
      procedures: ['Chăm sóc da chuyên sâu (minh họa)'],
    },
  ];
}
