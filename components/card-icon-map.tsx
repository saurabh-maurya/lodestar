import type { ReactNode } from 'react';
import {
  ChartIcon,
  ChatIcon,
  ChecklistIcon,
  ClockIcon,
  CompassIcon,
  DocumentIcon,
  GrowthIcon,
  HelpIcon,
  JournalIcon,
  RouteIcon,
  SchoolIcon,
  StarIcon,
  TargetIcon,
  UsersIcon,
  VideoIcon,
} from './icons';

/**
 * Content data carries an icon *key*, not a component, so the copy in
 * lib/content stays plain serialisable data. This is the one place a key is
 * resolved to a glyph — which also means a key used on two different pages
 * can never drift into two different pictures.
 */
export const cardIcons: Record<string, ReactNode> = {
  compass: <CompassIcon />,
  route: <RouteIcon />,
  target: <TargetIcon />,
  document: <DocumentIcon />,
  video: <VideoIcon />,
  journal: <JournalIcon />,
  help: <HelpIcon />,
  school: <SchoolIcon />,
  users: <UsersIcon />,
  clock: <ClockIcon />,
  chart: <ChartIcon />,
  checklist: <ChecklistIcon />,
  growth: <GrowthIcon />,
  chat: <ChatIcon />,
  spark: <StarIcon />,
};

/** Falls back to the brand star rather than rendering a hole in the grid. */
export function cardIcon(key: string | undefined): ReactNode {
  return (key && cardIcons[key]) || <StarIcon />;
}
