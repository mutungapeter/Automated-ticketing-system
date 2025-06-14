"use client";

import AdminDashboardLayout from "@/components/dashboard/Layout/admin/adminLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
