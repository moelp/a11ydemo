export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto]">
      {children}
      <section className="sticky top-0 ps-8 bg-backgroundSecondary h-screen w-80">
        <div className="absolute start-0 top-0 bottom-0 w-4 bg-background rounded-e-xl"></div>
        <h2>alternative layout</h2>
      </section>
    </div>
  );
}
