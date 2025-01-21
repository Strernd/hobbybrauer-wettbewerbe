import { CompetitionCard } from "@/components/competition-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Link from "next/link";
import { Competition } from "../../types/competition";

export const metadata: Metadata = {
  title: "Liste der Hobbybrau-Wettbewerbe in Deutschland",
  description:
    "Eine Übersicht von Hobbybrau-Wettbewerben in Deutschland und Europa. Finde heraus, wann und wo du deine Biere einreichen kannst.",
};

const competitions: Competition[] = [
  {
    id: "1",
    title: "HBCon Jurywettbewerb",
    date: "08.03.2025",
    registrationDeadline: "vorbei",
    submissionDeadline: "17.01.2025",
    organizer: "Heimbrauconvention e.V.",
    link: "https://heimbrauconvention.de/jurywettbewerb/",
    type: "Einsendung + Vor Ort Teilnahme",
    regionLimitation: "keine",
    styles: [
      "Schwarzbier",
      "Best Bitter",
      "Gose",
      "Super Heroes (BJCP wahlfrei)",
    ],
    unknownDate: false,
  },
  {
    id: "2",
    title: "Hobbybrauerwettbewerb von Maisel & Friends und BrauBeviale ",
    date: "29.03.2025",
    registrationDeadline: "26.03.2025",
    submissionDeadline: "26.03.2025",
    organizer: "Maisel & Friends",
    link: "https://www.maiselandfriends.com/de/community/hobbybrauer/",
    type: "Einsendung + Vor Ort Teilnahme",
    regionLimitation: "Deutschland",
    styles: ["Italian Style Pilsner"],
    unknownDate: false,
  },
  {
    id: "3",
    title: "Deutsche Meisterschaft der Hobbybrauer",
    date: "06.09.2025",
    registrationDeadline: "tba",
    submissionDeadline: "tba",
    organizer: "Störtebeker Braumanufaktur GmbH",
    link: "https://www.hobbybrauer-meisterschaft.de/",
    type: "Einsendung + Vor Ort Teilnahme",
    regionLimitation: "Deutschland",
    styles: ["In Abstimmung"],
    unknownDate: false,
  },
  {
    id: "4",
    title: "HHBT VHD Bierprämierung",
    date: "11.09.2025",
    registrationDeadline: "tba",
    submissionDeadline: "tba",
    organizer: "Vereinigung der Haus- und Hobbybrauer in Deutschland e. V.",
    link: "https://www.hausgebraut.de/haus-hobbybrautage/bierpraemierung",
    type: "Vor Ort",
    regionLimitation: "Deutschland",
    styles: ["tba"],
    unknownDate: false,
  },
  {
    id: "5",
    title: "Braumarkt Challenge",
    date: "31.12.2025",
    registrationDeadline: "tba",
    submissionDeadline: "tba",
    organizer: "Braumarkt",
    link: "https://braumarkt.com/de",
    type: "Einsendung",
    regionLimitation: "Europa",
    styles: ["tba"],
    unknownDate: true,
  },
  {
    id: "6",
    title: "BestBrewChallenge",
    date: "28.03.2025",
    registrationDeadline: "27.03.2025",
    submissionDeadline: "30.05.2025",
    organizer: "Bestmalz / Palatia Malz GmbH",
    link: "https://bestbrewchallenge.com/de/ueber-die-bbc/",
    type: "Einsendung",
    regionLimitation: "keine",
    styles: ["Oatmeal Stout"],
    unknownDate: false,
  },
];

export default function WettbewerbeSeite() {
  const competitionsByYear = competitions.reduce((acc, competition) => {
    const year = new Date(
      competition.date.split(".").reverse().join("-")
    ).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(competition);
    return acc;
  }, {} as Record<number, Competition[]>);

  const years = Object.keys(competitionsByYear).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">
        Hobbybrauer-Wettbewerbe Übersicht
      </h1>
      <Tabs className="w-full max-w-3xl" defaultValue="2025">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {years.map((year) => (
            <TabsTrigger key={year} value={year}>
              {year}
            </TabsTrigger>
          ))}
        </TabsList>
        {years.map((year) => (
          <TabsContent key={year} value={year} className="mt-6">
            <div className="space-y-6">
              {competitionsByYear[Number(year)]
                .sort(
                  (a, b) =>
                    new Date(a.date.split(".").reverse().join("-")).getTime() -
                    new Date(b.date.split(".").reverse().join("-")).getTime()
                )
                .map((competition) => (
                  <CompetitionCard
                    key={competition.id}
                    competition={competition}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <p className="text-sm text-gray-600 mt-6">
        Alle Angaben ohne Gewähr. Falsche Informationen oder neue Wettbewerbe
        bitte an <span className="font-bold">info@hopload.de</span> melden, oder
        als Pull Request{" "}
        <Link
          className="text-blue-600 hover:underline"
          href="https://github.com/Strernd/hobbybrauer-wettbewerbe"
          target="_blank"
        >
          hier
        </Link>{" "}
        einreichen.
      </p>
    </div>
  );
}
