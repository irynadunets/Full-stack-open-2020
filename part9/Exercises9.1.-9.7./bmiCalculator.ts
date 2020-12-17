interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const bmiCalculator = (a: number, b: number ): string => {
  const bmp: number = (b*10000)/(a*a);
  let printText = '';
  if(bmp<16) {
    printText="Severely underweight";
  } else if(bmp<18.5) {
    printText="Underweight";
  } else if(bmp<25){
    printText="Normal (healthy weight)";
  } else if(bmp<30){
    printText="Overweight";
  }else if(bmp<35){
    printText="Obese Class I (Moderately obese)";
  }else if(bmp<40){
    printText="Obese Class II (Severely obese)";
  }else if(bmp>40){
    printText="Obese Class III (Very severely obese)";
  }
  console.log(printText);
  return printText;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  bmiCalculator(value1, value2);
} catch (e) {
  console.log('Error, something bad happened, message: ', e);
}
