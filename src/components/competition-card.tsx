import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Competition } from "../../types/competition";

export function CompetitionCard({ competition }: { competition: Competition }) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300 max-w-4xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            {competition.title}
          </CardTitle>
          <span className="text-base font-semibold text-primary ml-2">
            {competition.unknownDate ? "tba" : competition.date}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="font-medium">Veranstalter:</span>
            <span>{competition.organizer}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Typ:</span>
            <Badge variant="outline">{competition.type}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Regionsbeschränkung:</span>
            <Badge variant="outline">{competition.regionLimitation}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Registrierschluss:</span>
            <span>{competition.registrationDeadline}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Einsendeschluss:</span>
            <span>{competition.submissionDeadline}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Wettbewerbsstile:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {competition.styles.map((style, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {style}
                </Badge>
              ))}
            </div>
          </div>
          <Link
            href={competition.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Link zum Wettbewerb
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
