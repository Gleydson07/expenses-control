type MonthByYear = {
  month: number;
  year: number;
};

interface GenerateMonthAndYearByInterval {
  finalYear: number;
  startMonth?: number;
  startYear?: number;
}

export function generateMonthAndYearByInterval({
  finalYear,
  startMonth = new Date().getMonth() + 1,
  startYear = new Date().getFullYear(),
}: GenerateMonthAndYearByInterval): MonthByYear[] {
  try {
    const result: MonthByYear[] = [];

    if (finalYear < startYear) {
      throw new Error('O ano final não pode ser menor que o ano inicial.');
    }

    const diffYears = finalYear - startYear;
    if (diffYears > 5) {
      throw new Error('O intervalo máximo permitido é de 5 anos.');
    }

    for (let year = startYear; year <= finalYear; year++) {
      const start = year === startYear ? startMonth : 1;
      const end = 12;

      for (let month = start; month <= end; month++) {
        result.push({ month, year });
      }
    }

    return result;
  } catch (error) {
    throw error;
  }
}
