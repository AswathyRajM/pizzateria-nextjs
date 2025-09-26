import Sidebar from "@/components/nav/sidebar";
import PageLayoutWrapper from "@/components/page-layout-wrapper";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageLayoutWrapper addMarginTop>
      <Sidebar>{children}</Sidebar>
    </PageLayoutWrapper>
  );
}
