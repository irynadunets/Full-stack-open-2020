interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number | undefined;
  ratingDescription: string | undefined;
  target: number;
  average: number;
}

 export const exerciseCalculator = ( target: number, hours: number[]): Result => {
  let rating,ratingDescription;
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h > 0).length;
  const average =  hours.reduce((a, b) => a + b, 0) / hours.length;
  const success = average >= target;
  if (average < target) {
    rating = 1;
    ratingDescription = `Too bad , do better in future`;
  } else if (target === average) {
    rating = 2;
    ratingDescription = `Not too bad but could be better`;
  } else if (average > target) {
    rating = 3;
    ratingDescription = `Congranulation.Good done!`;
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

interface Args {
  target: number;
  hours: number[];
}

const parseArguments = (args: Array<string>): Args => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const target = Number(args[2]);
  const hours = args.slice(3).map((hours) => Number(hours));
  return { target, hours };
};

try {
      const { target, hours } = parseArguments(process.argv);
      console.log(exerciseCalculator(target, hours));
    } catch (e) {
      console.log("An error has occured:", e);
 }
