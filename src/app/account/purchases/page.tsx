import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getPool } from "@/lib/db";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getRegulation } from "@/data/regulations";
import PurchaseRedownloadButton from "./PurchaseRedownloadButton";

interface Purchase {
  id: string;
  stripe_session_id: string;
  regulation_slug: string;
  amount_paid: number;
  created_at: string;
}

async function getUserPurchases(userId: string): Promise<Purchase[]> {
  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT
         id,
         stripe_session_id,
         regulation_slug,
         amount_paid,
         created_at,
         form_data
       FROM purchases
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows as Purchase[];
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatAmount(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default async function PurchasesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/account/login");
  }

  const purchases = await getUserPurchases(session.user.id as string);

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-white">

        {/* Dark hero header */}
        <header className="bg-gray-900 text-white py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Account
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display leading-tight">
              Your Purchases
            </h1>
            <p className="text-gray-300 text-sm mt-3">
              Signed in as{" "}
              <span className="text-white font-medium">{session.user.email}</span>
            </p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 md:py-14">
          {purchases.length === 0 ? (
            <div className="text-center py-16 border border-gray-200 rounded-xl">
              <div
                className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                aria-hidden="true"
              >
                <svg
                  className="w-7 h-7 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 font-display">
                No purchases yet
              </h2>
              <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                Browse our compliance templates to get started.
              </p>
              <Link
                href="/products"
                className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => {
                const reg = getRegulation(purchase.regulation_slug);
                const productName = reg?.shortName ?? purchase.regulation_slug;

                return (
                  <div
                    key={purchase.id}
                    className="border border-gray-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                        {productName}
                      </h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                        <span className="text-xs text-gray-500">
                          Purchased {formatDate(purchase.created_at)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatAmount(purchase.amount_paid)}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {purchase.form_data ? (
                        <PurchaseRedownloadButton
                          formData={purchase.form_data}
                          productName={productName}
                        />
                      ) : (
                        <Link
                          href={`/products/${purchase.regulation_slug}`}
                          className="inline-block border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                        >
                          View Product
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>
      <Footer />
    </>
  );
}
