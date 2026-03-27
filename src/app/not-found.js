import Navbar from "@/components/navbar.jsx";
import Footer from "@/components/footer.jsx";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-2 text-gray-500">
          Sorry, the page you are looking for doesn't exist.
        </p>

        {/* Back to Home Button */}
        <Link href="/">
          <button className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200">
            Back to Home
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}