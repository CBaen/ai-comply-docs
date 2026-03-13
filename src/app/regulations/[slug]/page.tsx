import { regulations, getRegulation } from "@/data/regulations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return regulations.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const reg = getRegulation(slug);
  if (!reg) return {};
  return {
    title: `${reg.name} — Compliance Documents`,
    description: reg.description,
    keywords: reg.keywords,
    openGraph: {
      title: `${reg.name} — AI Comply Docs`,
      description: reg.description,
      url: `https://aicomplydocs.com/regulations/${reg.slug}`,
    },
  };
}

export default async function RegulationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reg = getRegulation(slug);
  if (!reg) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold font-display mb-4">{reg.name}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{reg.description}</p>
      {/* TODO: Port full regulation page content from compliance-tool */}
      <p className="text-sm text-gray-500">Regulation page placeholder — port from compliance-tool/index.html</p>
    </div>
  );
}
