import FilteredEventItems from "../my_components/filteredEventItems";

export default function Events() {
  return (
    <main className="min-h-screen pt-20 flex justify-center">
      <p className="fixed text-center  translate-y-1/2 font-extrabold text-4xl z-10 tracking-tight">Coming soon</p>
      <div className="max-w-5xl flex flex-col blur-lg">
        <h1 className="text-3xl font-bold text-center tracking-tight">
          Events around you
        </h1>
        <FilteredEventItems />
      </div>
    </main>
  );
}
