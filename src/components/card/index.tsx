import {
  addMonths,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { Calendar, Heart } from "lucide-react";
import { ReactNode } from "react";

type Card = {
  id: number;
  title: ReactNode;
  content: string;
  description: string;
};

export default function Card() {
  const startDate = new Date("2025-11-09");
  const today = new Date();

  const daysFull = differenceInDays(today, startDate);
  const months = differenceInMonths(today, startDate);
  const years = differenceInYears(today, startDate);

  const afterMonths = addMonths(startDate, months);

  const days = differenceInDays(today, afterMonths);

  const birthdayThisYear = new Date(today.getFullYear(), 11, 9);

  let nextNiver = birthdayThisYear;

  if (today > birthdayThisYear) {
    nextNiver = new Date(today.getFullYear() + 1, 11, 9);
  }

  const daysUntilBirthday = differenceInDays(nextNiver, today);

  const cards: Card[] = [
    {
      id: 1,
      title: (
        <div className="flex items-center gap-2 ">
          <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />
          <span>Tempo juntos</span>
        </div>
      ),
      content: `${months} meses e ${days} dias`,
      description: `Ou ${daysFull} dias de amor`,
    },
    {
      id: 2,
      title: (
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-pink-400" />
          <span>Próximo aniversário</span>
        </div>
      ),
      content: `Faltam ${daysUntilBirthday} dias`,
      description: `${nextNiver.getDate()} de novembro de ${nextNiver.getFullYear()}`,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 mt-6 px-4">
      {cards.map((card, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={card.id}
            className={`
            w-full max-w-md
            rounded-md
            flex 
            flex-col
            p-4
            shadow-lg ${isEven ? "bg-card" : "bg-card-secondary"}`}
          >
            <div
              className="
                uppercase
                tracking-[0.2em]
                text-[0.65rem]
                text-[#9d7fc0]
                font-dmSans
                mb-4
                flex
                items-center
                gap-2
              "
            >
              {card.title}
            </div>

            <h1
              className="
              text-[#f0e6ff]
              text-[1.5rem]
              leading-tight
              font-medium
              font-playfair
              mb-2
            "
            >
              {card.content}
            </h1>

            <p className="text-sm text-[#9d7fc0]">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
}
