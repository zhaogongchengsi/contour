
declare interface RequestResume extends Omit<Resume, "state"> {
  cards: Card[];
  contact: ContactInfo[];
  background: string
}
