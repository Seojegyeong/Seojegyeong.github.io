export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          새로운 기회나 협업 제안이 있으시면 언제든지 연락해 주세요!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:seojk03155@gmail.com"
            className="px-6 py-3 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold hover:opacity-80 transition"
          >
            Email Me
          </a>
          <a
            href="https://github.com/Seojegyeong"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            GitHub
          </a>
        </div>
        <p className="mt-16 text-sm text-gray-400 dark:text-gray-600">
          © {new Date().getFullYear()} 서제경. All rights reserved.
        </p>
      </div>
    </section>
  );
}
