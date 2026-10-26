/**
 * Fictional people and places used by every simulated repository. Nothing here
 * refers to a real clinic, clinician or patient.
 */
export type DemoSpecialtyId = 'general' | 'acne' | 'aesthetic' | 'allergy';

export type DemoDoctor = {
  readonly id: string;
  readonly name: string;
  readonly specialtyId: DemoSpecialtyId;
  readonly title: string;
};

export const DEMO_PATIENT = {
  id: 'patient-demo',
  fullName: 'Nguyễn Văn An',
} as const;

export const DEMO_CLINIC = {
  id: 'clinic-demo',
  name: 'Phòng khám Da liễu Dermahealth (minh họa)',
  address: 'Số 12 đường Ánh Dương, phường Hòa Bình, thành phố Minh Họa',
  department: 'Khoa Da liễu',
} as const;

export const DEMO_DOCTORS: readonly DemoDoctor[] = [
  {
    id: 'doctor-lan',
    name: 'BS. Trần Thu Lan',
    specialtyId: 'general',
    title: 'Bác sĩ da liễu tổng quát',
  },
  {
    id: 'doctor-minh',
    name: 'BS. Nguyễn Hoàng Minh',
    specialtyId: 'acne',
    title: 'Bác sĩ điều trị mụn và sẹo',
  },
  {
    id: 'doctor-an',
    name: 'ThS.BS Đặng Quốc An',
    specialtyId: 'aesthetic',
    title: 'Bác sĩ da liễu thẩm mỹ',
  },
  {
    id: 'doctor-hoa',
    name: 'BS. Phạm Thị Hoa',
    specialtyId: 'allergy',
    title: 'Bác sĩ dị ứng và miễn dịch da',
  },
];

export function findDemoDoctor(id: string): DemoDoctor | undefined {
  return DEMO_DOCTORS.find(doctor => doctor.id === id);
}
