interface BunnerProps {
  salaryOnHands: number;
  ndfl: number;
  salaryInMonth: number;
}
export const Banner = ({ salaryOnHands, ndfl, salaryInMonth }: BunnerProps) => {
  return (
    <div className="banner bg-banner p-3 mt-4 rounded-2">
      <div>
        <span>{salaryOnHands.toLocaleString()}</span> Сотрудник будет получать
        на руки
      </div>
      <div>
        <span>{ndfl.toLocaleString()} </span>НДФЛ, 13% от оклада
      </div>
      <div>
        <span>{salaryInMonth.toLocaleString()} </span> за сотрудника в месяц
      </div>
    </div>
  );
};
