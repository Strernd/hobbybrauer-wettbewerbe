export type Competition = {
  id: string;
  title: string;
  date: string;
  registrationDeadline: string;
  submissionDeadline: string;
  organizer: string;
  link: string;
  type: "Vor Ort" | "Einsendung" | "Einsendung + Vor Ort Teilnahme";
  regionLimitation: "Deutschland" | "DACH" | "Europa" | "keine";
  styles: string[];
};
