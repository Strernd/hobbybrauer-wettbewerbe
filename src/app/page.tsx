"use client";

import { useState } from "react";
import { CompetitionCard } from "@/components/competition-card";
import { Competition } from "../../types/competition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [selectedYear, setSelectedYear] = useState(years[0]);

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">
        Heimbrau-Wettbewerbe Übersicht
      </h1>
      <Tabs
        defaultValue={selectedYear}
        className="w-full max-w-3xl"
        onValueChange={(value) => setSelectedYear(value)}
      >
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
        bitte an <span className="font-bold">info@hopload.de</span> melden.
      </p>
    </div>
  );
}
