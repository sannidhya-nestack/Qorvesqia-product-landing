import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Darker_Grotesque, Inter } from "next/font/google";

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-suite-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-suite-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface SuiteProduct {
  category: string;
  name: string;
  href: string;
  image: string;
  alt: string;
  users: string;
  intake: string;
  output: string;
}

const SUITE_PRODUCTS: SuiteProduct[] = [
  {
    category: "Event Production & Live Entertainment",
    name: "Qorvesqia AI",
    href: "https://qorvesqia.nestack.ai/",
    image: "/assets/switchboard-programming.jpg",
    alt: "Live event production stage lighting, audio systems, and show control",
    users: "Live event producers",
    intake: "Riders & venue specs",
    output: "Run-of-show & crew dispatch",
  },
  {
    category: "Residential construction",
    name: "Takeubid AI",
    href: "https://takeubid.nestack.ai/",
    image: "/assets/project-08.jpg",
    alt: "Glass-clad tower against a clear sky",
    users: "Residential builders",
    intake: "Plans & pricing",
    output: "Client-ready bid",
  },
  {
    category: "Civil & infrastructure",
    name: "Infravoryn AI",
    href: "https://infravoryn.nestack.ai/",
    image: "/assets/suite-infravoryn.jpg",
    alt: "Engineer holding drawings in front of a steel arch bridge",
    users: "Civil engineers",
    intake: "Drawings & surveys",
    output: "Ops data",
  },
  {
    category: "Architecture & interiors",
    name: "Atelvyn AI",
    href: "https://atelvyn.nestack.ai/",
    image: "/assets/suite-atelvyn.jpg",
    alt: "Two people coordinating over rolled drawings beneath exposed services",
    users: "Design studios",
    intake: "The brief",
    output: "Handover set",
  },
  {
    category: "Construction services",
    name: "Civoraq AI",
    href: "https://civoraq.nestack.ai/",
    image: "/assets/suite-civoraq.jpg",
    alt: "Site team meeting on the floor of an industrial facility",
    users: "Project teams",
    intake: "Jobsite paperwork",
    output: "Audit trail",
  },
  {
    category: "Intake & proposals",
    name: "Scoporax AI",
    href: "https://scoporax.nestack.ai/",
    image: "/assets/suite-scoporax.jpg",
    alt: "Surveyor setting out with a level on a building site",
    users: "Bid teams",
    intake: "RFPs & briefs",
    output: "Finished proposal",
  },
];

export default function Suite() {
  return (
    <section id="suite" className={`section accent ${darkerGrotesque.variable} ${inter.variable}`}>
      <style>{`
        #suite {
          --black: #181b21;
          --grey: #474a4d;
          --white-accent: #f5f5f5;
          --light-grey: #d3d9dd;
          --white: #ffffff;
          --orange: #ff6f00;
          --blue: #2456ae;
          --light-orange: #ff9c30;
          --dark-blue: #00225e;
          --sp-ultra: 0.5rem;
          --sp-vsmall: 1rem;
          --sp-xsmall: 1.5rem;
          --sp-small: 2rem;
          --sp-medium: 4rem;
          --sp-large: 6rem;
          --sp-xlarge: 8rem;
          --sp-vlarge: 12rem;
          --gutter: var(--sp-medium);
          --subtitle: 18px;
          --text: 16px;
          --lh-heading: 0.9;
          --lh-text: 1.4;
          --h2: 80px;

          padding-top: var(--sp-vlarge);
          padding-bottom: var(--sp-vlarge);
          background-color: var(--white-accent);
          font-family: var(--font-suite-body), Inter, sans-serif;
        }

        #suite .container {
          width: 100%;
          max-width: 1440px;
          padding-left: var(--gutter);
          padding-right: var(--gutter);
          margin: 0 auto;
        }

        #suite .subtitle {
          font-family: var(--font-suite-body), Inter, sans-serif;
          color: var(--black);
          font-size: var(--subtitle);
          line-height: var(--lh-text);
          text-transform: uppercase;
          font-weight: 400;
        }

        #suite .heading-2 {
          font-family: var(--font-suite-display), "Darker Grotesque", Arial, sans-serif;
          color: var(--black);
          line-height: var(--lh-heading);
          margin: 0;
          font-weight: 500;
          font-size: var(--h2);
        }

        #suite .text {
          font-family: var(--font-suite-body), Inter, sans-serif;
          color: var(--grey);
          font-size: var(--text);
          line-height: var(--lh-text);
          font-weight: 400;
        }

        #suite [data-font-display] {
          font-family: var(--font-suite-display), "Darker Grotesque", Arial, sans-serif;
        }

        @media screen and (max-width: 991px) {
          #suite {
            padding-top: var(--sp-xlarge);
            padding-bottom: var(--sp-xlarge);
            --gutter: var(--sp-small);
            --h2: 72px;
          }
        }

        @media screen and (max-width: 767px) {
          #suite {
            padding-top: var(--sp-large);
            padding-bottom: var(--sp-large);
            --gutter: var(--sp-xsmall);
            --h2: 64px;
          }
        }

        @media screen and (max-width: 479px) {
          #suite {
            --gutter: var(--sp-vsmall);
            --h2: 52px;
          }
        }
      `}</style>
      <div className="container">
        <div className="max-w-[48rem]">
          <div className="subtitle">The Nestack construction suite</div>
          <h2 className="heading-2 mt-5">Built for every corner of construction.</h2>
          <p className="text mt-6 max-w-[60ch]">
            Construction moves differently in every field, with unique teams, workflows, documents, and decisions. Your tools should be built to work the way your industry does.
          </p>
        </div>

        {/* Mobile View: Vertical list */}
        <div className="mt-10 border-t border-[var(--black)] sm:hidden">
          {SUITE_PRODUCTS.map((prod) => (
            <a
              key={prod.name}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[58px_minmax(0,1fr)_16px] items-center gap-3 border-b border-[var(--light-grey)] bg-[var(--white)] px-4 py-3"
              href={prod.href}
            >
              <div className="relative h-11 w-[58px] overflow-hidden border border-[var(--light-grey)]">
                <Image
                  alt={prod.alt}
                  fill
                  sizes="58px"
                  className="object-cover"
                  src={prod.image}
                />
              </div>
              <div className="min-w-0">
                <div className="font-mono uppercase tracking-[0.1em] text-[9px] font-semibold text-[var(--orange)]">
                  {prod.category}
                </div>
                <div className="mt-0.5 text-[15px] font-semibold leading-[1.2] tracking-[-0.018em] text-[var(--black)]">
                  {prod.name}
                </div>
              </div>
              <ArrowRight className="text-[var(--dark-blue)] shrink-0" size={16} strokeWidth={2.2} />
            </a>
          ))}

          {/* Mobile CTA */}
          <a
            href="#contact"
            className="mt-4 flex flex-col items-center justify-center gap-1.5 bg-[var(--dark-blue)] px-5 py-5 text-center"
          >
            <span data-font-display className="text-[1.25rem] font-semibold leading-[1.1] text-[var(--white)]">
              Book a demo
            </span>
            <span className="font-mono uppercase tracking-[0.1em] flex items-center gap-2 text-[9px] text-[var(--light-orange)]">
              See it on your own jobs
              <ArrowRight size={12} strokeWidth={2.4} />
            </span>
          </a>
        </div>

        {/* Desktop View: Grid */}
        <div className="mt-14 hidden auto-rows-fr gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {SUITE_PRODUCTS.map((prod) => (
            <a
              key={prod.name}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border border-[var(--black)] bg-[var(--white)] transition-shadow hover:shadow-[0_10px_28px_rgba(0,34,94,0.16)]"
              href={prod.href}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--black)]">
                <Image
                  alt={prod.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  src={prod.image}
                />
              </div>
              <div className="border-b border-[var(--black)] bg-[var(--dark-blue)] px-5 py-3">
                <span className="font-mono uppercase tracking-[0.14em] block text-[12px] font-semibold leading-[1.3] text-[var(--white)]">
                  {prod.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 data-font-display className="text-[1.4rem] font-semibold leading-[1.1] text-[var(--black)]">
                  {prod.name}
                </h3>
                <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-dashed border-[var(--light-grey)] pt-4">
                  <dt className="font-mono uppercase tracking-[0.08em] text-[10px] text-[var(--grey)]">Users</dt>
                  <dd className="text-right text-[13px] font-medium text-[var(--black)]">{prod.users}</dd>
                  <dt className="font-mono uppercase tracking-[0.08em] text-[10px] text-[var(--grey)]">Intake</dt>
                  <dd className="text-right text-[13px] font-medium text-[var(--black)]">{prod.intake}</dd>
                  <dt className="font-mono uppercase tracking-[0.08em] text-[10px] text-[var(--grey)]">Output</dt>
                  <dd className="text-right text-[13px] font-medium text-[var(--black)]">{prod.output}</dd>
                </dl>
                <div className="mt-6 flex items-center justify-between text-[13px] font-semibold text-[var(--dark-blue)]">
                  <span>Open site</span>
                  <ArrowRight
                    size={16}
                    strokeWidth={2.2}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </a>
          ))}

          {/* Desktop CTA Card */}
          <a
            href="#contact"
            className="group flex flex-col items-center justify-center gap-2 border border-[var(--dark-blue)] bg-[var(--dark-blue)] p-8 text-center transition-shadow hover:shadow-[0_10px_28px_rgba(0,34,94,0.16)]"
          >
            <span data-font-display className="text-[1.4rem] font-semibold leading-[1.1] text-[var(--white)]">
              Book a demo
            </span>
            <span className="font-mono uppercase tracking-[0.1em] flex items-center gap-2 text-[10px] text-[var(--light-orange)]">
              See it on your own jobs
              <ArrowRight
                size={13}
                strokeWidth={2.4}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
