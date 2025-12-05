import ProtectedPage from "@/app/components/ProtectedPage";

export default function ReadingList() {
  return (
    <ProtectedPage>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Reading List
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Your personal reading list will be displayed here.
            </p>
          </div>
        </main>
      </div>
    </ProtectedPage>
  );
}