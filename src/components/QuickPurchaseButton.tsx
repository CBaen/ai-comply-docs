"use client";

interface QuickPurchaseButtonProps {
  slug: string;
  price: number;
}

export default function QuickPurchaseButton({ slug, price }: QuickPurchaseButtonProps) {
  async function handleQuickPurchase() {
    sessionStorage.setItem(
      "complianceFormData",
      JSON.stringify({
        regulation: slug,
        quickPurchase: true,
        company: { name: "", state: "", size: "", industry: "" },
        aiSystems: [],
        dataInputs: [],
        protectedCharacteristics: [],
        biasAudit: "",
        oversight: { aiRole: "", oversightRole: "", humanReview: "", reviewFrequency: "" },
        contact: { name: "", title: "", email: "", phone: "" },
        generatedDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        selectedAddons: [],
      })
    );

    const response = await fetch("/api/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regulation: slug, addonIds: [] }),
    });
    const result = await response.json();
    if (result.url) window.location.href = result.url;
  }

  return (
    <div className="mt-3">
      <button
        onClick={handleQuickPurchase}
        className="w-full py-3 px-4 rounded-lg font-semibold text-sm border-2 border-blue-700 text-blue-700 hover:bg-blue-50 transition text-center"
      >
        Quick Purchase — Skip to Checkout
      </button>
      <p className="text-center text-xs text-gray-500 mt-2">
        Purchase now, customize your documents after checkout
      </p>
    </div>
  );
}
