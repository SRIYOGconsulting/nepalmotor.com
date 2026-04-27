import AdminShell from '@/components/admin/AdminShell';

export default function AdminPanelLayout(props: { children: React.ReactNode }) {
  return <AdminShell>{props.children}</AdminShell>;
}

