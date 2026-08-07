import { leadOk, readLead, recordLead } from '@/lib/leads';

export async function POST(request: Request) {
  const result = await readLead(request, [
    { name: 'parentName', label: 'Parent name' },
    { name: 'mobile', label: 'Mobile number', kind: 'phone' },
    { name: 'email', label: 'Email address', kind: 'email' },
    { name: 'studentName', label: 'Student name' },
    { name: 'city', label: 'City' },
    { name: 'grade', label: 'Current grade', required: false },
  ]);

  if (!result.ok) return result.response;

  await recordLead('free-assessment', result.values);
  return leadOk();
}
