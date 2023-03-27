export function dateStringToDate (dateString: string): Date {
  const dateSplit = dateString.split('/');
  return new Date(`${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`);
};