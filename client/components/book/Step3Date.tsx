"use client";

interface Step3DateProps {
  selectedDate: string;
  navDate: Date;
  onBack: () => void;
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onContinue: () => void;
}

export default function Step3Date({
  selectedDate,
  navDate,
  onBack,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onContinue,
}: Step3DateProps) {
  const today = new Date();
  const monthName = navDate.toLocaleDateString([], { month: "long", year: "numeric" });
  const isPrevMonthDisabled =
    navDate.getFullYear() < today.getFullYear() ||
    (navDate.getFullYear() === today.getFullYear() && navDate.getMonth() <= today.getMonth());

  // Build calendar grid
  const getDaysForGrid = () => {
    const year = navDate.getFullYear();
    const month = navDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startOffset = firstDay.getDay();
    const cells: Array<{ isPadding: boolean; dayNum?: number; date?: Date; key: string }> = [];
    for (let i = 0; i < startOffset; i++) cells.push({ isPadding: true, key: `pad-${i}` });
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ isPadding: false, dayNum: d, date: new Date(year, month, d), key: `day-${d}` });
    }
    return cells;
  };

  return (
    <div className="animate-pop-in space-y-6">
      <div
        className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit font-bold text-sm"
        onClick={onBack}
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Back to Type</span>
      </div>

      <h2 className="text-headline-md font-headline-md text-primary font-bold">Select Appointment Date</h2>

      <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-sm">
        {/* Month navigator */}
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={onPrevMonth}
            disabled={isPrevMonthDisabled}
            className={`p-2 rounded-full border border-outline-variant flex items-center justify-center transition-all ${
              isPrevMonthDisabled
                ? "opacity-30 cursor-not-allowed text-on-surface-variant"
                : "hover:border-primary hover:text-primary cursor-pointer hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h3 className="text-body-lg font-bold text-primary text-lg">{monthName}</h3>
          <button
            type="button"
            onClick={onNextMonth}
            className="p-2 rounded-full border border-outline-variant hover:border-primary hover:text-primary flex items-center justify-center cursor-pointer hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {getDaysForGrid().map((cell) => {
            if (cell.isPadding) return <div key={cell.key} />;

            const cellDate = cell.date!;
            const dayNum = cell.dayNum!;
            const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const compareCell = new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
            const isPast = compareCell < compareToday;
            const isToday = compareCell.getTime() === compareToday.getTime();
            const dateStr = cellDate.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={cell.key}
                type="button"
                disabled={isPast}
                onClick={() => onSelectDate(dateStr)}
                className={`aspect-square flex flex-col items-center justify-center rounded-2xl border text-sm font-semibold transition-all relative ${
                  isPast
                    ? "border-transparent text-on-surface-variant/30 bg-transparent cursor-not-allowed opacity-35"
                    : isSelected
                    ? "border-primary bg-primary text-on-primary font-bold shadow-md scale-105"
                    : "border-outline-variant/40 text-on-surface hover:border-primary/50 hover:bg-primary/5 hover:text-primary cursor-pointer bg-surface-container-lowest"
                }`}
              >
                <span>{dayNum}</span>
                {!isPast && isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${isSelected ? "bg-on-primary" : "bg-primary"}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <p className="text-center text-sm font-bold text-secondary">Selected: {selectedDate}</p>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={onContinue}
          className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:scale-[1.02] hover:shadow-md transition-all cursor-pointer font-bold"
        >
          Choose Time Slot
        </button>
      </div>
    </div>
  );
}
