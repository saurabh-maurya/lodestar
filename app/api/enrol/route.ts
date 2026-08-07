import { leadOk, readLead, recordLead } from '@/lib/leads';

export async function POST(request: Request) {
  const result = await readLead(request, [
    { name: 'parentName', label: 'Parent name' },
    { name: 'studentName', label: 'Student name' },
    { name: 'gender', label: 'Gender' },
    { name: 'studentClass', label: 'Class' },
    { name: 'parentEmail', label: 'Parent email ID', kind: 'email' },
    { name: 'parentMobile', label: 'Parent mobile no.', kind: 'phone' },
    { name: 'testEmail', label: 'Email ID for test link', kind: 'email' },
    // Carried from the card the parent came from, so the record says what was
    // actually being bought rather than what a label happened to read.
    { name: 'programSlug', label: 'Program' },
    { name: 'course', label: 'Course' },
    { name: 'grade', label: 'Grade' },
    { name: 'discountCode', label: 'Discount code', required: false },
  ]);

  if (!result.ok) return result.response;

  await recordLead('enrolment', result.values);
  return leadOk();
}
