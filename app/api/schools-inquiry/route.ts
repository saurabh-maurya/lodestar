import { leadOk, readLead, recordLead } from '@/lib/leads';

export async function POST(request: Request) {
  const result = await readLead(request, [
    { name: 'schoolName', label: 'School name' },
    { name: 'contactName', label: 'Contact name' },
    { name: 'city', label: 'City' },
    { name: 'phone', label: 'Phone', kind: 'phone' },
    { name: 'email', label: 'Email', kind: 'email' },
    { name: 'studentStrength', label: 'Student strength' },
    { name: 'preferredProgram', label: 'Preferred grade levels', required: false },
  ]);

  if (!result.ok) return result.response;

  await recordLead('institutional-leads', result.values);
  return leadOk();
}
