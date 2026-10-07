import Image from "next/image";

const integrations = [
  { name: "Salesforce", icon: "/icons/connectivity/salesforce.svg" },
  { name: "Pipedrive", icon: "/icons/connectivity/pipedrive.svg" },
  { name: "Outlook", icon: "/icons/connectivity/outlook.svg" },
  { name: "SharePoint", icon: "/icons/connectivity/sharepoint.svg" },
  { name: "OneDrive", icon: "/icons/connectivity/onedrive.svg" },
  { name: "Teams", icon: "/icons/connectivity/teams.svg" },
  { name: "MS Project", icon: "/icons/connectivity/msproject.svg" },
  { name: "Slack", icon: "/icons/connectivity/slack.svg" },
  { name: "DocuSign", icon: "/icons/connectivity/docusign.svg" },
  { name: "Monday", icon: "/icons/connectivity/monday.svg" },
  { name: "Procore", icon: "/icons/connectivity/procore.svg" },
  { name: "Fieldwire", icon: "/icons/connectivity/fieldwire.svg" },
  { name: "Acumatica", icon: "/icons/connectivity/acumatica.svg" },
  { name: "Primavera P6", icon: "/icons/connectivity/oracle.svg" },
  { name: "Smartsheet", icon: "/icons/connectivity/smartsheet.svg" },
];

export default function Connectivity() {
  // Duplicate for seamless infinite marquee loop
  const row1 = [...integrations, ...integrations];
  const row2Items = [...integrations.slice(7), ...integrations.slice(0, 7)];
  const row2 = [...row2Items, ...row2Items];

  return (
    <section id="connectivity" className="border-b border-[var(--line)] bg-[var(--paper-2)] py-20 sm:py-28">
      <style>{`
        @keyframes conn-scroll-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes conn-scroll-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .conn-marquee-track {
          display: flex !important;
          width: max-content !important;
          will-change: transform;
        }
        .conn-track-left {
          animation: conn-scroll-left 32s linear infinite !important;
        }
        .conn-track-right {
          animation: conn-scroll-right 32s linear infinite !important;
        }
        .conn-marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="mx-auto max-w-[900px] px-5 text-center sm:px-8">
        <span className="eyebrow">Connectivity</span>
        <h2 className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
          Your production stack, connected.
        </h2>
        <p className="mx-auto mt-6 max-w-[62ch] text-[16px] leading-[1.65] text-[var(--ink-soft)]">
          Vectorworks, Shoflo, LASSO, Rentman, Flex Rental Solutions, Google Workspace, and Dropbox — connecting the exact operational tools your touring crews, festival producers, and venue teams use every day.
        </p>
      </div>

      <div className="mt-14 overflow-hidden bg-[var(--brand)] py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="overflow-hidden">
            <div
              className="conn-marquee-track conn-track-left items-center gap-10 px-4 sm:gap-12"
              aria-hidden="true"
            >
              {row1.map((item, idx) => (
                <div key={idx} className="flex shrink-0 items-center gap-2.5">
                  <Image
                    src={item.icon}
                    alt=""
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] shrink-0 brightness-0 invert"
                  />
                  <span className="whitespace-nowrap font-display text-[14px] font-bold uppercase tracking-[0.04em] text-white">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="conn-marquee-track conn-track-right items-center gap-10 px-4 sm:gap-12"
              aria-hidden="true"
            >
              {row2.map((item, idx) => (
                <div key={idx} className="flex shrink-0 items-center gap-2.5">
                  <Image
                    src={item.icon}
                    alt=""
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] shrink-0 brightness-0 invert"
                  />
                  <span className="whitespace-nowrap font-display text-[14px] font-bold uppercase tracking-[0.04em] text-white">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-[1240px] px-5 text-center text-[12px] leading-[1.55] text-[var(--ink-mute)] sm:px-8">
        Tool names and marks belong to their respective owners. No endorsement or partnership implied.
      </p>
    </section>
  );
}
