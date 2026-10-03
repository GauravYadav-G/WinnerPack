import { Metadata } from 'next';
import DatabaseClient from './DatabaseClient';

export const metadata: Metadata = {
  title: 'Database Management Suite | WinnerPack Admin',
  description: 'Direct database management, schema explorer, real-time records grid, and document editor for MongoDB.',
};

export default function DatabasePage() {
  return <DatabaseClient />;
}
