import Link from 'next/link'

const HomePage = () => {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-slate-900 text-white">
      <section className="flex flex-col gap-8 w-full max-w-[72rem] mx-auto">
        <h1 className="text-6xl">
          <span className="bg-clip-text bg-gradient-to-r from-blue-800 to-purple-900 text-transparent text-8xl">
            Mood
          </span>
          &nbsp;the only Journal app you need
        </h1>
        <p className="text-3xl text-white/60">
          This is the best app for tracking your mood through out your life. All you have to do is be honest.
        </p>
        <Link
          className="cursor-pointer shrink grow-0 self-center bg-blue-700 px-6 py-3 rounded-lg text-2xl"
          href="/journal">
          Get Started
        </Link>
      </section>
    </main>
  )
}

export default HomePage
