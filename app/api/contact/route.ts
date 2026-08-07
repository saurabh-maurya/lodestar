import { leadOk, readLead, recordLead } from '@/lib/leads';

export async function POST(request: Request) {
  const result = await readLead(request, [
    { name: 'name', label: 'Your name' },
    { name: 'phone', label: 'Phone number', kind: 'phone' },
    { name: 'email', label: 'Email address', kind: 'email' },
    { name: 'grade', label: "Student's current grade" },
    { name: 'topic', label: 'Message', max: 2000 },
  ]);

  if (!result.ok) return result.response;

  await recordLead('contact', result.values);
  return leadOk();
}
