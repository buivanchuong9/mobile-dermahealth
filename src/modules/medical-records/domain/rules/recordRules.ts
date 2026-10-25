import { compareLocal } from '@shared/utilities/localDateTime';
import type { RecordEntry, RecordFilter } from '../entities/RecordEntry';

export function getRecordTitle(entry: RecordEntry): string {
  return entry.kind === 'visit' ? entry.reason : entry.title;
}

export function getRecordSummary(entry: RecordEntry): string {
  switch (entry.kind) {
    case 'visit':
      return entry.diagnoses.map(item => item.label).join(', ');
    case 'self_report':
    case 'ai_assessment':
      return entry.summary;
  }
}

/** Lower-cased text the search box matches against. */
function searchableText(entry: RecordEntry): string {
  const parts: string[] = [getRecordTitle(entry), getRecordSummary(entry)];
  if (entry.kind === 'visit') {
    parts.push(
      entry.doctorName,
      entry.clinicName,
      ...entry.prescriptions.map(item => item.name),
      ...entry.procedures,
      ...entry.tests.map(item => item.name),
    );
  }
  if (entry.kind === 'self_report') {
    parts.push(...entry.symptoms);
  }
  return parts.join(' ').toLowerCase();
}

export function filterRecords(
  entries: readonly RecordEntry[],
  options: { readonly query: string; readonly filter: RecordFilter },
): readonly RecordEntry[] {
  const query = options.query.trim().toLowerCase();
  return [...entries]
    .filter(
      entry => options.filter === 'all' || entry.source === options.filter,
    )
    .filter(entry => query === '' || searchableText(entry).includes(query))
    .sort((a, b) => compareLocal(b.date, a.date));
}
